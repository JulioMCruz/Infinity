export const getInsightsTemplate = `
TASK: Determine if the conversation contains a request for platform insights and extract relevant parameters.

# START OF EXAMPLES
These are examples of the expected output:
[
  {
    "requestType": "insights",
    "error": null,
    "parameters": {
      "timeRange": "current",
      "metrics": ["users", "transactions", "performance"],
      "format": "detailed"
    }
  }
]

[
  {
    "requestType": null,
    "error": "Unable to determine if this is an insights data request",
    "parameters": {}
  }
]
# END OF EXAMPLES

# INSTRUCTIONS
Analyze the conversation to determine if it contains a request for platform insights:
- If it is an insights request, set requestType to 'insights'
- If it's not clear or not an insights request, set requestType to null
- Include any relevant parameters that might affect the insights data request
- Set appropriate error message if the request cannot be processed
- Identify specific metrics being requested (users, transactions, performance, etc.)

Recent Messages:
{{context}}

Response should be a JSON object inside a JSON markdown block. Correct response format:
\`\`\`json
{
  "requestType": string | null,
  "error": string | null,
  "parameters": {
    "timeRange": string,
    "metrics": string[],
    "format": string
  }
}
\`\`\``;