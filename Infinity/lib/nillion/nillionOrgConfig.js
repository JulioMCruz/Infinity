export const orgConfig = {
  // demo org credentials
  // in a production environment, make sure to put your org's credentials in environment variables
  orgCredentials: {
    secretKey: process.env.NEXT_PUBLIC_NILLION_ORG_SK,
    orgDid: process.env.NEXT_PUBLIC_NILLION_ORG_DID,
  },
  // demo node config
  nodes: [
    {
      url: process.env.NEXT_PUBLIC_NILLION_NODE1_URL,
      did: process.env.NEXT_PUBLIC_NILLION_NODE1_DID,
    },
    {
      url: process.env.NEXT_PUBLIC_NILLION_NODE2_URL,
      did: process.env.NEXT_PUBLIC_NILLION_NODE2_DID,
    },
    {
      url: process.env.NEXT_PUBLIC_NILLION_NODE3_URL,
      did: process.env.NEXT_PUBLIC_NILLION_NODE3_DID,
    },
  ],
};
