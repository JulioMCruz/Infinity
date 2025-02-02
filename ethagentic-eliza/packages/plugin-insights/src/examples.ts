import type { ActionExample } from "@elizaos/core";

const insightsData = [
    {
        "id": "1",
        "metric": "Daily Active Users",
        "value": 1500,
        "trend": "up",
        "percentage": 15
    },
    {
        "id": "2", 
        "metric": "Transaction Volume",
        "value": 2300,
        "trend": "up",
        "percentage": 23
    },
    {
        "id": "3",
        "metric": "Average Session Duration",
        "value": 850,
        "trend": "stable",
        "percentage": 0
    }
];

export const getInsightsExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Show me the latest platform insights",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll fetch the latest platform insights for you.",
                action: "GET_INSIGHTS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Here are the latest insights:\n${JSON.stringify(insightsData, null, 2)}`,
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "What are our current platform metrics?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll retrieve the current platform metrics for you.",
                action: "GET_INSIGHTS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Here are your platform metrics:\n${JSON.stringify(insightsData, null, 2)}`,
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Get me today's performance insights",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll pull up the performance insights for you.",
                action: "GET_INSIGHTS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Here are your performance insights:\n${JSON.stringify(insightsData, null, 2)}`,
            },
        },
    ]
];
