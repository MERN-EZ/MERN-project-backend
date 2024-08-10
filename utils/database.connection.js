import mongoose from "mongoose";
import config from "../configs/config.js";
import logger from "../utils/logger.js";

const connections = {};

const connect = async (dbName = 2024) => {
  if (connections[dbName]) {
    logger.info(`Using existing connection to the database ${dbName}`);
    return connections[dbName];
  }

  const MONGODB_URL = config[`DB_CONNECTION_${dbName}`];
  logger.info(`Connecting to the database ${dbName}...`);

  try {
    const connection = mongoose.createConnection(MONGODB_URL);

    connection.on("connected", () => {
      logger.info(`Database ${dbName} connected`);
    });

    connection.on("error", (err) => {
      logger.error(`Database ${dbName} connection error: ${err.message}`);
    });

    connections[dbName] = connection;
    return connection;
  } catch (error) {
    logger.error(
      `Failed to connect to the database ${dbName}: ${error.message}`
    );
    throw error; // Rethrow the error to be handled by the caller
  }
};

export { connect };
