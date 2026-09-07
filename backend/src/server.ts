import app from "./app.js";
import { connectDB } from "@infrastructure/db.js";
import { logger } from "@lib/logger.js";
import { setupGracefulShutdown } from "@config/shutdown.js";
import { ENV } from "@config/env.js";
import { createServer } from "node:http";
import { initializeSocket } from "@socket/socket.server.js";

const startServer = async () => {
  await connectDB();
  const httpServer = createServer(app);

  initializeSocket(httpServer);

  // const server = app.listen(ENV.PORT, () => {
  //   logger.info(`Server is running at port: ${ENV.PORT}`);
  // });

  const server = httpServer.listen(ENV.PORT, () => {
    logger.info(`Server is flying at port: ${ENV.PORT}`);
  });

  setupGracefulShutdown(server);
};

startServer();
