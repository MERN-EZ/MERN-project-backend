import express from "express";
import mongoose from "mongoose";
import { connect } from "./utils/database.connection.js";
import logger from "./utils/logger.js";

import lessonRoutes from "./routes/lessonRoutes.js";

const app = express();
const PORT = process.env.PORT || "8090";

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/lessons", lessonRoutes);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  connect();
});
