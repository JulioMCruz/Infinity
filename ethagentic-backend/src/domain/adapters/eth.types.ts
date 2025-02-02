export interface Sale {
  id: string;
  amount: number;
  date: string;
  product: string;
}

export interface Insight {
  id: string;
  metric: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
}

export interface IEthAgenticRepository {
  getSales(): Promise<Sale[]>;
  getInsights(): Promise<Insight[]>;
}

export interface IEthAgenticService {
  getSales(): Promise<Sale[]>;
  getInsights(): Promise<Insight[]>;
}