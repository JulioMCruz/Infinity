import { ILoyaltyService, ILoyaltyRepository, Business, PointsDistribution, Coupon, CouponActivity } from "@Src/presentation/Infinity/loyalty.types";
import { NotFoundError } from "@Domain/errors/NotFoundError";

export class LoyaltyService implements ILoyaltyService {
  constructor(private repository: ILoyaltyRepository) {}

  async registerBusiness(business: Omit<Business, 'id' | 'createdAt'>): Promise<Business> {
    try {
      const registeredBusiness = await this.repository.registerBusiness(business);
      return registeredBusiness;
    } catch (error) {
      console.error("Error in LoyaltyService.registerBusiness:", {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : error
      });

      throw new Error(`Error registering business: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getBusiness(walletAddress: string): Promise<Business> {
    try {
      const business = await this.repository.getBusiness(walletAddress);
      
      if (!business) {
        throw new NotFoundError('Business not found');
      }

      return business;
    } catch (error) {
      console.error("Error in LoyaltyService.getBusiness:", {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : error
      });

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new Error(`Error getting business: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async distributePoints(distribution: Omit<PointsDistribution, 'id' | 'pointsEarned'>): Promise<PointsDistribution> {
    try {
      const pointsDistribution = await this.repository.distributePoints(distribution);
      return pointsDistribution;
    } catch (error) {
      console.error("Error in LoyaltyService.distributePoints:", {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : error
      });

      throw new Error(`Error distributing points: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async mintCoupon(coupon: Omit<Coupon, 'id' | 'status' | 'timestamp'>): Promise<Coupon> {
    try {
      const mintedCoupon = await this.repository.mintCoupon(coupon);
      return mintedCoupon;
    } catch (error) {
      console.error("Error in LoyaltyService.mintCoupon:", {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : error
      });

      throw new Error(`Error minting coupon: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async burnCoupon(walletAddress: string, item: string): Promise<Coupon> {
    try {
      const burnedCoupon = await this.repository.burnCoupon(walletAddress, item);
      return burnedCoupon;
    } catch (error) {
      console.error("Error in LoyaltyService.burnCoupon:", {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : error
      });

      throw new Error(`Error burning coupon: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getCouponActivities(): Promise<CouponActivity[]> {
    try {
      const activities = await this.repository.getCouponActivities();
      
      if (!activities || activities.length === 0) {
        throw new NotFoundError('No coupon activities found');
      }

      return activities;
    } catch (error) {
      console.error("Error in LoyaltyService.getCouponActivities:", {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : error
      });

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new Error(`Error getting coupon activities: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getUnredeemedCoupons(): Promise<Coupon[]> {
    try {
      const coupons = await this.repository.getUnredeemedCoupons();
      
      if (!coupons || coupons.length === 0) {
        throw new NotFoundError('No unredeemed coupons found');
      }

      return coupons;
    } catch (error) {
      console.error("Error in LoyaltyService.getUnredeemedCoupons:", {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : error
      });

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new Error(`Error getting unredeemed coupons: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async markCouponAsFulfilled(walletAddress: string, item: string): Promise<Coupon> {
    try {
      const fulfilledCoupon = await this.repository.markCouponAsFulfilled(walletAddress, item);
      return fulfilledCoupon;
    } catch (error) {
      console.error("Error in LoyaltyService.markCouponAsFulfilled:", {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : error
      });

      throw new Error(`Error marking coupon as fulfilled: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
