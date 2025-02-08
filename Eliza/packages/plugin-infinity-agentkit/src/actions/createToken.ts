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
import type { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import { CdpToolkit, Tool } from "@coinbase/cdp-langchain";
import { getClient } from "../provider";

export interface CreateTokenContent extends Content {
    name: string;
    uri: string;
    symbol: string;
    decimals: number;
    initialSupply: number;
}

function isCreateTokenContent(content: any): content is CreateTokenContent {
    elizaLogger.log("Content for createToken", content);
    return (
        typeof content.name === "string" &&
        typeof content.uri === "string" &&
        typeof content.symbol === "string" &&
        typeof content.decimals === "number" &&
        typeof content.initialSupply === "number"
    );
}

const createTemplate = `Respond with a JSON markdown block containing only the extracted values. Use null for any values that cannot be determined.

Example response:
\`\`\`json
{
    "name": "Example Token",
    "symbol": "EXMPL",
    "uri": "https://raw.githubusercontent.com/solana-developers/opos-asset/main/assets/CompressedCoil/image.png",
    "decimals": 18,
    "initialSupply": 1000000,
}
\`\`\`

{{recentMessages}}

Given the recent messages, extract the following information about the requested token transfer:
- Token name
- Token symbol
- Token uri
- Token decimals
- Token initialSupply

Respond with a JSON markdown block containing only the extracted values.`;

export default {
    name: "CREATE_TOKEN",
    similes: ["DEPLOY_TOKEN"],
    validate: async (_runtime: IAgentRuntime, _message: Memory) => true,
    description: "Create tokens",
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
            const toolCreateToken = cdpToolkit
                .getTools()
                .map((t: Tool) => t)
                .find((t: Tool) => t.name.toUpperCase() === "CREATE_TOKEN");

            // Initialize or update state
            let currentState = state ?? (await runtime.composeState(message));
            currentState = await runtime.updateRecentMessageState(currentState);
            // Generate transfer content
            const parameterContext = composeParameterContext(
                toolCreateToken,
                currentState
            );
            const parameters = await generateParameters(
                runtime,
                parameterContext,
                toolCreateToken
            );

            const result = await toolCreateToken.call(parameters)
            
            const responseContext = composeResponseContext(
                toolCreateToken,
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
                text: `Error executing action CREATE_TOKEN: ${errorMessage}`,
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
                    text: "Create token, name is Example Token, symbol is EXMPL, uri is https://raw.githubusercontent.com/solana-developers/opos-asset/main/assets/CompressedCoil/image.png, decimals is 9, initialSupply is 100000000000",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "I'll create token now...",
                    action: "CREATE_TOKEN",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Successfully create token 9jW8FPr6BSSsemWPV22UUCzSqkVdTp6HTyPqeqyuBbCa",
                },
            },
        ],
    ] as ActionExample[][],
} as Action;

function composeParameterContext(tool: Tool, state: State): string {
    const contextTemplate = `{{recentMessages}}

    Given the recent messages, extract the following information for the action "${tool.name}":
    ${tool.description}
    `;
    return composeContext({ state, template: contextTemplate });
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

The action "${tool.name}" was executed successfully.
Here is the result:
${JSON.stringify(result)}

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
