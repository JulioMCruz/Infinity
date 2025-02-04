import { Router } from 'express';
import { LoyaltyController } from '../controllers/LoyaltyController';
import { LoyaltyService } from '../services/LoyaltyService';
import { MockLoyaltyRepository } from '../repositories/MockLoyaltyRepository';

export class LoyaltyRoutes {
  public routes: Router;
  public name: string;

  constructor() {
    this.routes = Router();
    this.name = 'Loyalty';
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    const repository = new MockLoyaltyRepository();
    const service = new LoyaltyService(repository);
    const controller = new LoyaltyController(service);

    // Business endpoints
    this.routes.post('/loyalty/business', controller.registerBusiness);
    this.routes.get('/loyalty/business/:walletAddress', controller.getBusiness);

    // Points endpoints
    this.routes.post('/loyalty/points', controller.distributePoints);

    // Coupon endpoints
    this.routes.post('/loyalty/coupon/mint', controller.mintCoupon);
    this.routes.post('/loyalty/coupon/burn', controller.burnCoupon);
    this.routes.post('/loyalty/coupon/fulfill', controller.markCouponAsFulfilled);
    
    // Activity endpoints
    this.routes.get('/loyalty/coupon/activities', controller.getCouponActivities);
    this.routes.get('/loyalty/coupon/unredeemed', controller.getUnredeemedCoupons);
  }
}
