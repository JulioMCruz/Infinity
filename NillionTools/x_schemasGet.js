import { SecretVaultWrapper } from './SecretVault/wrapper.js';

import { orgConfig } from './nillionOrgConfig.js';

// Use postSchema.js to create a new collection schema
// Update SCHEMA_ID to the schema id of your new collection

async function main() {
  try {
    // Create a secret vault wrapper and initialize the SecretVault collection to use
    const collection = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials,
    );
    await collection.init();

    const readSchemas = await collection.getSchemas();
    console.log('📚 Read schemas:', readSchemas);


  } catch (error) {
    console.error('❌ SecretVaultWrapper error:', error.message);
    process.exit(1);
  }
}

main();
