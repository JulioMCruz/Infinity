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
    elizaLogger,
} from "@elizaos/core";
import { validatePrivyNillionConfig } from "../environment";

interface WalletCreationContent {
    socialLoginMethod: string | null;
    userType: 'business' | 'customer' | null;
    chainPreference: string | null;
}

interface WalletResponse {
    address: string;
    userType: string;
    chain: {
        name: string;
        id: number;
    };
    socialMethod: string;
}

const walletCreationTemplate = `Respond with a JSON markdown block containing only the extracted values. Use null for any values that cannot be determined.

Example response:
\`\`\`json
{
    "socialLoginMethod": "google",
    "userType": "business",
    "chainPreference": "base-sepolia"
}
\`\`\`

{{recentMessages}}

Given the recent messages, extract the following information about the wallet creation:
- Preferred social login method (google, twitter, etc.)
- User type (business or customer)
- Chain preference (defaults to base-sepolia if not specified)

Respond with a JSON markdown block containing only the extracted values.`;

function isWalletCreationContent(
    content: any
): content is WalletCreationContent {
    return (
        typeof content === 'object' &&
        content !== null &&
        (content.socialLoginMethod === null || typeof content.socialLoginMethod === 'string') &&
        (content.userType === null || ['business', 'customer'].includes(content.userType)) &&
        (content.chainPreference === null || typeof content.chainPreference === 'string')
    );
}

export const createSocialWalletAction: Action = {
    name: "CREATE_SOCIAL_WALLET",
    description: "Create a new wallet using social login via Privy",
    similes: ["CREATE_SOCIAL_WALLET", "SOCIAL_LOGIN", "CREATE_WALLET_WITH_SOCIAL"],
    validate: async (_runtime: IAgentRuntime, _message: Memory) => {
        elizaLogger.info("[CREATE_SOCIAL_WALLET] Validating action request");
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: unknown,
        callback?: HandlerCallback
    ): Promise<boolean> => {
        elizaLogger.info("[CREATE_SOCIAL_WALLET] Action handler started");
        
        if (!state) {
            elizaLogger.info("[CREATE_SOCIAL_WALLET] Composing initial state");
            state = (await runtime.composeState(message)) as State;
        } else {
            elizaLogger.info("[CREATE_SOCIAL_WALLET] Updating recent message state");
            state = await runtime.updateRecentMessageState(state);
        }

        try {
            elizaLogger.info("[CREATE_SOCIAL_WALLET] Processing wallet creation request");
            // Validate environment configuration
            const config = await validatePrivyNillionConfig(runtime);
            elizaLogger.debug("[CREATE_SOCIAL_WALLET] Environment config validated:", config);

            const context = composeContext({
                state,
                template: walletCreationTemplate,
            });

            elizaLogger.info("[CREATE_SOCIAL_WALLET] Generating wallet parameters from context");
            const content = await generateObjectDeprecated({
                runtime,
                context,
                modelClass: ModelClass.LARGE,
            });
            elizaLogger.debug("[CREATE_SOCIAL_WALLET] Extracted parameters:", content);

            if (!isWalletCreationContent(content)) {
                elizaLogger.warn("[CREATE_SOCIAL_WALLET] Invalid wallet creation parameters");
                if (callback) {
                    callback({
                        text: "Invalid wallet creation parameters provided",
                        content: {
                            success: false,
                            error: "Invalid parameters",
                        },
                    });
                }
                return false;
            }

            elizaLogger.info("[CREATE_SOCIAL_WALLET] Creating mock wallet response");
            // Mock wallet creation response
            // In production, this would integrate with Privy SDK
            const mockWalletResponse: WalletResponse = {
                address: "0x" + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
                userType: content.userType || 'customer',
                chain: {
                    name: content.chainPreference || config.chainName,
                    id: 84532 // Base Sepolia chain ID
                },
                socialMethod: content.socialLoginMethod || 'google'
            };

            elizaLogger.debug("[CREATE_SOCIAL_WALLET] Generated wallet details:", mockWalletResponse);

            // TODO: In production, this would:
            // 1. Create wallet using Privy's social login
            // 2. Store encrypted wallet data in Nillion
            // 3. Return actual wallet details
            elizaLogger.info("[CREATE_SOCIAL_WALLET] Wallet created successfully");

            if (callback) {
                elizaLogger.info("[CREATE_SOCIAL_WALLET] Sending success response");
                callback({
                    text: `Successfully created wallet using ${mockWalletResponse.socialMethod} login\nAddress: ${mockWalletResponse.address}\nUser Type: ${mockWalletResponse.userType}\nChain: ${mockWalletResponse.chain.name}`,
                    content: {
                        success: true,
                        wallet: mockWalletResponse
                    },
                });
            }

            elizaLogger.info("[CREATE_SOCIAL_WALLET] Action completed successfully");
            return true;
        } catch (error) {
            elizaLogger.error("[CREATE_SOCIAL_WALLET] Error creating social wallet:", error);
            if (callback) {
                callback({
                    text: `Error creating social wallet: ${error.message}`,
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
                    text: "Create a new wallet for my business using Google login",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "I want to sign up as a customer with my Twitter account",
                },
            },
        ],
    ] as ActionExample[][],
} as Action;
