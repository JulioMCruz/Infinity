# @elizaos/plugin-insights

A plugin for retrieving and analyzing platform performance insights from the EthAgentic platform.

## Features

- Real-time platform metrics retrieval
- Trend analysis and visualization
- Formatted insights reporting with visual indicators
- Comprehensive error handling
- Detailed logging system

## Installation

```bash
npm install @elizaos/plugin-insights
```

## Configuration

### Environment Variables
Required configuration for EthAgentic platform:
```env
ETHAGENTIC_BASE_URL=your_api_base_url
```

## Actions

### GET_INSIGHTS
Retrieves performance insights from the EthAgentic platform with the following features:

- **Functionality**:
  - Fetches current platform metrics
  - Analyzes performance trends
  - Provides visual trend indicators
  - Calculates percentage changes

- **Output Format**:
  ```typescript
  {
    metric: string;     // Name of the metric
    value: number;      // Current value
    percentage: number; // Change percentage
    trend: string;      // "up" | "down" | "stable"
  }
  ```

- **Example Response**:
  ```text
  📊 Latest Insights Report 📊

  📈 User Engagement
   Value: 15,234
   Change: +12.5%

  📉 Average Response Time
   Value: 250
   Change: -8.3%

  ➡️ Daily Active Users
   Value: 5,678
   Change: +0.2%
  ```

## Usage

```typescript
import { insightsPlugin } from '@elizaos/plugin-insights';

// Plugin will automatically handle:
// - Metrics retrieval
// - Trend analysis
// - Response formatting
```

## Trend Indicators

The plugin uses visual indicators to represent trends:
- 📈 Upward trend
- 📉 Downward trend
- ➡️ Stable trend
- ❔ Unknown/undefined trend

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

1. **Data Analysis**
   - Monitor trends over time
   - Compare metrics against baselines
   - Identify performance patterns

2. **Error Handling**
   - Implement proper error recovery
   - Log errors for debugging
   - Provide user-friendly error messages

3. **Performance Monitoring**
   - Regular metric checks
   - Trend analysis
   - Alert on significant changes

## Examples

### Basic Usage
```typescript
// Example of handling insights data
callback({
    text: `📊 Latest Insights Report 📊

    📈 Platform Growth
     Value: 25,000
     Change: +15.3%

    ➡️ User Retention
     Value: 85.2
     Change: +0.5%`,
    content: insightsData.data
});
```

## Command Recognition

The plugin recognizes various command formats:
- "fetch insights information"
- "get insights data"
- "retrieve insights metrics"
- "analyze platform metrics"
- "get performance insights"

## Development

### State Management
- Proper state initialization
- State updates handling
- Context maintenance
- Response formatting

### Data Processing
- Trend calculation
- Percentage change computation
- Visual indicator selection
- Data formatting

## Dependencies

- @elizaos/core
- Additional platform-specific dependencies

## License

MIT
