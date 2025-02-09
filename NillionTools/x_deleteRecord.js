import { SecretVaultWrapper } from './SecretVault/wrapper.js';
import { orgConfig } from './nillionOrgConfig.js';

// update schema id and record id to delete with your own values
const SCHEMA_ID = 'd9acb307-14d7-4b63-80bc-e1e971ad07ce';
const RECORD_ID = '20802806-4007-441d-8dce-149cbaa17de9';

async function main() {
  try {
    const collection = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials,
      SCHEMA_ID
    );
    await collection.init();

    const filterById = {
      _id: RECORD_ID,
    };

    const readOriginalRecord = await collection.readFromNodes(filterById);
    console.log('📚 Read original record:', readOriginalRecord);

    const deletedData = await collection.deleteDataFromNodes(filterById);

    console.log('📚 Deleted record from all nodes:', deletedData);

    // await collection.flushData();
  } catch (error) {
    console.error('❌ Failed to use SecretVaultWrapper:', error.message);
    process.exit(1);
  }
}

main();