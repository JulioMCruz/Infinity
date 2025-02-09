# Infinity Quick Start Guide

This guide will help you set up and run the Infinity system locally.

## Prerequisites

- Git
- Package Managers:
  - npm (comes with Node.js)
  - yarn (`npm install -g yarn`)
  - pnpm (`npm install -g pnpm`)
- Accounts required:
  - Privy (social authentication)
  - Nillion (secure data storage)
  - Coinbase Developer Platform (agentkit)
  - Base Sepolia Network (smart contracts)

## Node.js Version Management

We recommend using `nvm` (Node Version Manager) to manage different Node.js versions:

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

## Platform Setup

### 1. Infinity (Frontend)

#### Requirements
- Node.js 18+
```bash
nvm install 18
nvm use 18
```

#### Installation
```bash
cd Infinity
npm install
```

#### Environment Setup
```bash
cp .env.example .env
```

Required variables:
```env
########################################################
#### INFINITY ELIZA CONFIGURATION                            ####
########################################################
SERVER_ENDPOINT=http://localhost:3001

###############################################################################################
#### INFINITY ELIZA Plugin [@elizaos/plugin-sales, @elizaos/plugin-insights] Configuration ####
###############################################################################################
# Infinity DataService
BACKEND_DATA_ENDPOINT=http://localhost:9000

###############################################################################################
#### INFINITY ELIZA Plugin [@elizaos/plugin-infinity-agentkit] Configuration ####
###############################################################################################
# Coinbase AgentKit
CDP_API_KEY_NAME=
CDP_API_KEY_PRIVATE_KEY=
CDP_AGENT_KIT_NETWORK=base-sepolia # Optional: Defaults to base-sepolia

###############################################################################################
#### INFINITY ELIZA Plugin [@elizaos/plugin-infinity] Configuration                        ####
###############################################################################################
#CONTRACT ADRESSES
INFINITY_PROMOTION_FACTORY_CONTRACT_ADDRESS=0x2C92aB970eFAAD5bcD8E327232DAF840821f334c
EVM_PRIVATE_KEY=
EVM_PROVIDER_URL=https://sepolia.base.org
EVM_CHAIN_NAME=baseSepolia
###############################################################################################
#### INFINITY ELIZA Plugin [@elizaos/plugin-infinity-privy-nillion] Configuration                        ####
###############################################################################################

#Privy
PRIVY_APP_ID=
PRIVY_APP_SECRET=

# Nillion 
NILLION_ORG_SK=
NILLION_ORG_DID=

NILLION_NODE1_URL=
NILLION_NODE1_DID=

NILLION_NODE2_URL=
NILLION_NODE2_DID=

NILLION_NODE3_URL=
NILLION_NODE3_DID=

NILLION_SALE_SCHEMA_ID=

POSTGRES_URL=

```

#### Start Service
```bash
npm run dev
```

Access at: http://localhost:3000

### 2. DataService

#### Requirements
- Node.js >=22.10.0
```bash
nvm install 22.10.0
nvm use 22.10.0
```

#### Installation
```bash
cd DataService
yarn install
```

#### Environment Setup
```bash
cp .env.example .env.development
```

Required variables:
```env
PORT=4000
NODE_ENV=development
```

#### Start Service
```bash
yarn local
```

Access at: http://localhost:9000

### 3. Eliza

#### Requirements
- Node.js 23.3.0
```bash
nvm install 23.3.0
nvm use 23.3.0
```

#### Installation
```bash
cd Eliza
pnpm install --no-frozen-lockfile
pnpm build
```

#### Environment Setup
```bash
cp .env.example .env
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

#### Start Eliza
```bash
pnpm start:debug --character="charactersProd/infinity.character.json"     
```

Access at: http://localhost:3000

## Quick Setup (All Platforms)

If you want to set up all platforms at once:

```bash
# Clone repository
git clone https://github.com/JulioMCruz/Infinity
cd Infinity

# Install all dependencies 
cd Infinity && npm install
cd ../DataService && yarn install
cd ../Eliza && pnpm install --no-frozen-lockfile && pnpm build && pnpm start:debug --character="charactersProd/infinity-main.character.json"    

# Start all services (in separate terminals)
# Terminal 1 - DataService
cd DataService && yarn local

# Terminal 2 - Eliza
cd Eliza && pnpm dev

# Terminal 3 - Frontend
cd Infinity && npm run dev
```

## Troubleshooting

### Common Issues by Platform

#### Infinity Frontend
- **Privy Authentication Error**
  - Verify credentials in Privy dashboard
  - Check redirect URLs configuration
- **Nillion Error**
  - Verify credentials and DIDs
  - Check node connectivity

#### DataService
- **Connection Error**
  - Check if port 9000 is available
  - Verify environment variables
  - Check database connectivity

#### Eliza
- **AI Model Issues**
  - Verify Anthropic API key
  - Check model availability
  - Confirm environment variables

## Additional Resources

- [Technical Documentation](docs/README.md)
- [System Architecture](docs/ARCHITECTURE.md)
- [Plugin Guide](docs/INFINITY_PLUGINS.md)
- [Characters Documentation](docs/INFINITY_CHARACTERS.md)

## Support

For setup issues:
1. Check repository issues
2. Review technical documentation
3. Contact support team

---

For detailed component documentation, refer to respective platform folders.
