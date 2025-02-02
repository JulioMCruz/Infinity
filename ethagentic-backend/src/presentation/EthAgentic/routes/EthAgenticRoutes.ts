import { Router } from 'express';
import { EthAgenticController } from '../controllers/EthAgenticController';
import { EthAgenticService } from '../services/EthAgenticService';
import { EthAgenticRepository } from '../repositories/EthAgenticRepository';

export class EthAgenticRoutes {
  public routes: Router;
  public name: string;

  constructor() {
    this.routes = Router();
    this.name = 'EthAgentic';
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    const repository = new EthAgenticRepository();
    const service = new EthAgenticService(repository);
    const controller = new EthAgenticController(service);

    this.routes.get('/eth-agentic/sales', controller.getSales);
    this.routes.get('/eth-agentic/insights', controller.getInsights);
  }
}