# @elizaos/plugin-infinity

A plugin for Eliza that provides Ethereum wallet management and token creation capabilities.

## Description

The Infinity plugin enables Eliza to manage Ethereum wallets and create promotional tokens on EVM-compatible chains. It provides actions for retrieving wallet addresses and launching new tokens with customizable parameters.

## Features

### Actions

1. **GET_WALLET_ADDRESS**
   - Retrieves the wallet address associated with the current runtime
   - Similes: SHARE_YOUR_WALLET_ADDRESS, SHOW_YOUR_WALLET_ADDRESS, etc.
   - Requires: EVM_PRIVATE_KEY environment variable

2. **CREATE_PROMOTION** (also: CREATE_TOKEN, DEPLOY_TOKEN, NEW_TOKEN)
   - Launches a new token with specified parameters
   - Parameters:
     - name: Token name
     - symbol: Token symbol
     - maxTokens: Maximum number of tokens that can be minted
     - duration: Duration of the promotion in seconds
     - baseURI: Base URI for token metadata

### Providers

1. **Wallet Provider**
   - Manages EVM wallet functionality
   - Features:
     - Wallet address management
     - Balance checking
     - Chain switching
     - Transaction handling
   - Supports multiple chains including Polygon Amoy
   - Includes caching mechanism for optimized performance

## Installation

```bash
npm install @elizaos/plugin-infinity
```

## Configuration

### Environment Variables

- `EVM_PRIVATE_KEY`: Private key for the Ethereum wallet (required when TEE_MODE is OFF)
- `TEE_MODE`: Trusted Execution Environment mode (optional)
- `WALLET_SECRET_SALT`: Required when TEE_MODE is enabled
- `EVM_PROVIDER_URL`: RPC URL for Polygon Amoy network
- `ETHEREUM_PROVIDER_[CHAIN_NAME]`: RPC URLs for additional chains

### Chain Configuration

The plugin supports multiple EVM-compatible chains. Chain configuration can be specified in the character settings:

```json
{
  "settings": {
    "chains": {
      "evm": ["polygonAmoy", "mainnet", "sepolia"]
    }
  }
}
```

## Usage Examples

### Getting Wallet Address

```typescript
// Example conversation
User: "What's your wallet address?"
Agent: "Here's my wallet address: 0x..."

// Action will be triggered automatically based on natural language
```

### Creating a Promotion Token

```typescript
// Example conversation
User: "Create a new promotion token with the following details:
      Name: MyToken
      Symbol: MTK
      Max Supply: 1000
      Duration: 30 days
      Base URI: https://example.com/metadata/"

Agent: "Creating token..."
// Action will process the parameters and deploy the token
```

## Security Considerations

- Private keys and sensitive data are handled securely
- Optional TEE (Trusted Execution Environment) mode for enhanced security
- Cached data expires after 5 seconds for security
- All transactions require proper authentication

## Dependencies

- @elizaos/core
- @elizaos/plugin-tee
- viem
- node-cache

## Version

Current version: 0.1.8+build.1

## License

See the LICENSE file in the root directory.
