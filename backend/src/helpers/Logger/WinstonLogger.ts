import winston from "winston";
import { ILogger } from "./ILogger";

export class WinstonLogger implements ILogger {
  logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ level, message, timestamp, stack }) => {
        return stack
          ? `${timestamp} ${level}: ${message}\nStack: ${stack}`
          : `${timestamp} ${level}: ${message}`;
      }),
    ),
    transports: [
      // Console Transport - Logs only to console
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.printf(({ level, message, timestamp }) => {
            return `${timestamp} ${level}: ${message}`;
          }),
        ),
      }),

      // Comment out or remove File Transport to disable file logging
      // new winston.transports.File({
      //   filename: "logs.log",
      //   format: winston.format.combine(
      //     winston.format.timestamp(),
      //     winston.format.json(),
      //   ),
      // }),
    ],
  });

  debug(message: string, ...meta: any[]): void {
    this.logger.debug(message, ...meta);
  }
  info(message: string, ...meta: any[]): void {
    this.logger.info(message, ...meta);
  }
  warn(message: string, ...meta: any[]): void {
    this.logger.warn(message, ...meta);
  }
  error(error: Error): void {
    this.logger.error({
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
  }
  log(message: string, ...meta: any[]): void {
    this.logger.info(message, ...meta);
  }
}
