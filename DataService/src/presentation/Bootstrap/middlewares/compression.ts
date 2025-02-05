import compression from "compression";

export const compressionMiddleware = compression({threshold: 0});
