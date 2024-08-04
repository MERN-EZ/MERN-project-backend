import express from "express";
import mongoose from "mongoose";
import { connect } from "./utils/database.connection.js";
import logger from "./utils/logger.js";

const app = express();
const PORT = process.env.PORT || "8090";

app.use(express.json());

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  connect();
});
