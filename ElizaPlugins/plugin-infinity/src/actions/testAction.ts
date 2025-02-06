import {
    ActionExample,
    IAgentRuntime,
    Memory,
    type Action,
} from "@elizaos/core";

export const testAction: Action = {
    name: "TESTOOOR",
    similes: [],
    validate: async (_runtime: IAgentRuntime, _message: Memory) => {
        return true;
    },
    description: "Test action",
    handler: async (
        _runtime: IAgentRuntime,
        _message: Memory
    ): Promise<boolean> => {
        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: { text: "Let's test something" },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Sure, I can help test that",
                    action: "TESTOOOR",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "Can you run a test for me?" },
            },
            {
                user: "{{user2}}",
                content: { text: "I'll run that test now", action: "TESTOOOR" },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "Testing testing 123" },
            },
            {
                user: "{{user2}}",
                content: { text: "Test received", action: "TESTOOOR" },
            },
        ],
    ] as ActionExample[][],
} as Action;
