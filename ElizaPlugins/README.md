<div align="center">
<img src="../public/logo.png" alt="Infinity Plugins" width="200"/>

# Infinity Eliza Plugins

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Eliza OS](https://img.shields.io/badge/ElizaOS-Plugins-purple.svg)](https://elizaos.com)
</div>

## 📑 Table of Contents
- [About](#-about)
- [Plugins](#-plugins)
- [Installation](#-installation)
- [Development](#-development)

## 💡 About

This directory contains the Eliza OS plugins that power the Infinity ecosystem. Each plugin provides specific functionality to the AI characters and integrates with different parts of the system.

## 🔌 Plugins

### plugin-infinity
Core plugin for Infinity platform integration
- **Purpose**: Handles core Infinity platform functionality
- **Key Features**:
  - 🎯 Promotion creation and management
  - 💼 Contract interactions
  - 🔗 Wallet provider integration
  - 📝 Smart contract ABIs
- **Main Actions**:
  - `createPromotionAction`: Creates new promotional campaigns
- **Providers**:
  - Wallet provider for blockchain interactions

### plugin-infinity-agentkit
Reward management plugin
- **Purpose**: Manages reward distribution and tracking
- **Key Features**:
  - 🎁 Reward creation and distribution
  - 📊 Reward tracking
  - ⚡ Real-time processing
  - 🔄 Automated distribution
- **Main Actions**:
  - `createRewardAction`: Creates and distributes rewards
- **Testing**: Includes Vitest configuration for testing

### plugin-insights
Analytics and insights plugin
- **Purpose**: Provides analytical insights and data processing
- **Key Features**:
  - 📈 Data analytics
  - 🔍 Insight generation
  - 📊 Performance metrics
  - 📱 Service integration
- **Main Actions**:
  - `getInsights`: Retrieves analytical insights
- **Services**: Custom analytics services

### plugin-sales
Sales management plugin
- **Purpose**: Handles sales operations and tracking
- **Key Features**:
  - 💰 Sales tracking
  - 📊 Sales analytics
  - 🎯 Performance monitoring
  - 📈 Reporting tools
- **Main Actions**:
  - `getSales`: Retrieves sales data
- **Services**: Sales-specific services

### plugin-infinity-privy-nillion
Social wallet creation and secure storage plugin
- **Purpose**: Manages Web3 wallet creation through social login
- **Key Features**:
  - 🔑 Social login integration with Privy
  - 🛡️ Secure data storage with Nillion
  - 👥 Business and customer wallet support
  - 🔒 Encrypted wallet data management
  - 🌐 Base Sepolia network integration
- **Main Actions**:
  - `createSocialWallet`: Creates wallets using social login
- **Security**:
  - Privy authentication
  - Nillion encrypted storage
  - Environment validation

## 🚀 Installation

To use these plugins in your Eliza OS project:

1. Install desired plugins:
```bash
# Core plugin
npm install @elizaos/plugin-infinity

# Reward management
npm install @elizaos/plugin-infinity-agentkit

# Analytics
npm install @elizaos/plugin-insights

# Sales
npm install @elizaos/plugin-sales

# Social Wallet
npm install @elizaos/plugin-infinity-privy-nillion
```

2. Add to your character configuration:
```json
{
  "plugins": [
    "@elizaos/plugin-infinity",
    "@elizaos/plugin-infinity-agentkit",
    "@elizaos/plugin-insights",
    "@elizaos/plugin-sales",
    "@elizaos/plugin-infinity-privy-nillion"
  ]
}
```

## 💻 Development

### Prerequisites
- Node.js >=22.10.0
- TypeScript 5.x
- Eliza OS SDK

### Setting Up Development Environment

1. Clone the repository
```bash
git clone https://github.com/infinity/infinity.git
cd infinity/ElizaPlugins
```

2. Install dependencies
```bash
# For each plugin
cd plugin-name
npm install
```

3. Build plugin
```bash
npm run build
```

4. Run tests
```bash
npm test
```

### Plugin Structure
```plaintext
plugin-name/
├── src/
│   ├── actions/      # Plugin actions
│   ├── evaluators/   # Custom evaluators
│   ├── providers/    # Service providers
│   ├── types/        # TypeScript types
│   └── index.ts      # Main entry point
├── __tests__/        # Test files
├── tsconfig.json     # TypeScript config
└── package.json      # Package config
```

### Creating a New Plugin

1. Create new plugin directory:
```bash
mkdir plugin-name
cd plugin-name
```

2. Initialize package:
```bash
npm init
```

3. Add required dependencies:
```bash
npm install --save-dev typescript tsup @elizaos/sdk
```

4. Create basic structure:
```bash
mkdir src __tests__
touch src/index.ts
```

5. Implement plugin functionality following the existing plugins as examples

### Testing

Each plugin includes its own test suite using Vitest. Run tests with:
```bash
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

<div align="center">

### Built with 💫 by the Infinity Team

</div>
