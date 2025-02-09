# Nillion Secret Vault Example

This example demonstrates using the [nillion-sv-wrappers package](https://github.com/oceans404/nillion-sv-wrappers) to read and write data to a Nillion Secret Vault Collection.

## Setup

Clone this repo and install dependencies

```
npm i
```

Run the example

```
node index.js
```

## Project Structure

### postSchema.js: File to create a new structured data collection with a schema: schema.json

- Create a named collection
- Upload the schema collection for use by your organization
- Returns the schema id of the created collection

### index.js: Main example file showing how to:

- Initialize SecretVaultWrapper
- Write data with encrypted fields to an existing schema collection by schema id
- Read and decrypt data from nodes

### nillionOrgConfig.js: Configuration file containing:

- Organization credentials (secret key, org did)
  - Note: In a production environment, make sure to move credentials to environment variables. I left these in so that you can run my exact example
- Node URLs and DIDs or all nodes in your org

### schema.json: JSON Schema for the Web3 survey collection

- The reference to this schema by id is in the collectionConfig in the index.js file
- The name and years_in_web3 fields will be encrypted ahead of time, and their shares will be stored in SecretVault
- years_in_web3 is an object that has a `$share` property for uploading one share of the encrypted value to each node

```
"years_in_web3": {
  "type": "object",
  "properties": {
    "$share": {
      "type": "string"
    }
  },
  "required": ["$share"]
},
```
