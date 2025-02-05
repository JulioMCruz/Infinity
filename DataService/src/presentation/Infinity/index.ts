import { LoyaltyService } from "./services/LoyaltyService";
import { MockLoyaltyRepository } from "./repositories/MockLoyaltyRepository";

// Create singleton instances
const mockLoyaltyRepository = new MockLoyaltyRepository();
const loyaltyService = new LoyaltyService(mockLoyaltyRepository);

// Export types
export * from "./loyalty.types";

// Export service instance
export { loyaltyService };

// Export classes for testing or custom instantiation
export { LoyaltyService, MockLoyaltyRepository };
