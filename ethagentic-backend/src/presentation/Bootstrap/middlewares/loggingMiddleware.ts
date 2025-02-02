import {Request, Response, NextFunction} from "express";
import {ILoggerAdapter} from "@Domain/adapters/types";

export function loggingMiddleware(logger: ILoggerAdapter) {
  return (req: Request, res: Response, next: NextFunction) => {
    const start = process.hrtime();
    const originalSend = res.send;
    let responseBody: unknown;
    res.send = function (body: unknown) {
      responseBody = body;
      return originalSend.call(this, body);
    };

    res.on("finish", () => {
      const diff = process.hrtime(start);
      const elapsedMs = ((diff[0] * 1e9) + diff[1]) / 1e6; // ms
      const {method, originalUrl} = req;
      const statusCode = res.statusCode;

      let level: "info" | "warn" | "error" = "info";
      if (statusCode >= 400 && statusCode < 500) level = "warn";
      if (statusCode >= 500) level = "error";

      const logData = {
        timestamp: new Date().toISOString(),
        method,
        url: `${req.protocol}://${req.get('host')}${originalUrl}`,
        headers: req.headers,
        body: req.body,
        statusCode,
        responseTime: elapsedMs.toFixed(3),
        responseBody: responseBody ?? {},
      };

      logger[level](logData);
    });
    next();
  };
}
