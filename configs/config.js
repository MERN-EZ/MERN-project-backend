import dotenv from "dotenv";
dotenv.config();

const config = {
  DB_CONNECTION_2024: process.env.MONGODB_URL_2024,
  DB_CONNECTION_2025: process.env.MONGODB_URL_2025,
  DB_CONNECTION_2026: process.env.MONGODB_URL_2026,
};

export default config;
