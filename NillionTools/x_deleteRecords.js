import { SecretVaultWrapper } from './SecretVault/wrapper.js';
import { orgConfig } from './nillionOrgConfig.js';

// update schema id and record id to delete with your own values
const SCHEMA_ID = '64bebc55-d1a2-4397-b7eb-af1f94c906cd';

async function main() {
  try {
    const collection = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials,
      SCHEMA_ID
    );
    await collection.init();

    const readOriginalRecords = await collection.readFromNodes({});
    console.log('📚 Read original records:', readOriginalRecords);

    // Delete each record individually using a filter
    for (const record of readOriginalRecords) {
      const filterById = {
        _id: record._id,
      };
      const deletedData = await collection.deleteDataFromNodes(filterById);
      console.log(`📚 Deleted record ${record._id}:`, deletedData);
    }

    // await collection.flushData();
  } catch (error) {
    console.error('❌ Failed to use SecretVaultWrapper:', error.message);
    process.exit(1);
  }
}

main();