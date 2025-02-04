import { ILoyaltyRepository, Business, PointsDistribution, Coupon, CouponActivity } from "@Src/presentation/Infinity/loyalty.types";
import { NotFoundError } from "@Domain/errors/NotFoundError";
import { v4 as uuidv4 } from 'uuid';

export class MockLoyaltyRepository implements ILoyaltyRepository {
  private businesses: Business[] = [];
  private pointsDistributions: PointsDistribution[] = [];
  private coupons: Coupon[] = [];
  private couponActivities: CouponActivity[] = [];

  async registerBusiness(business: Omit<Business, 'id' | 'createdAt'>): Promise<Business> {
    const newBusiness: Business = {
      id: uuidv4(),
      ...business,
      createdAt: new Date().toISOString()
    };
    this.businesses.push(newBusiness);
    return newBusiness;
  }

  async getBusiness(walletAddress: string): Promise<Business> {
    const business = this.businesses.find(b => b.walletAddress === walletAddress);
    if (!business) {
      throw new NotFoundError('Business not found');
    }
    return business;
  }

  async distributePoints(distribution: Omit<PointsDistribution, 'id' | 'pointsEarned'>): Promise<PointsDistribution> {
    const business = await this.getBusiness(distribution.walletAddress);
    const pointsEarned = distribution.amount * business.pointsRatio;

    const newDistribution: PointsDistribution = {
      id: uuidv4(),
      ...distribution,
      pointsEarned,
      timestamp: new Date().toISOString()
    };
    this.pointsDistributions.push(newDistribution);
    return newDistribution;
  }

  async mintCoupon(coupon: Omit<Coupon, 'id' | 'status' | 'timestamp'>): Promise<Coupon> {
    const newCoupon: Coupon = {
      id: uuidv4(),
      ...coupon,
      status: 'minted',
      timestamp: new Date().toISOString()
    };
    this.coupons.push(newCoupon);

    const activity: CouponActivity = {
      id: uuidv4(),
      timestamp: newCoupon.timestamp,
      action: 'coupon_minted',
      details: {
        sent_to: 'here',
        wallet: coupon.walletAddress,
        points_deducted: coupon.pointsCost,
        item: coupon.item
      }
    };
    this.couponActivities.push(activity);

    return newCoupon;
  }

  async burnCoupon(walletAddress: string, item: string): Promise<Coupon> {
    const coupon = this.coupons.find(
      c => c.walletAddress === walletAddress && c.item === item && c.status === 'minted'
    );

    if (!coupon) {
      throw new NotFoundError('No valid coupon found to burn');
    }

    coupon.status = 'burned';

    const activity: CouponActivity = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      action: 'coupon_burned',
      details: {
        sent_to: 'here',
        wallet: walletAddress,
        points_deducted: coupon.pointsCost,
        item: item,
        status: 'unfulfilled'
      }
    };
    this.couponActivities.push(activity);

    return coupon;
  }

  async getCouponActivities(): Promise<CouponActivity[]> {
    return this.couponActivities;
  }

  async getUnredeemedCoupons(): Promise<Coupon[]> {
    return this.coupons.filter(c => c.status === 'burned');
  }

  async markCouponAsFulfilled(walletAddress: string, item: string): Promise<Coupon> {
    const coupon = this.coupons.find(
      c => c.walletAddress === walletAddress && c.item === item && c.status === 'burned'
    );

    if (!coupon) {
      throw new NotFoundError('No burned coupon found to fulfill');
    }

    coupon.status = 'fulfilled';
    return coupon;
  }
}
