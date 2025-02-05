export interface LogMessage {
  url: string;
  method: string;
  ip: string;
  headers: Record<string, any>;
  body: Record<string, any>;
  params: Record<string, any>;
  query: Record<string, any>;
  timestamp?: string | Date;
  statusCode?: number;
}
