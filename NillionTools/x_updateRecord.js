import { SecretVaultWrapper } from './SecretVault/wrapper.js';

import { orgConfig } from './nillionOrgConfig.js';

// Use postSchema.js to create a new collection schema
// Update SCHEMA_ID to the schema id of your new collection
const SCHEMA_ID = 'd9acb307-14d7-4b63-80bc-e1e971ad07ce';
const RECORD_ID = '8227d878-5ff6-4bcd-a8cb-2d47d0fe5cb7';

const recordUpdate = {
  privatekey: { $allot: 'demo private key updated' }, 
};

async function main() {
  try {
    // Create a secret vault wrapper and initialize the SecretVault collection to use
    const collection = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials,
      SCHEMA_ID
    );

    console.log('📚 Initializing collection...');
    await collection.init();

    const filterById = {
      _id: RECORD_ID,
    };    

    // Read the original record
    const readOriginalRecord = await collection.readFromNodes(filterById);
    console.log('📚 Read original record:', readOriginalRecord);

    const updatedData = await collection.updateDataToNodes(
      recordUpdate,
      filterById
    );    

    console.log(
      '📚 Find record(s) with filter and update nodes with recordUpdate:',
      updatedData.map((n) => n.result.data)
    );    

  } catch (error) {
    console.error('❌ SecretVaultWrapper error:', error.message);
    process.exit(1);
  }
}

main();
