# @elizaos/plugin-infinity

A plugin for ElizaOS that provides blockchain wallet functionality and token management capabilities.

## Description

The Infinity plugin enables blockchain-related functionalities for ElizaOS agents, including wallet address management and promotional token deployment. It provides essential actions for interacting with EVM-compatible blockchains.

## Installation

```bash
pnpm install @elizaos/plugin-infinity
```

## Features

### 1. Wallet Management
- Retrieve wallet addresses
- EVM-compatible wallet integration
- Secure private key handling
- Multiple wallet action support

### 2. Token Operations
- Deploy promotional tokens
- Configure token parameters:
  - Token name and symbol
  - Maximum supply
  - Promotion duration
  - Token metadata URI
- Transaction handling and verification

## Actions

### 1. GET_WALLET_ADDRESS
Retrieves the wallet address associated with the current runtime.

Similes:
- SHARE_YOUR_WALLET_ADDRESS
- SHOW_YOUR_WALLET_ADDRESS
- STATE_YOUR_WALLET_ADDRESS
- And more...

Requirements:
- Valid INFINITY_PROMOTION_CONTRACT_ADDRESS configuration
- Valid INFINITY_PROMOTION_FACTORY_CONTRACT_ADDRESS configuration
- Valid EVM_PRIVATE_KEY configuration
- Valid EVM_PROVIDER_URL configuration

### 2. CREATE_PROMOTION
Creates and deploys a new promotional token with specified parameters.

Similes:
- CREATE_TOKEN
- DEPLOY_TOKEN
- NEW_TOKEN

Parameters:
- Token name
- Token symbol
- Maximum token supply
- Promotion duration
- Base URI for token metadata

## Providers

### Wallet Provider
- Manages wallet connections
- Handles address retrieval
- Supports multiple chains
- Integrates with EVM-compatible networks

## Development

1. Install dependencies:
```bash
pnpm install
```

2. Build the plugin:
```bash
pnpm run build
```

3. Run linting:
```bash
pnpm run lint
```

## Dependencies

- @elizaos/core: workspace:*
- @elizaos/plugin-tee: workspace:*

## Configuration

The plugin requires certain environment variables to be set:

```env
# Main contract for promotional tokens
INFINITY_PROMOTION_CONTRACT_ADDRESS=

# Factory contract for deploying new tokens
INFINITY_PROMOTION_FACTORY_CONTRACT_ADDRESS=

# Wallet private key for signing transactions
EVM_PRIVATE_KEY=

# RPC endpoint URL for blockchain connection
EVM_PROVIDER_URL=
```
- Additional configuration for the Infinity contract deployment

## Contributing

Contributions are welcome! Please ensure you follow the project's coding standards and include appropriate tests for new features.

## License

This plugin is part of the Eliza project. See the main project repository for license information.
