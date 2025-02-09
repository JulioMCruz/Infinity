import { createRequire } from 'module';
import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import { orgConfig } from './nillionOrgConfig.js';

const require = createRequire(import.meta.url);

// Get the JSON file path from command line arguments
const jsonFilePath = process.argv[2];
if (!jsonFilePath) {
  console.error('❌ Please provide a JSON file path: node publishSchema.js <jsonFilePath>');
  process.exit(1);
}

// Load the schema from the provided file path
const schema = require(`./${jsonFilePath}`);

async function main() {
  try {
    const org = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials
    );
    await org.init();

    console.log(org);
    console.log(schema);

    // Create a new collection schema for all nodes in the org
    const collectionName = 'Web3 Experience Survey';
    const newSchema = await org.createSchema(schema, collectionName);
    console.log('✅ New Collection Schema created for all nodes:', newSchema);
    console.log('👀 Schema ID:', newSchema[0].result.data);
  } catch (error) {
    console.error('❌ Failed to use SecretVaultWrapper:', error.message);
    process.exit(1);
  }
}

main();