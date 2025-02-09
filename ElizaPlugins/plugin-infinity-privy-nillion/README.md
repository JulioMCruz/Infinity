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

### CREATE_POS_WALLET
Creates a new point of sale wallet for a food business location:

- **Functionality**:
  - Creates dedicated wallets for food business locations
  - Supports multiple location types (food truck, restaurant, kiosk)
  - Secures wallet keys with Nillion
  - Stores location metadata securely
  - Chain-specific wallet creation (Base Sepolia)

- **Location Types**:
  - food_truck (default)
  - restaurant
  - kiosk

- **Output Format**:
  ```typescript
  {
    walletId: string;     // Privy wallet ID
    address: string;      // Wallet address
    location: {
      name: string;       // Location name
      type: string;       // Location type
      address: string;    // Physical address
    };
    chain: {
      name: string;       // Chain name
      id: number;         // Chain ID (84532 for Base Sepolia)
    };
    timestamp: string;    // Creation timestamp
  }
  ```

- **Example Response**:
  ```text
  ✨ New Point of Sale Wallet Created!
  
  📍 Location: Downtown Food Truck
  🏪 Type: food_truck
  📮 Address: 123 Main St, Downtown
  
  🔐 Wallet Address: 0x1234...5678
  ⛓️ Chain: base-sepolia
  
  Your new point of sale is ready to process transactions! 🎉
  ```


```typescript
import { createPoSWalletAction,  } from '@elizaos/plugin-infinity-privy-nillion';

// Plugin will automatically handle:
// - Wallet creation
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

### Point of Sale Wallet Creation
```typescript
// Examples of creating point of sale wallets
"Create a new wallet for my Downtown food truck location at 123 Main Street"
"Set up a point of sale wallet for my Beachside food truck at Ocean Drive"
"Add a new location wallet for my food truck at Central Park"
"Create a POS wallet for my Airport Terminal kiosk"
```

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
