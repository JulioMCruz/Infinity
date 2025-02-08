# Infinity Plugin Documentation

## 1. Basic Information
- **Name**: infinity
- **Main Purpose**: A plugin for creating and managing blockchain-based promotions
- **Problem Solved**: Simplifies the process of deploying and managing promotional token campaigns on blockchain networks, specifically designed for the base network

## 2. Technical Components

### Actions
#### createPromotionAction
- **Purpose**: Launch a new promotional token campaign
- **Input Parameters**:
  ```typescript
  {
    name: string;        // Name of the promotion
    symbol: string;      // Token symbol
    maxTokens: bigint;   // Maximum number of tokens that can be minted
    duration: bigint;    // Duration of the promotion in seconds
    baseURI: string;     // Base URI for token metadata
  }
  ```
- **Expected Output**: Transaction hash and confirmation of promotion creation
- **Usage Example**:
  ```typescript
  // Example of creating a promotion
  {
    name: "Summer Sale 2025",
    symbol: "SS25",
    maxTokens: "1000",
    duration: "2592000", // 30 days in seconds
    baseURI: "https://example.com/metadata/"
  }
  ```

### Providers
#### walletProvider
- **Type**: EVM Wallet Provider
- **Data Handled**: 
  - Wallet address management
  - Balance queries
  - Transaction signing
  - Chain management
- **Usage**:
  - Manages blockchain interactions
  - Handles wallet operations
  - Provides chain configuration
  - Manages transaction signing and sending

## 3. External Integrations
- **Blockchain Networks**:
  - Primary: Polygon Amoy (TestNet)
  - Supports multiple EVM-compatible chains
- **Smart Contracts**:
  - InfinityPromotionFactory: Creates new promotion contracts
  - InfinityPromotion: Individual promotion contract instances
- **Authentication**:
  - Uses private key or TEE-based key derivation
  - Supports both direct private key and secure enclave modes

## 4. Configuration and Deployment

### Environment Variables
- **Required**:
  - `EVM_PRIVATE_KEY`: Private key for transaction signing (when TEE mode is off)
  - `EVM_PROVIDER_URL`: RPC URL for the Polygon Amoy network
  - `WALLET_SECRET_SALT`: Required when TEE_MODE is enabled
  - `TEE_MODE`: Controls the trusted execution environment mode

### Configuration
```typescript
interface InfinityConfig {
  infinityPromotionContractAddress: string,
  infinityPromotionFactoryContractAddress: string,
  chainName: string
}
```

### Dependencies
- @elizaos/core
- viem
- node-cache
- @elizaos/plugin-tee (for TEE support)

## 5. Examples and Use Cases

### Creating a New Promotion
```typescript
// Example of launching a new promotion
const promotionConfig = {
  name: "Winter Sale 2025",
  symbol: "WIN25",
  maxTokens: 1000n,
  duration: 2592000n, // 30 days
  baseURI: "https://api.example.com/promotions/winter2025/"
};
```

## 6. Security Considerations
- Supports Trusted Execution Environment (TEE) for secure key management
- Private keys can be derived securely using the TEE mode
- Implements caching for balance queries to prevent excessive RPC calls
- Sensitive data is handled through environment variables

## 7. Performance and Scalability
- Implements caching system for wallet balances
- Cache expiry set to 5 seconds by default
- Supports multiple EVM chains
- Handles RPC rate limiting through caching

## 8. Maintenance and Support
- Error Handling:
  - Comprehensive error catching in action handlers
  - Detailed error messages for debugging
  - Transaction failure recovery
- Caching:
  - Both in-memory and file-based caching
  - Configurable cache expiration
  - Automatic cache invalidation

## 9. Contribution and Development
- Plugin Structure:
  - Modular design with separate actions, providers, and types
  - Clear separation of concerns
  - Type-safe implementations
- Testing:
  - Action examples provided for testing
  - Validation functions for input checking
  - Error handling patterns established
