<div align="center">
<img src="../public/logo.png" alt="Infinity" width="200"/>

# Infinity Contracts

[![Solidity](https://img.shields.io/badge/Solidity-^0.8.0-363636.svg)](https://docs.soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-Latest-yellow.svg)](https://hardhat.org/)
[![Next.js](https://img.shields.io/badge/Next.js-Latest-black.svg)](https://nextjs.org/)
[![The Graph](https://img.shields.io/badge/TheGraph-Latest-purple.svg)](https://thegraph.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue.svg)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node->=20.18.1-green.svg)](https://nodejs.org/)
</div>

## 📑 Table of Contents
- [About the Project](#-about-the-project)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Smart Contracts](#-smart-contracts)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## 💡 About the Project

Infinity Contracts is a Web3 project that implements an NFT-based promotion system for redeeming free tacos. The project consists of smart contracts for managing NFT promotions, a Next.js frontend for user interaction, and a subgraph for indexing blockchain data.

### Key Features
- 🎫 NFT-based promotion system
- 🌮 Redeemable tokens for free tacos
- 📊 Real-time blockchain data indexing
- 🔍 Block explorer functionality
- 🎨 Modern Web3 frontend interface
- 🔐 Secure smart contract architecture

## 🛠 Tech Stack

### Smart Contracts
- **Language**: Solidity ^0.8.0
- **Framework**: Hardhat
- **Libraries**: OpenZeppelin

### Frontend
- **Framework**: Next.js
- **Web3 Integration**: wagmi, RainbowKit
- **Styling**: Tailwind CSS

### Indexing & Data
- **Indexing**: The Graph
- **Query Language**: GraphQL

### Development Tools
- **Language**: TypeScript
- **Testing**: Hardhat Test Suite
- **Linting**: ESLint, Prettier
- **Package Manager**: Yarn

## 📁 Project Structure

```plaintext
InfinityContracts/
├── packages/
│   ├── hardhat/              # Smart contract development
│   │   ├── contracts/        # Solidity smart contracts
│   │   ├── deploy/           # Deployment scripts
│   │   └── test/            # Contract tests
│   │
│   ├── nextjs/              # Frontend application
│   │   ├── app/             # Next.js pages & components
│   │   ├── components/      # Reusable components
│   │   └── hooks/           # Custom React hooks
│   │
│   └── subgraph/            # The Graph indexing
│       ├── src/             # GraphQL schema & mappings
│       └── tests/           # Subgraph tests
```

## 📝 Smart Contracts

### InfinityPromotion

The main smart contract implementing the NFT-based promotion system:

```solidity
contract InfinityPromotion is ERC721, Pausable, Ownable {
    // Core functionality
    function claimToken() external returns (uint256)
    function redeemToken(uint256 tokenId) external
    function isTokenRedeemed(uint256 tokenId) external view returns (bool)
    
    // Admin functions
    function pause() external onlyOwner
    function unpause() external onlyOwner
    function extendPromotion(uint256 extension) external onlyOwner
}
```

Key Features:
- 🎟️ ERC721-based NFT tokens
- ⏱️ Time-limited promotions
- 🔒 Pausable functionality
- 📊 Token tracking system
- 🎫 Redemption management

## 🚀 Getting Started

### Prerequisites
```bash
node -v  # >= 20.18.1
yarn -v  # >= 3.2.3
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-org/infinity-contracts.git
cd infinity-contracts
```

2. **Install dependencies**
```bash
yarn install
```

3. **Set up environment variables**
```bash
# In packages/hardhat
cp .env.example .env
# In packages/nextjs
cp .env.example .env
```

4. **Start local blockchain**
```bash
yarn chain
```

5. **Deploy contracts**
```bash
yarn deploy
```

6. **Start frontend**
```bash
yarn start
```

## 📜 Available Scripts

### Smart Contract Development
```bash
# Hardhat
yarn hardhat:compile     # Compile contracts
yarn hardhat:test       # Run tests
yarn hardhat:deploy     # Deploy contracts
yarn hardhat:verify     # Verify contracts

# Account management
yarn account            # List accounts
yarn account:generate   # Generate new account
yarn account:import     # Import account
```

### Frontend Development
```bash
yarn start             # Start Next.js dev server
yarn next:build        # Build frontend
yarn next:serve        # Serve production build
```

### Subgraph Development
```bash
yarn subgraph:codegen  # Generate types
yarn subgraph:build    # Build subgraph
yarn subgraph:deploy   # Deploy subgraph
```

## 🚢 Deployment

### Smart Contracts

1. Configure network in `hardhat.config.ts`
2. Set deployment parameters in `.env`
3. Deploy contracts:
```bash
yarn deploy --network <network-name>
```
4. Verify contracts:
```bash
yarn verify --network <network-name>
```

### Frontend

1. Configure environment variables
2. Build and deploy:
```bash
yarn next:build
yarn vercel
```

### Subgraph

1. Update subgraph manifest
2. Deploy to The Graph:
```bash
yarn subgraph:deploy
```

## 🤝 Contributing

### Development Process

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

### Code Style

- Follow Solidity style guide
- Use TypeScript for frontend code
- Write comprehensive tests
- Document all functions and components
- Follow existing naming conventions

---

<div align="center">

### Built with 🖤 by the Infinity Team

</div>
