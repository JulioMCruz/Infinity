export interface PrivyNillionConfig {
  // Privy Configuration
  privyAppId: string;
  privyAppSecret: string;

  // Nillion Configuration
  nillionOrgSk: string;
  nillionOrgDid: string;
  nillionNodes: {
    node1: { url: string; did: string; };
    node2: { url: string; did: string; };
    node3: { url: string; did: string; };
  };
  nillionSaleSchemaId: string;

  // Chain Configuration
  chainName: string;
}
