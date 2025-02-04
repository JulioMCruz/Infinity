

export interface Insight {
  id: string;
  metric: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T[];
  error?: string;
}

export interface EthAgenticConfig {
  baseUrl: string;
}

export interface GetInsightsResponse extends ApiResponse<Insight> {}