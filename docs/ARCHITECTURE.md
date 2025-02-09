<div align="center">
<img src="public/logo.png" alt="Infinity Architecture" width="200"/>

# Infinity System Architecture

[![Architecture](https://img.shields.io/badge/Architecture-Clean-lightgrey.svg)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Solidity](https://img.shields.io/badge/Solidity-^0.8.0-363636.svg)](https://docs.soliditylang.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
</div>

## 📑 Table of Contents
- [System Overview](#-system-overview)
- [Architecture Diagrams](#-architecture-diagrams)
- [Use Cases](#-use-cases)
- [Technologies](#-technologies)

## 🔍 System Overview

Infinity is a blockchain-powered loyalty system that enables businesses to create and manage customer rewards programs using NFTs and smart contracts. The system includes social wallet creation through Privy and secure data storage with Nillion.

## 📐 Architecture Diagrams

### System Components

```mermaid
graph TB
    subgraph Frontend["Frontend (InfinityApp)"]
        UI[React UI]
        Web3[Web3 Integration]
        State[State Management]
    end

    subgraph Backend["Backend (DataService)"]
        API[REST API]
        Services[Business Services]
        DB[Data Layer]
    end

    subgraph Blockchain["Smart Contracts"]
        NFT[NFT Contracts]
        Factory[Factory Contracts]
        Rewards[Reward System]
    end

    subgraph AI["AI System"]
        Characters[AI Characters]
        Plugins[Eliza Plugins]
        Actions[Character Actions]
        SocialWallet[Social Wallet Plugin]
    end

    subgraph Security["Security Layer"]
        Privy[Privy Auth]
        Nillion[Nillion Storage]
    end

    UI --> Web3
    Web3 --> NFT
    UI --> API
    API --> Services
    Services --> DB
    Characters --> Plugins
    Plugins --> API
    Plugins --> Web3
    Factory --> NFT
    NFT --> Rewards
    SocialWallet --> Privy
    SocialWallet --> Nillion
    Privy --> Web3
    Nillion --> DB
```

### Data Flow

```mermaid
sequenceDiagram
    participant Customer
    participant UI as Frontend UI
    participant Privy as Privy Auth
    participant Nillion as Nillion Storage
    participant API as Backend API
    participant BC as Blockchain
    participant AI as AI System

    Customer->>UI: Request Wallet Creation
    UI->>Privy: Social Login
    Privy-->>UI: Auth Success
    UI->>AI: Create Wallet Request
    AI->>Nillion: Store Wallet Data
    Nillion-->>AI: Storage Confirmation
    AI-->>Customer: Wallet Created

    Customer->>UI: Makes Purchase
    UI->>API: Record Transaction
    API->>BC: Mint Reward NFT
    BC-->>API: NFT Minted
    API-->>UI: Update UI
    UI->>AI: Notify AI System
    AI->>API: Process Reward Logic
    API-->>Customer: Notify Reward
```

## 📋 Use Cases

### Customer Loyalty Flow

```mermaid
graph LR
    A[Customer] -->|Makes Purchase| B(Record Transaction)
    B --> C{Check Eligibility}
    C -->|Eligible| D[Mint NFT Reward]
    C -->|Not Eligible| E[Update Points]
    D --> F[Send Notification]
    E --> F
    F --> G[Customer Receives Reward]
```

### Social Wallet Creation Flow

```mermaid
graph TD
    A[User] -->|Requests Wallet| B(Choose Social Login)
    B --> C{Privy Auth}
    C -->|Success| D[Create Wallet]
    D --> E[Store in Nillion]
    E --> F[Return Credentials]
    F --> G[Ready for Use]
```

### Business Management Flow

```mermaid
graph TD
    A[Business Owner] -->|Creates Campaign| B(Set Parameters)
    B --> C{Deploy Contract}
    C -->|Success| D[Start Campaign]
    C -->|Failure| E[Review Settings]
    D --> F[Monitor Results]
    F --> G[AI Analysis]
    G --> H[Optimize Campaign]
```

### Reward Distribution Flow

```mermaid
graph TB
    A[Check Customer Activity] -->|Threshold Met| B(Generate Reward)
    B --> C{Validate Eligibility}
    C -->|Valid| D[Mint NFT]
    C -->|Invalid| E[Update Records]
    D --> F[Send to Wallet]
    F --> G[Update Leaderboard]
    G --> H[Notify Customer]
```

## 🛠 Technologies

### Frontend
- **Framework**: React 18.x
- **Build Tool**: Vite
- **State Management**: React Query
- **UI Components**: Radix UI
- **Styling**: Tailwind CSS
- **Web3**: Ethers.js
- **Authentication**: Privy Social Login

### Backend
- **Runtime**: Node.js 22.x
- **Framework**: Express 4.x
- **Language**: TypeScript 5.x
- **Architecture**: Clean Architecture
- **Security**: Helmet, Rate Limiting
- **Logging**: Winston
- **Storage**: Nillion Secure Storage

### Blockchain
- **Language**: Solidity ^0.8.0
- **Framework**: Hardhat
- **Testing**: Hardhat Test Suite
- **Network**: Base Sepolia
- **Standards**: ERC721

### AI System
- **Platform**: Eliza OS
- **Model**: Anthropic Claude
- **Voice**: Alan Medium
- **Plugins**: 
  - Custom TypeScript Plugins
  - Social Wallet Plugin (Privy + Nillion)

### Development Tools
- **Version Control**: Git
- **Package Manager**: pnpm/yarn
- **Testing**: Vitest
- **Linting**: ESLint
- **Formatting**: Prettier
- **Documentation**: Markdown

## 🔐 Security Considerations

```mermaid
graph TD
    subgraph Security["Security Measures"]
        A[Rate Limiting] --> B[API Security]
        C[Smart Contract Audits] --> D[Secure Deployment]
        E[Access Control] --> F[Data Protection]
        G[Input Validation] --> H[Error Handling]
        I[Privy Auth] --> J[Social Login Security]
        K[Nillion Storage] --> L[Encrypted Data]
    end

    subgraph Monitoring["System Monitoring"]
        M[Performance Metrics]
        N[Error Tracking]
        O[Usage Analytics]
        P[Security Alerts]
    end

    Security --> Monitoring
```

## 📈 Scalability

```mermaid
graph LR
    subgraph Scale["Scalability Features"]
        A[Load Balancing]
        B[Caching]
        C[Database Optimization]
        D[Smart Contract Efficiency]
        E[Distributed Storage]
    end

    subgraph Growth["Growth Support"]
        F[Multiple Businesses]
        G[High Transaction Volume]
        H[Data Analytics]
        I[Social Login Scale]
    end

    Scale --> Growth
```

---

<div align="center">

### Built with 💫 by the Infinity Team

</div>
