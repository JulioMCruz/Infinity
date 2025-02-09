# QUICK START SETUP ELIZA
📖 **[QUICK START](QUICK_START.md)**


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
- **User Commands**:
  ```text
  "Create a new summer promotion for 1000 tokens"
  "Set up a promotional campaign for 30 days"
  "Launch a new token promotion called Summer Sale 2025"
  ```

### SETUP for run plugin-infinity
```.env
#CONTRACT ADRESSES
INFINITY_PROMOTION_FACTORY_CONTRACT_ADDRESS=0x2C92aB970eFAAD5bcD8E327232DAF840821f334c
EVM_PRIVATE_KEY=
EVM_PROVIDER_URL=https://sepolia.base.org
EVM_CHAIN_NAME=baseSepolia
```

### RUN ELIZA SERVER
```
#terminal 1 server
cd Eliza
pnpm install --no-frozen-lockfile
pnpm build
pnpm start:debug --character="charactersProd/infinity.character.json" 

#terminal 2 client
pnpm start:client

```
