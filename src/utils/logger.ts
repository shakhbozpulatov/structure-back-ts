import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";
import { LOG_DIR } from "@config";

const logDir: string = join(process.cwd(), LOG_DIR);
const logFormat = winston.format.printf(
  ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
);

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
  transports: [
    // Debug log settings
    new winstonDaily({
      level: "debug",
      datePattern: "YYYY-MM-DD",
      dirname: `${logDir}/debug`,
      filename: "%DATE%.log",
      maxFiles: 30,
      json: false,
      zippedArchive: true,
    }),
    // Error log setting
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: `${logDir}/error`,
      filename: `%DATE%.log`,
      maxFiles: 30,
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.colorize()
    ),
  })
);

export const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf("\n")));
  },
};
