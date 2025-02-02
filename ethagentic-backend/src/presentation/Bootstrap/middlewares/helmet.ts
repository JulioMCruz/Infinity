import helmet from "helmet";

export const helmetMiddleware = helmet({
  contentSecurityPolicy: false,
  frameguard: false,
  dnsPrefetchControl: false,
  hidePoweredBy: false,
  hsts: false,
  ieNoOpen: false,
  noSniff: false,
  xssFilter: false,
});
