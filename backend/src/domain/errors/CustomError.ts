// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {StatusCodes, getReasonPhrase} from "http-status-codes";

export class CustomError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
