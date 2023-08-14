import dotenv from "dotenv";
dotenv.config();

export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const {
  NODE_ENV,
  PORT,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  CDN_URL,
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHANNEL_ID,
} = process.env;
