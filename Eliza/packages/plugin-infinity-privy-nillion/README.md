# @elizaos/plugin-infinity-privy-nillion

A plugin for Infinity's AI-powered loyalty system that handles social wallet creation and secure data storage.

## Features

- Create Web3 wallets using social login via Privy
- Support for both business owners and customers
- Secure wallet data storage with Nillion
- Integration with Base Sepolia network
- Part of Infinity's AI-powered loyalty system

## Installation

```bash
npm install @elizaos/plugin-infinity-privy-nillion
```

## Configuration

Required environment variables:

```env
PRIVY_APP_ID=your_privy_app_id
PRIVY_APP_SECRET=your_privy_secret
NILLION_API_KEY=your_nillion_key
```

## Basic Usage

```typescript
import { infinityPlugin } from '@elizaos/plugin-infinity-privy-nillion';

// The plugin handles social wallet creation through natural language
// Example: "Create a new wallet for my business using Google login"
```

## Actions

### CREATE_SOCIAL_WALLET
Creates a new wallet using Privy's social login and stores data securely in Nillion:

Parameters extracted from conversation:
- Social login method (Google, Twitter, etc.)
- User type (business/customer)
- Chain preference (defaults to Base Sepolia)

Returns:
- Wallet address
- User type
- Chain information
- Social login method used

Example conversations:
```
User: "Create a new wallet for my business using Google login"
User: "I want to sign up as a customer with my Twitter account"
```

## Integration with Infinity

This plugin is part of the Infinity loyalty system and handles the "Connect Your Wallet" feature, specifically focusing on social login for new Web3 users. It supports:

- Easy onboarding for non-Web3 users
- Secure wallet creation
- Integration with the loyalty system
- Support for both business owners and customers

## Dependencies

- @elizaos/core
- @elizaos/plugin-tee

## License

MIT
