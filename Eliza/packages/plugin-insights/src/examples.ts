import type { ActionExample } from "@elizaos/core";



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
                text: `Here are the latest insights:`,
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
                text: `Here are your platform metrics:`,
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
                text: `Here are your performance insights:`,
            },
        },
    ]
];
