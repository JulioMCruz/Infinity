import { Request, Response } from 'express';
import { IEthAgenticService } from '@Src/presentation/Infinity/eth.types';
import { NotFoundError } from '@Domain/errors/NotFoundError';

export class EthAgenticController {
  constructor(private service: IEthAgenticService) {}

  public getSales = async (_req: Request, res: Response): Promise<void> => {
    try {
      const sales = await this.service.getSales();
      
      res.json({
        success: true,
        data: sales
      });
    } catch (error) {
      console.error('Error in EthAgenticController.getSales:', error);

      if (error instanceof NotFoundError) {
        res.status(404).json({
          success: false,
          error: error.message
        });
        return;
      }

      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  };

  public getInsights = async (_req: Request, res: Response): Promise<void> => {
    try {
      const insights = await this.service.getInsights();
      
      res.json({
        success: true,
        data: insights
      });
    } catch (error) {
      console.error('Error in EthAgenticController.getInsights:', error);

      if (error instanceof NotFoundError) {
        res.status(404).json({
          success: false,
          error: error.message
        });
        return;
      }

      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  };
}