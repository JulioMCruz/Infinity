import {Server as SocketIOServer} from "socket.io";

export interface HttpsOptions {
  key: Buffer;
  cert: Buffer;
  ca: Buffer;
}

export interface ServerConfig {
  environment: string;
  httpsOptions?: HttpsOptions;
}

export interface CustomErrorArgs {
  statusCode: number;
  message: string;
  name: string;
}

export interface PaginationParams {
  limit?: number;
  skip?: number;
  page?: number;
  upload?: number;
  size?: number;
  start?: Date;
  end?: Date;
  case_id?: string;
  operation_id?: string;
  request_id?: string;
  currentPage?: number;
  totalPages?: number;
  totalElements?: number;
  countTotal?: number;
  nextPage?: number;
  previousPage?: number;
  order?: string | number;
}

declare module "express-serve-static-core" {
  interface Request {
    pagination?: PaginationParams;
    io?: SocketIOServer;
  }
  interface Application {
    io?: SocketIOServer;
  }
}
