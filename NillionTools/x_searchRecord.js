import { SecretVaultWrapper } from './SecretVault/wrapper.js';
import { orgConfig } from './nillionOrgConfig.js';

// Use postSchema.js to create a new collection schema
// Update SCHEMA_ID to the schema id of your new collection
const SCHEMA_ID = '64bebc55-d1a2-4397-b7eb-af1f94c906cd';
const userWallet = '0xc2564e41B7F5Cb66d2d99466450CfebcE9e8228f';

async function main() {
  try {
    // Create a secret vault wrapper and initialize the SecretVault collection to use
    const collection = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials,
      SCHEMA_ID
    );
    await collection.init();

    const filterByUserWallet = {
      userwallet: userWallet,
    };    

    // Read the original record
    const readOriginalRecord = await collection.readFromNodes(filterByUserWallet);
    console.log('📚 Read original record:', readOriginalRecord);


  } catch (error) {
    console.error('❌ SecretVaultWrapper error:', error.message);
    process.exit(1);
  }
}

main();
