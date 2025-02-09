# QUICK START SETUP ELIZA
📖 **[QUICK START](QUICK_START.md)**

Creates point of sale wallets for food businesses

📖 **[Plugin Details & Documentation](../ElizaPlugins/plugin-infinity-privy-nillion/README.md)**

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
- **User Commands**:
  ```text
  "Create a new wallet for my Downtown food truck location at 123 Main Street"
  "Set up a point of sale wallet for my Beachside food truck at Ocean Drive"
  "Add a new location wallet for my food truck at Central Park"
  "Create a POS wallet for my Airport Terminal kiosk"


### SETUP for run plugin-infinity-privy-nillion
```.env
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

### RUN ELIZA SERVER
```
cd Eliza
pnpm install --no-frozen-lockfile
pnpm build
pnpm start:debug --character="characters/points-of-sale-wallet-privy-nillion.character.json" 
```
### RUN ELIZA CLIENT FOR TEST
```
pnpm start:client
```