import {
    type Action,
    generateText,
    type HandlerCallback,
    type IAgentRuntime,
    type Memory,
    ModelClass,
    type State,
    composeContext,
    generateObject,
    Content,
    ActionExample,
    elizaLogger,
} from "@elizaos/core";
import { CdpToolkit, Tool } from "@coinbase/cdp-langchain";
import { getClient } from "../provider";

export interface CreateRewardContent extends Content {
    name: string;
    uri: string;
    symbol: string;
    decimals: number;
    initialSupply: number;
}


const launchRewardTemplate = `Respond with a JSON markdown block containing only the extracted values for creating a business reward. Use null for any values that cannot be determined.

Example response:
\`\`\`json
{
    "name": "RWRD2024",
    "symbol": "RWD",
    "maxTokens": "100",
    "decimals": 18,
    "duration": "2592000",
    "baseURI": "https://rewards.business.com/metadata/"
}
\`\`\`

{{recentMessages}}

Given the recent messages, extract the following information about the business reward:
- Reward name (maximum 8 characters, alphanumeric)
- Reward symbol (3-4 characters)
- Maximum supply for this reward
- Decimals (default is 18 for standard compatibility)
- Base URI for reward metadata

Remember:
- Names must be 8 characters or less
- Keep it simple and business-friendly
- Focus on low quantity rewards for better management
- Standard 18 decimals will be used by default

Respond with a JSON markdown block containing only the extracted values.`;

export default {
    name: "CREATE_REWARD",
    similes: ["CREATE_REWARD", "DEPLOY_REWARD", "NEW_REWARD" ],
    validate: async (_runtime: IAgentRuntime, message: Memory) => {
        const text = message.content.text.toLowerCase();
        if (!text.includes('token') && !text.includes('reward')) {
            return false;
        }
        
        // Extract potential token name from message
        const nameMatch = text.match(/name\s+is\s+([a-zA-Z0-9]+)/i);
        if (nameMatch && nameMatch[1].length > 8) {
            return false;
        }
        
        return true;
    },
    description: "Create business reward tokens with simplified management",
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback?: HandlerCallback
    ): Promise<boolean> => {
        try {
            const agentkit = await getClient();
            const cdpToolkit = new CdpToolkit(agentkit);
            const toolCreateReward = cdpToolkit
                .getTools()
                .map((t: Tool) => t)
                .find((t: Tool) => t.name.toUpperCase() === "DEPLOY_TOKEN");

            // Initialize or update state
            let currentState = state ?? (await runtime.composeState(message));
            currentState = await runtime.updateRecentMessageState(currentState);

            // Generate reward content
            const parameterContext = composeParameterContext(
                toolCreateReward,
                currentState
            );

            const parameters = await generateParameters(
                runtime,
                parameterContext,
                toolCreateReward
            );
 
            const result = await toolCreateReward.call(parameters,  );

            const responseContext = composeResponseContext(
                toolCreateReward,
                result,
                currentState
            );
            const response = await generateResponse(runtime, responseContext);

            callback?.({ text: response, content: result });
            return true;
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : String(error);
            callback?.({
                text: `Error executing action CREATE_REWARD: ${errorMessage}`,
                content: { error: errorMessage },
            });
            return false;
        }
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Create a reward called LOYAL24, symbol LOY for customer achievements",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "I'll help you create a reward for customer achievements. The name LOYAL24 follows our 8-character limit perfectly.",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Creating your reward...",
                    action: "CREATE_REWARD",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Your reward LOYAL24: 0x9jW8FPr6BSSsemWPV22UUCzSqkVdTp6HTyPqeqyuBbCa has been created successfully! You can now use this to recognize customer achievements and milestones.",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "r",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "I'll help you create a reward for skill certifications. BADGE24 is a clear, 8-character identifier.",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Setting up your certification reward...",
                    action: "CREATE_REWARD",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Your reward BADGE24: 0x9jW8FPr6BSSsemWPV22UUCzSqkVdTp6HTyPqeqyuBbCa is ready! You can now issue these for completed certifications and achieved competencies.",
                },
            },
        ]
    ] as ActionExample[][],
} as Action;

function composeParameterContext(tool: Tool, state: State): string {
    return composeContext({ state, template: launchRewardTemplate });
}

async function generateParameters(
    runtime: IAgentRuntime,
    context: string,
    tool: Tool
): Promise<unknown> {
    const { object } = await generateObject({
        runtime,
        context,
        modelClass: ModelClass.LARGE,
        schema: tool.schema,
    });

    return object;
}

function composeResponseContext(
    tool: Tool,
    result: unknown,
    state: State
): string {
    const responseTemplate = `
# Action Examples
{{actionExamples}}

# Knowledge
{{knowledge}}

# Task: Generate dialog and actions for the character {{agentName}}.
About {{agentName}}:
{{bio}}
{{lore}}

{{providers}}

{{attachments}}

# Capabilities
Note that {{agentName}} is capable of reading/seeing/hearing various forms of media, including images, videos, audio, plaintext and PDFs. Recent attachments have been included above under the "Attachments" section.

The business reward has been created successfully.
Details of your new reward:
${JSON.stringify(result, null, 2)}

You can now start distributing this reward to recognize achievements.

{{actions}}

Respond to the message knowing that the action was successful and these were the previous messages:
{{recentMessages}}
`;
    return composeContext({ state, template: responseTemplate });
}

async function generateResponse(
    runtime: IAgentRuntime,
    context: string
): Promise<string> {
    return generateText({
        runtime,
        context,
        modelClass: ModelClass.LARGE,
    });
}
