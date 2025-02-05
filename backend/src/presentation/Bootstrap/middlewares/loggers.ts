import * as winston from "winston";
import "winston-daily-rotate-file";
import * as path from "path";
import c from "ansi-colors";
import { Enviroment } from "@Src/utils";
import { ILoggerAdapter } from "@Domain/adapters/types";

export class WinstonLogger implements ILoggerAdapter {
  private logger: winston.Logger;

  constructor(environment: Enviroment) {
    const transports = this.getTransports(environment);
    this.logger = this.createLogger(transports, environment);
  }

  private getTransports(environment: Enviroment): winston.transport[] {
    const transports: winston.transport[] = [];
    const logsDir = path.join(process.cwd(), "logs");

    const fileTransportOptions = {
      maxSize: "10m",
      maxFiles: "14d",
      compress: true,
      zippedArchive: true,
    };

    if (environment === "local") {
      transports.push(
        new winston.transports.Console({
          level: "debug",
        }),
      );
    }

    if (environment !== "local") {
      transports.push(
        new winston.transports.DailyRotateFile({
          ...fileTransportOptions,
          filename: path.join(logsDir, "error-%DATE%.log"),
          datePattern: "YYYY-MM-DD",
          level: "error",
        }),
      );

      transports.push(
        new winston.transports.DailyRotateFile({
          ...fileTransportOptions,
          filename: path.join(logsDir, "info-%DATE%.log"),
          datePattern: "YYYY-MM-DD",
          level: "info",
        }),
      );
    }

    return transports;
  }

  private createLogger(transports: winston.transport[], environment: Enviroment): winston.Logger {
    const customFormat = winston.format.printf((info) =>
    {
      const timestamp = typeof info.timestamp === "string" ? info.timestamp : new Date().toISOString();
      const method = typeof info.method === "string" ? c.green(info.method) : c.yellow("Unknown");
      const url = typeof info.url === "string" ? c.blue(info.url) : c.yellow("Unknown URL");
      const headers = info.headers ? c.white(JSON.stringify(info.headers, null, 2)) : c.gray("{}");
      const body = info.body ? c.white(JSON.stringify(info.body, null, 2)) : c.gray("No body");
      const statusCode = typeof info.statusCode === "number" ? info.statusCode : 0;
      const responseTime = info.responseTime ? `${info.responseTime} ms` : "N/A";
      const responseBody = info.responseBody ? c.white(JSON.stringify(info.responseBody, null, 2)) : c.gray("{}");

      let statusColor = c.white(statusCode.toString());
      if (statusCode >= 200 && statusCode < 300) {
        statusColor = c.green(statusCode.toString());
      } else if ((statusCode >= 300 && statusCode < 400) || statusCode === 304) {
        statusColor = c.yellow(statusCode.toString());
      } else if (statusCode >= 400) {
        statusColor = c.red(statusCode.toString());
      }

      const topBorder = c.blue("════════════════════════════════════════════════════════════");
      const requestTitle = c.blue.bold("REQUEST INFORMATION");
      const responseTitle = c.blue.bold("RESPONSE INFORMATION");

      return `${topBorder}
${c.blue("╔══════════════════════════════════════════════════════════╗")}
${c.blue("║                     ")}${requestTitle}${c.blue("                  ║")}
${c.blue("╚══════════════════════════════════════════════════════════╝")}

   📅 Timestamp:    ${c.dim(timestamp)}
   🎯 Method:       ${method}
   🌐 URL:          ${url}

   📋 ${c.bold("HEADERS:")}
   ${headers}

   📦 ${c.bold("BODY:")}
   ${body}

${topBorder}
${c.blue("╔══════════════════════════════════════════════════════════╗")}
${c.blue("║                     ")}${responseTitle}${c.blue("                 ║")}
${c.blue("╚══════════════════════════════════════════════════════════╝")}

   ⚡ Status:       ${statusColor}
   ⏱️  Response Time: ${c.yellow(responseTime)}

   🔍 ${c.bold("RESPONSE BODY:")}
   ${responseBody}

${topBorder}`;
    });

    return winston.createLogger({
      level: environment === "local" ? "debug" : "info",
      format: customFormat,
      transports,
    });
  }

  info(message: unknown): void {
    this.logger.info(message);
  }

  warn(message: unknown): void {
    this.logger.warn(message);
  }

  error(message: unknown): void {
    this.logger.error(message);
  }
}

export const createLogger = (environment: Enviroment): ILoggerAdapter => {
  return new WinstonLogger(environment);
};
