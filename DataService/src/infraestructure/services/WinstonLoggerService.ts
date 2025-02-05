import {ILoggerAdapter} from "@Domain/adapters/types";
import {Logger} from "winston";

export class WinstonLoggerService implements ILoggerAdapter {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
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
  debug(message: unknown): void {
    this.logger.debug(message);
  }
}
