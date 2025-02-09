import { SecretVaultWrapper } from './SecretVault/wrapper.js';
import { orgConfig } from './nillionOrgConfig.js';

// Use postSchema.js to create a new collection schema
// Update SCHEMA_ID to the schema id of your new collection
const SCHEMA_ID = '3e87834c-92c4-443c-bc87-da54926b5aac';
const RECORD_ID = '64bebc55-d1a2-4397-b7eb-af1f94c906cd';

async function main() {
  try {
    // Create a secret vault wrapper and initialize the SecretVault collection to use
    const collection = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials,
      SCHEMA_ID
    );
    await collection.init();

    const filterById = {
      _id: RECORD_ID,
    };    

    // Read the original record
    const readOriginalRecord = await collection.readFromNodes(filterById);
    console.log('📚 Read original record:', readOriginalRecord);


  } catch (error) {
    console.error('❌ SecretVaultWrapper error:', error.message);
    process.exit(1);
  }
}

main();
