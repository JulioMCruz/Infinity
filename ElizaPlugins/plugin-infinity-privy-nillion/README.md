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
# Privy Configuration
PRIVY_APP_ID=your_privy_app_id
PRIVY_APP_SECRET=your_privy_secret

# Nillion Organization Configuration
NILLION_ORG_SK=your_nillion_org_secret_key
NILLION_ORG_DID=your_nillion_org_did

# Nillion Nodes Configuration
NILLION_NODE1_URL=your_nillion_node1_url
NILLION_NODE1_DID=your_nillion_node1_did

NILLION_NODE2_URL=your_nillion_node2_url
NILLION_NODE2_DID=your_nillion_node2_did

NILLION_NODE3_URL=your_nillion_node3_url
NILLION_NODE3_DID=your_nillion_node3_did

# Nillion Schema Configuration
NILLION_SALE_SCHEMA_ID=your_nillion_sale_schema_id

# Chain Configuration
EVM_CHAIN_NAME=base-sepolia
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
Creates a new food truck product sale with implicit wallet understanding:

- **Functionality**:
  - Food truck menu item creation 🚚
  - Automatic wallet association
  - Price management
  - Transaction timestamping
  - Last message processing only

- **Key Features**:
  - Processes only the most recent message in the conversation
  - Ignores previous context for accurate order processing
  - Step-by-step validation with food-specific guidance
  - Food truck focused interface with relevant emojis

- **Output Format**:
  ```typescript
  {
    actionContent: string;   // Sale action description
    promotionName: string;   // Food item name
    amount: number;          // Sale amount
    walletAddress: string;   // Associated wallet
    saleId: string;         // Unique sale identifier
    timestamp: string;       // Transaction timestamp
  }
  ```

- **Example Response**:
  ```text
  ✨ Food Item Added Successfully!
  🎯 Action: I want to sell a product
  🍽️ Item: Gourmet Street Tacos
  💰 Price: $12.99
  🔐 Wallet: 0x1234...5678
  🏷️ Sale ID: abc123
  
  Your food item is now ready for customers! 🚚
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

### Food Truck Product Sale Creation
```typescript
// Examples of creating food truck items
"I want to sell a product called 'Gourmet Street Tacos' for $12.99"
"Create a sale for my 'Loaded Burger Combo' for $15.99"
"Sell my 'Signature Food Truck Bowl' for $13.99"
```

## Command Recognition

The plugin recognizes various command formats:
- "create wallet with social login"
- "sign up using social account"
- "sell a food item"
- "create a sale for my menu item"
- "add item to food truck menu"

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
