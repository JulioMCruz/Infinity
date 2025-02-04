export const getSalesTemplate = `
TASK: Determine if the conversation contains a request for sales data and extract relevant parameters.

# START OF EXAMPLES
These are examples of the expected output:
[
  {
    "requestType": "sales",
    "error": null,
    "parameters": {
      "timeRange": "current",
      "format": "detailed"
    }
  }
]

[
  {
    "requestType": null,
    "error": "Unable to determine if this is a sales data request",
    "parameters": {}
  }
]
# END OF EXAMPLES

# INSTRUCTIONS
Analyze the conversation to determine if it contains a request for sales data:
- If it is a sales request, set requestType to 'sales'
- If it's not clear or not a sales request, set requestType to null
- Include any relevant parameters that might affect the sales data request
- Set appropriate error message if the request cannot be processed

Recent Messages:
{{context}}

Response should be a JSON object inside a JSON markdown block. Correct response format:
\`\`\`json
{
  "requestType": string | null,
  "error": string | null,
  "parameters": {
    "timeRange": string,
    "format": string
  }
}
\`\`\``;