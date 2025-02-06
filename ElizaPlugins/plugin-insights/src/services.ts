import axios from 'axios';
import { elizaLogger } from "@elizaos/core";
import { EthAgenticConfig, GetInsightsResponse } from './types';

export const createInsightsService = (baseUrl: string) => new InsightsService({ baseUrl });

class InsightsService {
  private baseUrl: string;

  constructor(config: EthAgenticConfig) {
    this.baseUrl = config.baseUrl;
  }

  private getApiUrl(endpoint: string): string {
    return `${this.baseUrl}/api/v1/eth-agentic/${endpoint}`;
  }

  async getInsights(): Promise<GetInsightsResponse> {
    try {
      const response = await axios.get<GetInsightsResponse>(this.getApiUrl('insights'));
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.error || 'Error fetching insights data'
        };
      }
      return {
        success: false,
        error: 'Unknown error occurred while fetching insights data'
      };
    }
  }
}