import { Server } from "http";
import { prisma } from "@infrastructure/db.js";
import { logger } from "@lib/logger.js";
import { getIO } from "@socket/socket.server.js";

// Keep a simple global flag to prevent double execution traces
let isShuttingDown = false;

export const setupGracefulShutdown = (server: Server): void => {
  const handleShutdown = async (signal: string) => {
    if (isShuttingDown) return;
    isShuttingDown = true;

    logger.warn(`⚠️ Received ${signal}. Starting graceful shutdown sequence...`);

    // Forced Safety Timeout: If cleanup hangs for more than 10 seconds, force exit
    const forceExitTimeout = setTimeout(() => {
      logger.fatal("Force killing backend! Shutdown tasks took too long (10s timeout).");
      process.exit(1);
    }, 10000);

    try {
      const io = getIO();
      logger.info("🔌 Closing active Socket.io connections and HTTP server context...");

      // io.close() handles closing the underlying HTTP server automatically!
      // Pass the async callback directly to it.
      io.close(async (err) => {
        clearTimeout(forceExitTimeout); // Clear the timeout once handled safely

        if (err) {
          logger.error({ err }, "Error occurred while closing the Socket/HTTP server context.");
          process.exit(1);
        }

        logger.info("🛑 HTTP server and Socket.io instances closed cleanly.");

        try {
          // 2. Safely close database connection pools
          logger.info("Closing database connection layers...");
          await prisma.$disconnect();
          logger.info("🟩 Database connections severed cleanly.");

          logger.info("Graceful shutdown completed successfully. Exiting process.");
          process.exit(0);
        } catch (dbError) {
          logger.fatal({ err: dbError }, "Emergency crash during database cleanup steps!");
          process.exit(1);
        }
      });
    } catch {
      logger.debug("Socket.io was not initialized; falling back to direct HTTP server shutdown.");

      // Fallback: If socket server wasn't running, close raw HTTP server normally
      server.close(async (err) => {
        clearTimeout(forceExitTimeout);
        if (err) {
          logger.error({ err }, "Error closing standalone HTTP server context.");
          process.exit(1);
        }
        await prisma.$disconnect();
        process.exit(0);
      });
    }
  };

  // Listen for operating system termination interrupts
  process.on("SIGTERM", () => handleShutdown("SIGTERM"));
  process.on("SIGINT", () => handleShutdown("SIGINT"));
};
