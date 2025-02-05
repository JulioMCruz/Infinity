export interface ILoggerAdapter {
  info(message: unknown): void;
  warn(message: unknown): void;
  error(message: unknown): void;
  debug?(message: unknown): void;
}
