import { IEthAgenticService, IEthAgenticRepository, Sale, Insight } from "@Src/presentation/Infinity/eth.types";
import { NotFoundError } from "@Domain/errors/NotFoundError";

export class EthAgenticService implements IEthAgenticService {
  constructor(private repository: IEthAgenticRepository) {}

  async getSales(): Promise<Sale[]> {
    try {
      const sales = await this.repository.getSales();
      
      if (!sales || sales.length === 0) {
        throw new NotFoundError('No se encontraron ventas');
      }

      return sales;
    } catch (error) {
      console.error("Error in EthAgenticService.getSales:", {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : error
      });

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new Error(`Error getting sales: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getInsights(): Promise<Insight[]> {
    try {
      const insights = await this.repository.getInsights();
      
      if (!insights || insights.length === 0) {
        throw new NotFoundError('No se encontraron insights');
      }

      return insights;
    } catch (error) {
      console.error("Error in EthAgenticService.getInsights:", {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : error
      });

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new Error(`Error getting insights: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}