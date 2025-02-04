import axios from 'axios';
import { EthAgenticConfig, GetSalesResponse } from './types';

export const createSalesService = (baseUrl: string) => new SalesService({ baseUrl });

class SalesService {
  private baseUrl: string;

  constructor(config: EthAgenticConfig) {
    this.baseUrl = config.baseUrl;
  }

  private getApiUrl(endpoint: string): string {
    return `${this.baseUrl}/api/v1/eth-agentic/${endpoint}`;
  }

  async getSales(): Promise<GetSalesResponse> {
    try {
      const response = await axios.get<GetSalesResponse>(this.getApiUrl('sales'));
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.error || 'Error fetching sales data'
        };
      }
      return {
        success: false,
        error: 'Unknown error occurred while fetching sales data'
      };
    }
  }
}