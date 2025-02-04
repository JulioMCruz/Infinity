export interface Sale {
  id: string;
  amount: number;
  date: string;
  product: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T[];
  error?: string;
}

export interface EthAgenticConfig {
  baseUrl: string;
}

export interface GetSalesResponse extends ApiResponse<Sale> {}