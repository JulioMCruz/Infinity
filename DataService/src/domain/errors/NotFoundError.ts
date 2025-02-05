import {StatusCodes, getReasonPhrase} from "http-status-codes";
import {CustomError} from "./CustomError";

export class NotFoundError extends CustomError {
  constructor(message?: string) {
    super(message || getReasonPhrase(StatusCodes.NOT_FOUND), StatusCodes.NOT_FOUND);
  }
}
