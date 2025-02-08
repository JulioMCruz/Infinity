# @elizaos/plugin-infinity-privy-nillion

A plugin for managing social wallet creation and product sales using Privy for authentication and Nillion for secure data storage.

## Features

- Social wallet creation with multiple authentication methods
- Product sale management with implicit wallet understanding
- Secure data storage using Nillion
- Comprehensive error handling and validation
- Detailed logging system

## Installation

```bash
npm install @elizaos/plugin-infinity-privy-nillion
```

## Configuration

### Environment Variables
Required configuration for Privy and Nillion integration:
```env
PRIVY_APP_ID=your_privy_app_id
PRIVY_SECRET=your_privy_secret
NILLION_API_KEY=your_nillion_api_key
```

## Actions

### CREATE_SOCIAL_WALLET
Creates a new wallet using social login via Privy with the following features:

- **Functionality**:
  - Social login integration (Google, Twitter, etc.)
  - User type specification (business/customer)
  - Chain preference configuration
  - Secure wallet creation

- **Output Format**:
  ```typescript
  {
    address: string;      // Wallet address
    userType: string;     // "business" or "customer"
    chain: {
      name: string;       // Chain name
      id: number;        // Chain ID
    };
    socialMethod: string; // Authentication method used
  }
  ```

- **Example Response**:
  ```text
  Successfully created wallet using google login
  Address: 0x1234...5678
  User Type: business
  Chain: base-sepolia
  ```

### CREATE_PRODUCT_SALE
Creates a new product sale with implicit wallet understanding:

- **Functionality**:
  - Product sale creation
  - Automatic wallet association
  - Price and promotion management
  - Transaction timestamping

- **Output Format**:
  ```typescript
  {
    actionContent: string;   // Sale action description
    promotionName: string;   // Product name
    amount: number;          // Sale amount
    walletAddress: string;   // Associated wallet
    timestamp: string;       // Transaction timestamp
  }
  ```

- **Example Response**:
  ```text
  Successfully created product sale
  Action: I want to sell for a product
  Product: Gold Membership
  Amount: $299.99
  Wallet: 0x1234...5678
  ```

## Usage

```typescript
import { createSocialWalletAction, createItemSellAction } from '@elizaos/plugin-infinity-privy-nillion';

// Plugin will automatically handle:
// - Social authentication
// - Wallet creation
// - Product sale management
// - Data encryption and storage
```

## Error Handling

The plugin includes comprehensive error handling:
- Input validation
- Authentication errors
- Transaction validation
- Wallet creation errors
- Detailed error messages with context
- Debug logging for troubleshooting

## Logging System

Detailed logging system with different contexts:
- 🔵 Debug information
- 🟢 Success messages
- 🔴 Error details
- Transaction tracking
- Wallet creation events

## Best Practices

1. **Wallet Management**
   - Secure storage of credentials
   - Regular validation of wallet state
   - Proper error recovery

2. **Product Sales**
   - Clear product naming
   - Accurate price specification
   - Complete transaction details

3. **Security**
   - Secure social authentication
   - Encrypted data storage
   - Protected wallet operations

## Examples

### Social Wallet Creation
```typescript
// Example of creating a social wallet
"I want to sign up as a business using Google login"
```

### Product Sale Creation
```typescript
// Example of creating a product sale
"I want to sell for a product called 'Gold Membership' for $299.99"
```

## Command Recognition

The plugin recognizes various command formats:
- "create wallet with social login"
- "sign up using social account"
- "sell for a product"
- "create a sale for a product"

## Development

### State Management
- Proper state initialization
- Context maintenance
- Transaction tracking
- Response formatting

### Data Processing
- Input validation
- Price formatting
- Wallet address generation
- Transaction timestamping

## Dependencies

- @elizaos/core
- Privy SDK
- Nillion SDK

## License

MIT
