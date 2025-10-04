import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const JWT_SECRET =
  process.env.JWT_SECRET || "development-secret-change-me";
export const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY || "2h";
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/cps-academy";
