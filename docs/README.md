<div align="center">
<img src="../public/placeholder-logo.svg" alt="Infinity Documentation" width="200"/>

# Infinity Documentation

[![Documentation](https://img.shields.io/badge/docs-up--to--date-green.svg)](https://github.com/infinity/docs)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/infinity/version)
</div>

## 📚 Documentation Index

Welcome to the Infinity documentation. This guide provides comprehensive information about all components of the Infinity ecosystem.

### 🏗️ Core Components

#### [Infinity App](../InfinityApp/README.md)
Frontend application built with React/Vite
- User interface for the Infinity platform
- Chat interface and authentication
- Responsive design and modern UI components
- Audio recording capabilities

#### [Infinity Contracts](../InfinityContracts/README.md)
Smart contract system for NFT-based promotions
- NFT-based taco promotion system
- Token minting and redemption
- Blockchain integration
- Web3 frontend interface

#### [Data Service](../DataService/README.md)
Backend microservice for data management
- Clean architecture implementation
- API endpoints and services
- Security and performance optimizations
- Logging and monitoring

### 🤖 AI Characters

#### [Character System](../ElizaCharacters/README.md)
AI agents powering the Infinity ecosystem

- **Infinity-H**
  - Customer loyalty system assistant
  - Token-based rewards management
  - Promotional campaign handling

- **Loyalty Engine AI**
  - Automated loyalty program management
  - Points and tier-based rewards
  - Fraud prevention and analytics

- **Sales Character**
  - Sales operations management
  - Customer relationship handling
  - Multi-channel communication

- **Agent Kit Character**
  - Reward distribution automation
  - Token reward management
  - Real-time reward processing

### 🔧 Technical Guides

#### Development
- [Setting Up Development Environment](plugin-infinity.md)
- [Running Characters Guide](running-characters.md)
- [System Analysis](analisis/README.md)

### 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/infinity/infinity.git
cd infinity
```

2. Install dependencies for each component
```bash
# Frontend
cd InfinityApp
yarn install

# Smart Contracts
cd ../InfinityContracts
yarn install

# Backend
cd ../DataService
yarn install
```

3. Configure environment variables
```bash
# Copy example files
cp .env.example .env
```

4. Start development servers
```bash
# Frontend
cd InfinityApp
yarn dev

# Backend
cd ../DataService
yarn local
```

### 📦 Project Structure

```plaintext
infinity/
├── InfinityApp/           # Frontend application
├── InfinityContracts/     # Smart contracts
├── DataService/           # Backend service
├── ElizaCharacters/       # AI characters
└── docs/                  # Documentation
```

### 🤝 Contributing

We welcome contributions to any part of the Infinity ecosystem. Please refer to each component's individual documentation for specific contribution guidelines.

### 📄 License

This project is licensed under the OWQLO License - see the [LICENSE](../LICENSE) file for details.

---

<div align="center">

### Built with 💫 by the Infinity Team

</div>
