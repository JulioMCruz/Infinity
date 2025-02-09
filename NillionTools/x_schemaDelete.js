import { SecretVaultWrapper } from './SecretVault/wrapper.js';

import { orgConfig } from './nillionOrgConfig.js';

// Use postSchema.js to create a new collection schema
// Update SCHEMA_ID to the schema id of your new collection
const SCHEMA_ID = '4c17a132-73bc-45fb-b3cd-1809d433a89c';

async function main() {
  try {
    // Create a secret vault wrapper and initialize the SecretVault collection to use
    const collection = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials,
    );
    await collection.init();

    const deleteSchema = await collection.deleteSchema(SCHEMA_ID);
    console.log('📚 Deleted schema:', deleteSchema);


  } catch (error) {
    console.error('❌ SecretVaultWrapper error:', error.message);
    process.exit(1);
  }
}

main();
