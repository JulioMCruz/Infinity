import {Request, Response, NextFunction, ErrorRequestHandler} from "express";
import {StatusCodes, getReasonPhrase} from "http-status-codes";
import {ILoggerAdapter} from "@Domain/adapters/types";
import {CustomError} from "@Domain/errors/CustomError";

export class ErrorHandlerMiddleware {
  static errorHandler(logger: ILoggerAdapter): ErrorRequestHandler {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
      if (err instanceof CustomError) {
        logger.error(`CustomError ${err.statusCode}: ${err.message}`);
        res.status(err.statusCode).json({error: err.message});
      } else if (err instanceof Error) {
        logger.error(`Uncaught Error: ${err.message}\nStack: ${err.stack}`);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        });
      } else {
        logger.error(`Unknown error type: ${JSON.stringify(err)}`);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        });
      }
    };
  }
}
