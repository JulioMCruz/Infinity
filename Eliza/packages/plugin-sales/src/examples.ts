import type { ActionExample } from "@elizaos/core";


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
                text: `Here are the latest sales figures: 

                `,
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
                text: `Here are your recent sales: `,
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
                text: `Here's your sales report: `,
            },
        },
    ]
];
