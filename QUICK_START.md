# Infinity Quick Start Guide

This guide will help you set up and run the Infinity system locally.

## Prerequisites

- Node.js:
  - Infinity: Node.js 18+
  - DataService: Node.js >=22.10.0
  - Eliza: Node.js 23.3.0
- Git
- Package Managers:
  - npm (comes with Node.js)
  - yarn (`npm install -g yarn`)
  - pnpm (`npm install -g pnpm`)
- Accounts required:
  - Privy (social authentication)
  - Nillion (secure data storage)
  - Base Sepolia Network (smart contracts)

## Quick Setup

### 1. Node.js Version Management

We recommend using `nvm` (Node Version Manager) to manage different Node.js versions:

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use required Node.js versions
# For Infinity
nvm install 18
# For DataService
nvm install 22.10.0
# For Eliza
nvm install 23.3.0
```

Use the appropriate version when working with each component:
```bash
# When working with Infinity
nvm use 18
# When working with DataService
nvm use 22.10.0
# When working with Eliza
nvm use 23.3.0
```

### 2. Clone & Install

```bash
# Clone repository
git clone <repository-url>
cd Infinity

# Install dependencies for all components
cd Infinity && npm install
cd ../DataService && yarn install
cd ../Eliza && pnpm install
```

### 3. Environment Setup

#### Frontend (Infinity)
```bash
cp Infinity/.env.example Infinity/.env
```

Required variables:
```env
# Privy
PRIVY_APP_ID=<your-app-id>
PRIVY_CLIENT_ID=<your-client-id>

# Nillion
NEXT_PUBLIC_NILLION_ORG_SK=<your-org-sk>
NEXT_PUBLIC_NILLION_ORG_DID=<your-org-did>
NEXT_PUBLIC_NILLION_NODE1_URL=<node1-url>
NEXT_PUBLIC_NILLION_NODE1_DID=<node1-did>
NEXT_PUBLIC_NILLION_NODE2_URL=<node2-url>
NEXT_PUBLIC_NILLION_NODE2_DID=<node2-did>
NEXT_PUBLIC_NILLION_NODE3_URL=<node3-url>
NEXT_PUBLIC_NILLION_NODE3_DID=<node3-did>
```

#### DataService
```bash
cp DataService/.env.example DataService/.env.development
```

Required variables:
```env
PORT=4000
NODE_ENV=development
```

#### Eliza
```bash
cp Eliza/.env.example Eliza/.env
```

Required variables:
```env
SERVER_PORT=3000
CACHE_STORE=database

# AI Model (recommended: Anthropic Claude)
ANTHROPIC_API_KEY=<your-api-key>
SMALL_ANTHROPIC_MODEL=claude-3-haiku-20240307
MEDIUM_ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
LARGE_ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
```

### 4. Start Services

Open three terminal windows and run:

```bash
# Terminal 1 - DataService
cd DataService && yarn local

# Terminal 2 - Eliza
cd Eliza && pnpm dev

# Terminal 3 - Frontend
cd Infinity && npm run dev
```

### 5. Access the System

- Frontend: http://localhost:3000
- DataService: http://localhost:4000
- Eliza: http://localhost:3000

## Troubleshooting

### Common Issues

1. **DataService Connection Error**
   - Check if port 4000 is available
   - Verify environment variables

2. **Privy Authentication Error**
   - Verify credentials in Privy dashboard
   - Check redirect URLs configuration

3. **Nillion Error**
   - Verify credentials and DIDs
   - Check node connectivity

## Additional Resources

- [Technical Documentation](docs/README.md)
- [System Architecture](ARCHITECTURE.md)
- [Plugin Guide](docs/plugin-infinity.md)
- [Characters Documentation](docs/running-characters.md)

## Support

For setup issues:
1. Check repository issues
2. Review technical documentation
3. Contact support team

---

For detailed component documentation, refer to respective folders.
