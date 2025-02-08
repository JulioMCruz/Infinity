# @elizaos/plugin-infinity

A plugin for creating and managing blockchain-based promotional token campaigns on the Polygon network.

## Features

- Create promotional token campaigns with customizable parameters
- Manage EVM wallet operations
- Support for multiple EVM-compatible chains
- Secure key management with TEE support

## Installation

```bash
npm install @elizaos/plugin-infinity
```

## Configuration

Required environment variables:

```env
EVM_PRIVATE_KEY=your_private_key
EVM_PROVIDER_URL=your_rpc_url
WALLET_SECRET_SALT=your_salt  # Required when TEE_MODE is enabled
TEE_MODE=ON|OFF
```

## Basic Usage

```typescript
import { infinityPlugin } from '@elizaos/plugin-infinity';

// Example: Creating a new promotion
const promotionConfig = {
  name: "Summer Sale 2025",
  symbol: "SS25",
  maxTokens: "1000",
  duration: "2592000", // 30 days in seconds
  baseURI: "https://example.com/metadata/"
};
```

## Actions

### CREATE_PROMOTION
Creates a new promotional token campaign with specified parameters:
- name: Promotion name
- symbol: Token symbol
- maxTokens: Maximum number of tokens
- duration: Promotion duration in seconds
- baseURI: Base URI for token metadata

## Dependencies

- @elizaos/core
- viem
- node-cache
- @elizaos/plugin-tee

## License

MIT
