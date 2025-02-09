<div align="center">
<img src="../public/logo.png" alt="Infinity Plugins" width="200"/>

# Infinity Eliza Plugins

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Eliza OS](https://img.shields.io/badge/ElizaOS-Plugins-purple.svg)](https://elizaos.com)
</div>

## 📑 Table of Contents
- [About](#-about)
- [Plugins](#-plugins)

## 💡 About

This directory contains the Eliza OS plugins that power the Infinity ecosystem. Each plugin provides specific functionality to the AI characters and integrates with different parts of the system.

## 🔌 Plugins

### plugin-infinity
Core plugin for Infinity platform integration

📖 **[Plugin Details & Documentation](../ElizaPlugins/plugin-infinity/README.md)**

- **Purpose**: Handles core Infinity platform functionality
- **Key Features**:
  - 🎯 Promotion creation and management
  - 💼 Contract interactions
  - 🔗 Wallet provider integration
  - 📝 Smart contract ABIs
- **Main Actions**:
  - `CREATE_PROMOTION`: Creates new promotional campaigns
- **Providers**:
  - Wallet provider for blockchain interactions

### plugin-infinity-agentkit
Reward management plugin

📖 **[Plugin Details & Documentation](../ElizaPlugins/plugin-infinity-agentkit/README.md)**

- **Purpose**: Manages reward distribution and tracking
- **Key Features**:
  - 🎁 Reward creation and distribution
  - 📊 Reward tracking
  - ⚡ Real-time processing
  - 🔄 Automated distribution
- **Main Actions**:
  - `CREATE_REWARD`: Creates and distributes rewards
- **Testing**: Includes Vitest configuration for testing

### plugin-insights
Analytics and insights plugin

📖 **[Plugin Details & Documentation](../ElizaPlugins/plugin-insights/README.md)**

- **Purpose**: Provides analytical insights and data processing
- **Key Features**:
  - 📈 Data analytics
  - 🔍 Insight generation
  - 📊 Performance metrics
  - 📱 Service integration
- **Main Actions**:
  - `GET_INSIGHTS`: Retrieves analytical insights
- **Services**: Custom analytics services

### plugin-sales
Sales management plugin

📖 **[Plugin Details & Documentation](../ElizaPlugins/plugin-sales/README.md)**

- **Purpose**: Handles sales operations and tracking
- **Key Features**:
  - 💰 Sales tracking
  - 📊 Sales analytics
  - 🎯 Performance monitoring
  - 📈 Reporting tools
- **Main Actions**:
  - `GET_SALES`: Retrieves sales data
- **Services**: Sales-specific services

### plugin-infinity-privy-nillion
Social wallet creation and product sales management plugin

📖 **[Plugin Details & Documentation](../ElizaPlugins/plugin-infinity-privy-nillion/README.md)**

- **Purpose**: Manages Web3 wallet creation and product sales with secure storage
- **Key Features**:
  - 🔑 Social login integration with Privy
  - 🛡️ Secure data storage with Nillion
  - 👥 Business and customer wallet support
  - 🔒 Encrypted wallet data management
  - 🌐 Base Sepolia network integration
  - 🛍️ Product sales management
  - 🏷️ Implicit wallet handling
- **Main Actions**:
  - `CREATE_POS_WALLET`: Creates point of sale wallets for food businesses
    - Supports multiple location types (food truck, restaurant, kiosk)
    - Secures wallet keys with Nillion
    - Stores location metadata securely
    - Chain-specific wallet creation (Base Sepolia)
- **Features**:
  - Comprehensive error handling and validation
  - Detailed logging system with different contexts
  - Secure social authentication
  - Protected wallet operations
  - Transaction tracking
  - State management and data processing
