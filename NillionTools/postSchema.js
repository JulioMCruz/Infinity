import { createRequire } from 'module';
import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import { orgConfig } from './nillionOrgConfig.js';
// import schema from './schema.json' assert { type: 'json' };

const require = createRequire(import.meta.url);
const schema = require('./testBasicSchemaOut.json');


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