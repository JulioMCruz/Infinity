# @elizaos/plugin-infinity-agentkit

A plugin for creating and managing business rewards using the Coinbase Developer Platform (CDP).

## Features

- Create business reward tokens with simplified management
- Automated validation of reward parameters
- Integration with CDP Toolkit
- Smart reward naming conventions
- Built-in best practices for business rewards

## Installation

```bash
npm install @elizaos/plugin-infinity-agentkit
```

## Key Concepts

### Reward Token Parameters
- **Name**: Maximum 8 characters, alphanumeric (e.g., "LOYAL24")
- **Symbol**: 3-4 characters (e.g., "LOY")
- **Decimals**: Default 18 for standard compatibility
- **Supply**: Configurable maximum supply
- **Metadata**: Customizable base URI for reward metadata

## Actions

### CREATE_REWARD
Creates a new business reward token with the following features:
- Automated validation of reward names (8 char limit)
- Business-friendly token creation
- Simplified management parameters
- Standard ERC20 compatibility

Example usage:
```typescript
// Example: Creating a loyalty reward
const rewardConfig = {
    name: "LOYAL24",    // 8 characters max
    symbol: "LOY",      // 3-4 characters
    maxTokens: "1000",  // Limited supply for better management
    decimals: 18,       // Standard compatibility
    baseURI: "https://rewards.business.com/metadata/"
};
```

## Integration with CDP

The plugin integrates with Coinbase Developer Platform through:
- CDP Toolkit for reward management
- Tool-based reward deployment
- Standardized parameter generation
- Response handling and formatting

## Best Practices

1. **Reward Naming**
   - Keep names under 8 characters
   - Use year indicators (e.g., RWRD2024 → RWRD24)
   - Choose clear, business-relevant symbols

2. **Supply Management**
   - Set conservative initial supplies
   - Consider future scaling needs
   - Plan for reward distribution patterns

3. **Metadata Handling**
   - Use consistent URI structures
   - Include reward descriptions
   - Maintain metadata availability

## Error Handling

The plugin includes comprehensive error handling:
- Validation of reward parameters
- Clear error messages
- Transaction failure recovery
- State management protection

## Examples

### Creating a Customer Loyalty Reward
```typescript
// Example: Customer loyalty reward
{
    name: "LOYAL24",
    symbol: "LOY",
    maxTokens: "1000",
    decimals: 18,
    baseURI: "https://rewards.business.com/loyalty/"
}
```

### Creating a Certification Badge
```typescript
// Example: Certification badge
{
    name: "BADGE24",
    symbol: "BDG",
    maxTokens: "500",
    decimals: 18,
    baseURI: "https://rewards.business.com/certifications/"
}
```

## Dependencies

- @elizaos/core
- @coinbase/cdp-langchain
- Additional CDP toolkit dependencies

## License

MIT
