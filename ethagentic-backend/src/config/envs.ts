import dotenv from "dotenv";
import {get} from "env-var";

dotenv.config();

export const envs = {
  SERVER: {
    HOST: get("SERVER_HOST").required().asString(),
    PORT: get("SERVER_PORT").required().asPortNumber(),
    NODE_ENV: get("NODE_ENV").required().asString(),
    SERVER_CPU_CORES: get("SERVER_CPU_CORES").required().asIntPositive(),
    MAX_CONNECTIONS_PER_WORKER: get("MAX_CONNECTIONS_PER_WORKER").required().asIntPositive(),
  },
  DB: {},
  JWT: {},
  SERVICES: {},
  METRICS: {},
  LOGGERS: {},
};
