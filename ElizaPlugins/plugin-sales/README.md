# @elizaos/plugin-sales

A plugin for retrieving and managing sales data from the EthAgentic platform.

## Features

- Fetch real-time sales data
- Formatted sales reporting
- Comprehensive error handling
- Detailed logging system
- EthAgentic platform integration

## Installation

```bash
npm install @elizaos/plugin-sales
```

## Configuration

### Environment Variables
Required configuration for EthAgentic platform:
```env
ETHAGENTIC_BASE_URL=your_api_base_url
```

## Actions

### GET_SALES
Retrieves sales data from the EthAgentic platform with the following features:

- **Functionality**:
  - Fetches current sales data
  - Formats sales information for easy reading
  - Provides detailed error reporting
  - Includes transaction timestamps

- **Output Format**:
  ```typescript
  {
    product: string;     // Product name/identifier
    amount: number;      // Sale amount in USD
    date: string;        // Transaction date
  }
  ```

- **Example Response**:
  ```text
  Here are the latest sales figures:

  🏷️ Product: Product A
  💰 Amount: $1000
  📅 Date: 2024-02-08

  🏷️ Product: Product B
  💰 Amount: $750
  📅 Date: 2024-02-08
  ```

## Usage

```typescript
import { salesPlugin } from '@elizaos/plugin-sales';

// Plugin will automatically handle:
// - Sales data retrieval
// - Response formatting
// - Error handling
```

## Error Handling

The plugin includes robust error handling:
- Configuration validation
- API connection errors
- Data format validation
- Detailed error messages
- Debug logging

## Logging System

Comprehensive logging system with different levels:
- 🔵 Debug information
- 🟢 Success messages
- 🔴 Error details
- Detailed stack traces for debugging

## Best Practices

1. **Error Handling**
   - Always check the success status of responses
   - Handle API errors gracefully
   - Implement proper fallbacks

2. **Data Processing**
   - Cache frequently accessed data
   - Implement retry mechanisms for failed requests
   - Format data for readability

3. **Configuration**
   - Validate environment variables before use
   - Use secure connection protocols
   - Keep API endpoints up to date

## Examples

### Basic Usage
```typescript
// Example of handling sales data
callback({
    text: `Here are the latest sales figures:

    🏷️ Product: Winter Collection
    💰 Amount: $5000
    📅 Date: February 8, 2024

    🏷️ Product: Spring Preview
    💰 Amount: $3500
    📅 Date: February 8, 2024`,
    content: salesData.data
});
```

## Dependencies

- @elizaos/core
- Additional platform-specific dependencies

## Development

### Command Similes
The plugin recognizes various command formats:
- "fetch sales information"
- "get sales data"
- "retrieve sales metrics"

### State Management
- Implements proper state initialization
- Handles state updates
- Maintains context across requests

## License

MIT
