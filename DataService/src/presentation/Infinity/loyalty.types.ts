export interface Business {
  id: string;
  name: string;
  products: string;
  walletAddress: string;
  businessType: string;
  pointsRatio: number;
  scanInterval: string;
  createdAt: string;
}

export interface PointsDistribution {
  id: string;
  walletAddress: string;
  amount: number;
  pointsEarned: number;
  timestamp: string;
}

export interface Coupon {
  id: string;
  walletAddress: string;
  item: string;
  pointsCost: number;
  status: 'minted' | 'burned' | 'fulfilled';
  timestamp: string;
}

export interface CouponActivity {
  id: string;
  timestamp: string;
  action: 'coupon_minted' | 'coupon_burned';
  details: {
    sent_to: string;
    wallet?: string;
    points_deducted?: number;
    item: string;
    status?: string;
  };
}

export interface ILoyaltyRepository {
  registerBusiness(business: Omit<Business, 'id' | 'createdAt'>): Promise<Business>;
  getBusiness(walletAddress: string): Promise<Business>;
  distributePoints(distribution: Omit<PointsDistribution, 'id' | 'pointsEarned'>): Promise<PointsDistribution>;
  mintCoupon(coupon: Omit<Coupon, 'id' | 'status' | 'timestamp'>): Promise<Coupon>;
  burnCoupon(walletAddress: string, item: string): Promise<Coupon>;
  getCouponActivities(): Promise<CouponActivity[]>;
  getUnredeemedCoupons(): Promise<Coupon[]>;
  markCouponAsFulfilled(walletAddress: string, item: string): Promise<Coupon>;
}

export interface ILoyaltyService {
  registerBusiness(business: Omit<Business, 'id' | 'createdAt'>): Promise<Business>;
  getBusiness(walletAddress: string): Promise<Business>;
  distributePoints(distribution: Omit<PointsDistribution, 'id' | 'pointsEarned'>): Promise<PointsDistribution>;
  mintCoupon(coupon: Omit<Coupon, 'id' | 'status' | 'timestamp'>): Promise<Coupon>;
  burnCoupon(walletAddress: string, item: string): Promise<Coupon>;
  getCouponActivities(): Promise<CouponActivity[]>;
  getUnredeemedCoupons(): Promise<Coupon[]>;
  markCouponAsFulfilled(walletAddress: string, item: string): Promise<Coupon>;
}
