import { Request, Response } from 'express';
import { ILoyaltyService } from '../loyalty.types';

export class LoyaltyController {
  constructor(private service: ILoyaltyService) {}

  public registerBusiness = async (req: Request, res: Response): Promise<void> => {
    try {
      const business = await this.service.registerBusiness(req.body);
      res.status(201).json(business);
    } catch (error) {
      console.error('Error in registerBusiness:', error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  public getBusiness = async (req: Request, res: Response): Promise<void> => {
    try {
      const { walletAddress } = req.params;
      const business = await this.service.getBusiness(walletAddress);
      res.json(business);
    } catch (error) {
      console.error('Error in getBusiness:', error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  public distributePoints = async (req: Request, res: Response): Promise<void> => {
    try {
      const distribution = await this.service.distributePoints(req.body);
      res.status(201).json(distribution);
    } catch (error) {
      console.error('Error in distributePoints:', error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  public mintCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
      const coupon = await this.service.mintCoupon(req.body);
      res.status(201).json(coupon);
    } catch (error) {
      console.error('Error in mintCoupon:', error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  public burnCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
      const { walletAddress, item } = req.body;
      const coupon = await this.service.burnCoupon(walletAddress, item);
      res.json(coupon);
    } catch (error) {
      console.error('Error in burnCoupon:', error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  public getCouponActivities = async (_req: Request, res: Response): Promise<void> => {
    try {
      const activities = await this.service.getCouponActivities();
      res.json(activities);
    } catch (error) {
      console.error('Error in getCouponActivities:', error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  public getUnredeemedCoupons = async (_req: Request, res: Response): Promise<void> => {
    try {
      const coupons = await this.service.getUnredeemedCoupons();
      res.json(coupons);
    } catch (error) {
      console.error('Error in getUnredeemedCoupons:', error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  public markCouponAsFulfilled = async (req: Request, res: Response): Promise<void> => {
    try {
      const { walletAddress, item } = req.body;
      const coupon = await this.service.markCouponAsFulfilled(walletAddress, item);
      res.json(coupon);
    } catch (error) {
      console.error('Error in markCouponAsFulfilled:', error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };
}
