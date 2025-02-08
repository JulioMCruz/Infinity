<div align="center">
<img src="public/logo.png" alt="Infinity Logo" width="200"/>

# Infinity Data Service

[![Node](https://img.shields.io/badge/Node->=22.10.0-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![Yarn](https://img.shields.io/badge/Yarn->=1.22.20-red.svg)](https://yarnpkg.com/)
[![Express](https://img.shields.io/badge/Express-4.21.1-orange.svg)](https://expressjs.com/)
[![Clean Architecture](https://img.shields.io/badge/Clean-Architecture-lightgrey.svg)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
[![ESLint](https://img.shields.io/badge/Linting-ESLint-purple.svg)](https://eslint.org/)
</div>

## 📑 Table of Contents
- [About the Project](#-about-the-project)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Configuration](#️-configuration)
- [Available Scripts](#-available-scripts)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

## 💡 About the Project

Backend microservice implementing Clean Architecture and SOLID principles in TypeScript, providing data services for the Infinity ecosystem. This service is optimized for high availability and scalability.

### Key Features
- 🏗️ Clean and modular architecture
- 🔐 Secure API endpoints
- 💬 Ethereum and Loyalty services
- 🚀 Performance optimized with compression
- 📊 Structured logging with Winston

## 🛠 Tech Stack

### Core
- **Runtime**: Node.js 22.11.0
- **Language**: TypeScript 5.7.2
- **Framework**: Express 4.21.1

### Infrastructure
- **Logger**: Winston
- **Security**: Helmet, HPP, Rate Limiting
- **API**: Express with compression
- **File Handling**: Multer

### Development Tools
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript
- **Development**: ts-node-dev
- **Build**: tsc with path aliases

### Infrastructure
- **Environment**: Cross-env
- **Date Handling**: Day.js
- **Logging**: Winston with daily rotation

## 🏗 Architecture

### Clean Architecture

```plaintext
📦 src
├── 🎯 domain/
│   ├── adapters/       # Interface adapters
│   ├── aggregates/     # Domain aggregates
│   ├── dto/           # Data transfer objects
│   ├── entity/        # Domain entities
│   ├── enums/         # Enumerations
│   ├── errors/        # Custom error definitions
│   ├── events/        # Domain events
│   ├── facades/       # Facade patterns
│   ├── factories/     # Factory patterns
│   └── observers/     # Observer patterns
│
├── 🏗️ infraestructure/
│   ├── databases/     # Database implementations
│   │   ├── firestore/
│   │   ├── mongodb/
│   │   ├── postgresql/
│   │   └── redis/
│   └── services/      # Infrastructure services
│
├── 🎨 presentation/
│   ├── Bootstrap/     # Application bootstrap
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   └── services/
│   └── Infinity/      # Infinity module
│       ├── controllers/
│       ├── repositories/
│       ├── routes/
│       └── services/
│
└── 🛠️ utils/
    ├── environment/   # Environment configuration
    ├── exceptions/    # Exception handling
    ├── loggerConfig/  # Logging configuration
    ├── readFile/     # File reading utilities
    ├── system/       # System utilities
    └── times/        # Time handling utilities
```

## 🚀 Getting Started

### Prerequisites
```bash
node -v # >= 22.10.0
yarn -v # >= 1.22.20
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/infinity/data-service.git
cd data-service
```

2. **Install dependencies**
```bash
yarn install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

## ⚙️ Configuration

### Environment Variables
```env
# Server Configuration
PORT=9000
NODE_ENV=development
API_PREFIX=/api/v1

# SSL Configuration (Optional)
SSL_KEY_PATH=./ssl/key.pem
SSL_CERT_PATH=./ssl/cert.pem

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Logging
LOG_LEVEL=info
LOG_FORMAT=combined
```

## 📜 Available Scripts

```bash
# Development
yarn local           # Start development server with hot-reload
yarn build           # Build for production
yarn start           # Start production server
yarn clean           # Clean build directory

# Code Quality
yarn lint            # Run ESLint
yarn lint:fix        # Fix ESLint issues
yarn format          # Format code with Prettier
yarn deps:check      # Check for dependency updates
```

## 📚 API Documentation

The API is organized into two main modules:

### Ethereum Module
Handles Ethereum-related functionality through `EthereumController`:
- Authentication
- Transaction management
- Smart contract interactions

### Loyalty Module
Manages loyalty program features through `LoyaltyController`:
- Points tracking
- Rewards management
- User loyalty status

## 🤝 Contributing

### Contribution Process

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'feat: Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

### Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Style changes
- `refactor`: Code refactoring
- `test`: Add or modify tests
- `chore`: Maintenance tasks

### Pull Request Process

1. Update README.md with details of changes if applicable
2. Update version numbers in relevant files
3. Ensure all tests pass
4. Get approval from at least one developer
5. Merge only after QA approval

## 📄 License

This project is under INFINITY License - see the [LICENSE.md](LICENSE.md) file for details.

---

<div align="center">

### Developed by the Infinity Team

[![GitHub](https://img.shields.io/badge/GitHub-Infinity-blue)](https://github.com/infinity)
[![Team](https://img.shields.io/badge/Team-Infinity-purple)](https://infinity.team)

</div>
