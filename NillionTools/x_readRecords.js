import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import { orgConfig } from './nillionOrgConfig.js';
import dotenv from 'dotenv';

dotenv.config();

const SCHEMA_ID = process.env.NILLION_SALE_SCHEMA_ID;

async function main() {
  try {
    // Create a secret vault wrapper and initialize the SecretVault collection to use
    const collection = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials,
      SCHEMA_ID
    );
    await collection.init();


    // Read the original record
    const readOriginalRecords = await collection.readFromNodes({});
    console.log('📚 Read original records:', readOriginalRecords);

  } catch (error) {
    console.error('❌ SecretVaultWrapper error:', error.message);
    process.exit(1);
  }
}

main();
