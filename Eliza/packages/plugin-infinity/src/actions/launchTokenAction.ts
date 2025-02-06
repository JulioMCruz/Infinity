import {
    Action,
    ActionExample,
    IAgentRuntime,
    Memory,
    ModelClass,
    State,
    HandlerCallback,
    composeContext,
    generateObjectDeprecated,
} from "@elizaos/core";
import { initWalletProvider } from "../providers/wallet";
import { InfinityPromotionFactoryAbi } from "../lib/InfinityContratsAbis";
import { hardhat } from "viem/chains";
import { validateInfinityConfig } from "../environment";
import { Address } from "viem";

interface PromotionConfig {
    name: string;
    symbol: string;
    maxTokens: bigint;
    duration: bigint;
    baseURI: string;
}

interface LaunchTokenContent {
    name: string;
    symbol: string;
    maxTokens: string;
    duration: string;
    baseURI: string;
}

const launchTokenTemplate = `Respond with a JSON markdown block containing only the extracted values. Use null for any values that cannot be determined.

Example response:
\`\`\`json
{
    "name": "Promotion name",
    "symbol": "MTK",
    "maxTokens": "1000",
    "duration": "2592000",
    "baseURI": "https://example.com/metadata/"
}
\`\`\`

{{recentMessages}}

Given the recent messages, extract the following information about the token launch:
- Token name
- Token symbol
- Maximum number of tokens that can be minted
- Duration of the promotion in seconds
- Base URI for token metadata

Respond with a JSON markdown block containing only the extracted values.`;

const missingTokenConfigTemplate = `Here are the token parameters I have confirmed:

{{#each confirmed}}
- {{@key}}: {{this}}
{{/each}}

The following required parameters are missing:
{{#each missing}}
- {{this}}
{{/each}}

Please provide values for the missing parameters to proceed with the token launch.`;

function isLaunchTokenContent(
    content: LaunchTokenContent
): content is LaunchTokenContent {
    return (
        typeof content.name === "string" &&
        typeof content.symbol === "string" &&
        typeof content.maxTokens === "string" &&
        typeof content.duration === "string" &&
        typeof content.baseURI === "string"
    );
}

export const launchTokenAction: Action = {
    name: "LAUNCH_TOKEN",
    description: "Launch a new token with specified parameters",
    similes: ["CREATE_TOKEN", "DEPLOY_TOKEN", "NEW_TOKEN"],
    validate: async (_runtime: IAgentRuntime, _message: Memory) => {
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: unknown,
        callback?: HandlerCallback
    ): Promise<boolean> => {

        if (!state) {
            state = (await runtime.composeState(message)) as State;
        } else {
            state = await runtime.updateRecentMessageState(state);
        }

        console.log("🟡[V1] Launch token action handler called");
        const walletProvider = await initWalletProvider(runtime);
        const walletClient = walletProvider.getWalletClient("polygonAmoy");

        try {
            const infinityConfig = await validateInfinityConfig(runtime);

            // Generate token details from context
            const context = composeContext({
                state,
                template: launchTokenTemplate,
            });

            const content = await generateObjectDeprecated({
                runtime,
                context,
                modelClass: ModelClass.LARGE,
            });

            if (!isLaunchTokenContent(content)) {
                const missingTokenConfig = await generateObjectDeprecated({
                    runtime,
                    context: composeContext({
                        state,
                        template: missingTokenConfigTemplate,
                    }),
                    modelClass: ModelClass.LARGE,
                });

                if (callback) {
                    callback({
                        text: `Missing token config: ${missingTokenConfig}`,
                        content: {
                            success: false,
                            error: "Missing required token parameters",
                        },
                    });
                }
                return false;
            }

            // Create token config
            const promotionConfig: PromotionConfig = {
                name: content.name,
                symbol: content.symbol,
                maxTokens: BigInt(content.maxTokens),
                duration: BigInt(content.duration),
                baseURI: content.baseURI,
            };
            console.log("🚀 ~ tokenConfig:", promotionConfig)

            
            // Get contract instance
            const tokenLauncherAddress = infinityConfig.infinityPromotionFactoryContractAddress

            while (!tokenLauncherAddress) {
                const missingTokenConfig = await generateObjectDeprecated({
                    runtime,
                    context: composeContext({
                        state,
                        template: missingTokenConfigTemplate,
                    }),
                    modelClass: ModelClass.LARGE,
                });

                callback({
                    text: `Missing token config: ${missingTokenConfig}`,
                });
            }

            const hash = await walletClient.writeContract({
                address: tokenLauncherAddress as Address,
                abi: InfinityPromotionFactoryAbi,
                functionName: "createPromotion",
                args: [
                       promotionConfig.name,
                        promotionConfig.symbol,
                         promotionConfig.maxTokens,
                         promotionConfig.duration,
                         promotionConfig.baseURI,
                ],
                chain: hardhat,
                account: walletClient.account,
            });

            if (callback) {
                callback({
                    text: `Successfully launched token ${content.name} (${content.symbol})\nTransaction Hash: ${hash}`,
                    content: {
                        success: true,
                        hash,
                        name: content.name,
                        symbol: content.symbol,
                        totalSupply: content.duration,
                    },
                });
            }

            return true;
        } catch (error) {
            console.error("Error launching token:", error);
            if (callback) {
                callback({
                    text: `Error launching token: ${error.message}`,
                    content: { error: error.message },
                });
            }
            return false;
        }
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Generate QR code for claiming promotion tokens https://example.com/image.png",
                },
            },
        ],
    ] as ActionExample[][],
} as Action;
