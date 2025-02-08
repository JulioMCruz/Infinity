<div align="center">
<img src="../public/logo.png" alt="Infinity Characters Logo" width="200"/>

# Infinity AI Characters

[![Eliza OS](https://img.shields.io/badge/ElizaOS-Latest-blue.svg)](https://elizaos.com)
[![Anthropic](https://img.shields.io/badge/Anthropic-Claude-purple.svg)](https://anthropic.com)
[![Voice](https://img.shields.io/badge/Voice-Alan_Medium-green.svg)](https://voice.ai)
</div>

## 📑 Table of Contents
- [About](#-about)
- [Characters](#-characters)
- [Configuration](#️-configuration)
- [Usage](#-usage)
- [Development](#-development)

## 💡 About

This directory contains the character definitions for Infinity's AI agents. Each character is designed with specific capabilities and personality traits to serve different aspects of the Infinity ecosystem.

## 🤖 Characters

### Infinity-H
- **Purpose**: Helps early stage founders and small businesses implement blockchain-powered customer loyalty systems
- **Key Features**:
  - 🎯 Customer loyalty reward systems
  - 💰 Token-based rewards
  - 📊 Customer engagement tracking
  - 🔄 Promotional campaign management
- **Topics**: Business, Economics, Blockchain, Web3, Marketing
- **Style**: Friendly and business-savvy, with a focus on optimization

### Loyalty Engine AI
- **Purpose**: Automates customer loyalty programs using blockchain technology
- **Key Features**:
  - 🏆 Points and tier-based rewards
  - 🔒 Non-transferrable NFT tracking
  - 📈 Engagement pattern analysis
  - 🛡️ Fraud prevention
- **Topics**: Blockchain Architecture, Tokenomics, Data Analytics, Security
- **Style**: Technical precision with user-friendly explanations

### Sales Character
- **Purpose**: Manages sales operations and customer interactions
- **Key Features**:
  - 💼 Sales process automation
  - 👥 Customer relationship management
  - 📱 Multi-channel communication
  - 📊 Sales analytics
- **Topics**: Sales, CRM, Business Development
- **Style**: Professional and results-oriented

### Agent Kit Character
- **Purpose**: Manages and automates reward distribution in the loyalty system
- **Key Features**:
  - 🎁 Reward distribution automation
  - 💎 Token reward management
  - 📊 Reward tracking and analytics
  - ⚡ Real-time reward processing
- **Topics**: Rewards, Tokenomics, Distribution Systems, Analytics
- **Style**: Efficient and systematic, focused on reward optimization

### Social Wallet Agent
- **Purpose**: Facilitates Web3 wallet creation and product sales management
- **Key Features**:
  - 🔑 Social login wallet creation via Privy
  - 🛡️ Secure data storage with Nillion
  - 🔄 Seamless Web3 onboarding
  - 👥 Business and customer wallet support
  - 🌐 Base Sepolia network integration
  - 💰 Product sales management
  - 🏷️ Implicit wallet handling for sales
- **Topics**: Web3 Wallets, Social Authentication, Blockchain Security, Data Privacy, Product Sales
- **Style**: User-friendly and security-focused, making Web3 and product sales accessible

## ⚙️ Configuration

Each character is defined in a JSON file with the following structure:

```json
{
  "name": "Character Name",
  "clients": ["direct"],
  "modelProvider": "anthropic",
  "settings": {
    "secrets": {},
    "voice": {
      "model": "en_GB-alan-medium"
    }
  },
  "plugins": ["plugin-names", "@elizaos/plugin-infinity-privy-nillion"],
  "bio": ["Character background"],
  "lore": ["Character history"],
  "topics": ["Areas of expertise"],
  "style": {
    "all": ["General communication style"],
    "chat": ["Chat-specific style"],
    "post": ["Post-specific style"]
  }
}
```

## 🚀 Usage

To use these characters:

1. Select the appropriate character for your use case
2. Configure any required environment variables
3. Initialize the character through the Eliza OS platform
4. Interact with the character through supported channels

## 💻 Development

To create or modify characters:

1. Use the existing characters as templates
2. Follow the JSON schema for character definitions
3. Test the character behavior thoroughly
4. Update documentation to reflect any changes

### Adding a New Character

1. Create a new JSON file: `character-name.character.json`
2. Define the character's properties following the schema
3. Add any required plugins to the plugins array
4. Test the character's responses and behavior
5. Update this README with the new character's details

---

<div align="center">

### Built with 💫 by the Infinity Team

</div>
