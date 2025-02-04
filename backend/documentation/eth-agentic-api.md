# EthAgentic API

## Endpoints

### 1. Get Sales

Returns a list of sales related to NFTs and digital assets.

```http
GET /api/v1/eth-agentic/sales
```

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "amount": 1500,
      "date": "2024-02-01",
      "product": "NFT Collection Alpha"
    },
    {
      "id": "2",
      "amount": 2300,
      "date": "2024-02-02",
      "product": "Digital Art Series X"
    },
    {
      "id": "3",
      "amount": 850,
      "date": "2024-02-02",
      "product": "Metaverse Land Plot"
    }
  ]
}
```

### 2. Get Insights

Returns metrics and insights about platform performance.

```http
GET /api/v1/eth-agentic/insights
```

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "metric": "Total Revenue",
      "value": 4650,
      "trend": "up",
      "percentage": 15.5
    },
    {
      "id": "2",
      "metric": "Active Users",
      "value": 1200,
      "trend": "up",
      "percentage": 22.3
    },
    {
      "id": "3",
      "metric": "Average Transaction Value",
      "value": 1550,
      "trend": "stable",
      "percentage": 0.8
    }
  ]
}
```

## Usage Examples

### cURL

```bash
# Get Sales
curl -X GET http://localhost:9000/api/v1/eth-agentic/sales

# Get Insights
curl -X GET http://localhost:9000/api/v1/eth-agentic/insights
```

### JavaScript (Fetch)

```javascript
// Get Sales
fetch('http://localhost:9000/api/v1/eth-agentic/sales')
  .then(response => response.json())
  .then(data => console.log(data));

// Get Insights
fetch('http://localhost:9000/api/v1/eth-agentic/insights')
  .then(response => response.json())
  .then(data => console.log(data));
```

### TypeScript (Axios)

```typescript
import axios from 'axios';
import { Sale, Insight } from '@Domain/adapters/eth.types';

// Get Sales
const getSales = async (): Promise<Sale[]> => {
  const response = await axios.get('http://localhost:9000/api/v1/eth-agentic/sales');
  return response.data.data;
};

// Get Insights
const getInsights = async (): Promise<Insight[]> => {
  const response = await axios.get('http://localhost:9000/api/v1/eth-agentic/insights');
  return response.data.data;
};
```

## Status Codes

- `200 OK`: Request completed successfully
- `404 Not Found`: No data found
- `500 Internal Server Error`: Server internal error

## Error Handling

In case of error, the API will respond with a JSON object containing:

```json
{
  "success": false,
  "error": "Descriptive error message"
}