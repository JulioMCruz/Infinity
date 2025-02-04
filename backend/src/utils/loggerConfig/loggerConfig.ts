import { createLogger, format, transports, Logger, Logform } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import c from "ansi-colors";

const { combine, printf } = format;
const mergeMessageIntoInfo = format((info) => {
  if (typeof info.message === 'object' && info.message !== null) {
    const msgObj = info.message;
    delete info.message;
    Object.assign(info, msgObj);
  }
  return info;
})();

const customFormat = (): Logform.Format => {
  return printf((info) => {
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
};

function getTransports(env: string) {
  const baseFormat = combine(
    mergeMessageIntoInfo,
    customFormat()
  );

  if (env === "local") {
    return [
      new transports.Console({
        level: "debug",
        format: baseFormat,
      }),
    ];
  }

  return [
    new DailyRotateFile({
      filename: "logs/application-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "30d",
      level: "info",
      format: baseFormat,
    }),
    new DailyRotateFile({
      filename: "logs/errors-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "30d",
      level: "error",
      format: baseFormat,
    }),
  ];
}

export function createAppLogger(env: string): Logger {
  return createLogger({
    level: "info",
    format: combine(mergeMessageIntoInfo, customFormat()),
    transports: getTransports(env),
  });
}
