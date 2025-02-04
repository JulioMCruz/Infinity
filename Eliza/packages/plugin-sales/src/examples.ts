import type { ActionExample } from "@elizaos/core";

const salesData = [
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
];

export const getSalesExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Show me the latest sales data",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll fetch the latest sales information for you.",
                action: "GET_SALES",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Here are the latest sales figures:\n${JSON.stringify(salesData, null, 2)}`,
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "What are our recent NFT sales?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll retrieve the recent sales data for you.",
                action: "GET_SALES",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Here are your recent sales:\n${JSON.stringify(salesData, null, 2)}`,
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Get me today's sales report",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll pull up the sales report for you.",
                action: "GET_SALES",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Here's your sales report:\n${JSON.stringify(salesData, null, 2)}`,
            },
        },
    ]
];
