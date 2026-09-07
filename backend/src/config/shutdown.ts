import { Server } from "http";
import { prisma } from "@infrastructure/db.js";
import { logger } from "@lib/logger.js";
import { getIO } from "@socket/socket.server.js";

export const setupGracefulShutdown = (server: Server): void => {
  const handleShutdown = async (signal: string) => {
    logger.warn(`⚠️ Received ${signal}. Starting graceful shutdown sequence...`);

    try {
      const io = getIO();
      logger.info("🔌 Closing active Socket.io connections...");
      io.close();
      logger.info("🟩 All Socket.io client connections terminated cleanly.");
    } catch {
      // If server crashes before socket initialized, catch the getIO() throw safely
      logger.debug("Socket.io was not initialized; skipping socket cleanup.");
    }
    //  Stop the HTTP server from accepting any new incoming network requests
    server.close(async (err) => {
      if (err) {
        logger.error({ err }, "Error occurred while closing the HTTP server context.");
        process.exit(1);
      }

      logger.info("🛑 HTTP server closed. No longer accepting new connections.");

      try {
        // 2. Safely close database connection pools so queries aren't cut mid-flight
        logger.info("Closing database connection layers...");
        await prisma.$disconnect();
        logger.info("🟩 Database connections severed cleanly.");

        // 3. Fully exit the process with success code 0
        logger.info("Graceful shutdown completed successfully. Exiting process.");
        process.exit(0);
      } catch (error) {
        logger.fatal({ err: error }, "Emergency crash during shutdown cleanup steps!");
        process.exit(1);
      }
    });

    // Forced Safety Timeout: If cleanup hangs for more than 10 seconds, force exit
    setTimeout(() => {
      logger.fatal("Force killing backend! Shutdown tasks took too long (10s timeout).");
      process.exit(1);
    }, 10000);
  };

  // Listen for operating system termination interrupts
  process.on("SIGTERM", () => handleShutdown("SIGTERM")); // Triggered by platforms like Docker/Heroku on deploys
  process.on("SIGINT", () => handleShutdown("SIGINT")); // Triggered by pressing Ctrl+C in your local terminal
};
