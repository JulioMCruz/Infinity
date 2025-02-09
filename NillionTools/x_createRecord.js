import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import { orgConfig } from './nillionOrgConfig.js';

// Use postSchema.js to create a new collection schema
// Update SCHEMA_ID to the schema id of your new collection
const SCHEMA_ID = '545fa61f-23dd-4764-81be-b2841ac0d708';

// Web3 Experience Survey Data to add to the collection
// $allot signals that the name years_in_web3 field will be encrypted
// Each node will have a different encrypted $share of encrypted field
const data = [
  {
    name: 'zkNexus promo', // will be encrypted to a $share
    userwallet: '0x499D377eF114cC1BF7798cECBB38412701400daF', // will be encrypted to a $share
    privywalletaddress: { $allot: '0x499D377eF114cC1BF7798cECBB38412701400daF'},
    usdprice: { $allot: '25' },
  },
];

async function main() {
  try {
    // Create a secret vault wrapper and initialize the SecretVault collection to use
    const collection = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials,
      SCHEMA_ID
    );
    await collection.init();

    // Write collection data to nodes encrypting the specified fields ahead of time
    const dataWritten = await collection.writeToNodes(data);
    console.log(
      '👀 Data written to nodes:',
      JSON.stringify(dataWritten, null, 2)
    );

    // Get the ids of the SecretVault records created
    const newIds = [
      ...new Set(dataWritten.map((item) => item.result.data.created).flat()),
    ];
    console.log('uploaded record ids:', newIds);

    // Read all collection data from the nodes, decrypting the specified fields
    // const decryptedCollectionData = await collection.readFromNodes({});

    // Log first 5 records
    // console.log(
    //   'Most recent records',
    //   decryptedCollectionData.slice(0, data.length)
    // );
  } catch (error) {
    console.error('❌ SecretVaultWrapper error:', error.message);
    process.exit(1);
  }
}

main();
