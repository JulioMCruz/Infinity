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
import { PrivyClient } from '@privy-io/server-auth';
import { SecretVaultWrapper } from 'nillion-sv-wrappers';

interface PoSWalletContent {
    locationName: string | null;
    locationType: 'food_truck' | 'restaurant' | 'kiosk' | null;
    locationAddress: string | null;
}

interface PoSWalletResponse {
    walletId: string;
    address: string;
    location: {
        name: string;
        type: string;
        address: string;
    };
    chain: {
        name: string;
        id: number;
    };
    timestamp: string;
}

const posWalletTemplate = `Respond with a JSON markdown block containing only the extracted values. Use null for any values that cannot be determined.

Example response:
\`\`\`json
{
    "locationName": "Downtown Food Truck",
    "locationType": "food_truck",
    "locationAddress": "123 Main St, Downtown"
}
\`\`\`

{{recentMessages}}

Given the recent messages, extract the following information about the point of sale:
- Location name (e.g., "Downtown Food Truck", "Beachside Location")
- Location type (food_truck, restaurant, or kiosk)
- Physical address or location description

Note: If the location type isn't specified, default to food_truck.

Respond with a JSON markdown block containing only the extracted values.`;

function isPoSWalletContent(
    content: any
): content is PoSWalletContent {
    return (
        typeof content === 'object' &&
        content !== null &&
        (content.locationName === null || typeof content.locationName === 'string') &&
        (content.locationType === null || ['food_truck', 'restaurant', 'kiosk'].includes(content.locationType)) &&
        (content.locationAddress === null || typeof content.locationAddress === 'string')
    );
}

export const createPoSWalletAction: Action = {
    name: "CREATE_POS_WALLET",
    description: "Create a new point of sale wallet for a food business location using Privy and secure the keys with Nillion",
    similes: ["CREATE_POS_WALLET", "NEW_LOCATION_WALLET", "ADD_POS_WALLET", "SETUP_LOCATION_WALLET", "NEW_FOOD_TRUCK_WALLET"],
    validate: async (_runtime: IAgentRuntime, _message: Memory) => {
        elizaLogger.info("[CREATE_POS_WALLET] Validating action request");
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: unknown,
        callback?: HandlerCallback
    ): Promise<boolean> => {
        elizaLogger.info("[CREATE_POS_WALLET] Action handler started");
        
        if (!state) {
            elizaLogger.info("[CREATE_POS_WALLET] Composing initial state");
            state = (await runtime.composeState(message)) as State;
        } else {
            elizaLogger.info("[CREATE_POS_WALLET] Updating recent message state");
            state = await runtime.updateRecentMessageState(state);
        }

        try {
            elizaLogger.info("[CREATE_POS_WALLET] Processing PoS wallet creation request");
            // Validate environment configuration
            const config = await validatePrivyNillionConfig(runtime);
            elizaLogger.debug("[CREATE_POS_WALLET] Environment config validated:", config);

            const context = composeContext({
                state,
                template: posWalletTemplate,
            });

            elizaLogger.info("[CREATE_POS_WALLET] Generating PoS parameters from context");
            const content = await generateObjectDeprecated({
                runtime,
                context,
                modelClass: ModelClass.LARGE,
            });
            elizaLogger.debug("[CREATE_POS_WALLET] Extracted parameters:", content);

            if (!isPoSWalletContent(content)) {
                elizaLogger.warn("[CREATE_POS_WALLET] Invalid PoS wallet parameters");
                if (callback) {
                    callback({
                        text: "I couldn't understand the point of sale details. Please provide:\n1. Location name (e.g., 'Downtown Food Truck')\n2. Location type (food_truck, restaurant, or kiosk)\n3. Physical address or location description",
                        content: {
                            success: false,
                            error: "Invalid parameters",
                        },
                    });
                }
                return false;
            }

            elizaLogger.info("[CREATE_POS_WALLET] Creating wallet with Privy");
            // Create the wallet using Privy
            const privy = new PrivyClient(config.privyAppId, config.privyAppSecret);
            const { id: walletId, address, chainType } = await privy.walletApi.create({ chainType: 'ethereum' });

            elizaLogger.debug("[CREATE_POS_WALLET] Wallet created:", { walletId, address, chainType });

            // Store PoS metadata and wallet info in Nillion
            const orgConfig = {
                orgCredentials: {
                    secretKey: config.nillionOrgSk,
                    orgDid: config.nillionOrgDid,
                },
                nodes: [
                    config.nillionNodes.node1,
                    config.nillionNodes.node2,
                    config.nillionNodes.node3,
                ],
            };

            const collection = new SecretVaultWrapper(
                orgConfig.nodes,
                orgConfig.orgCredentials,
                config.nillionSaleSchemaId
            );

            const posData = [
                {
                    userwallet: address,
                    locationname: { $allot: content.locationName },
                    locationtype: { $allot: content.locationType || 'food_truck' },
                    locationaddress: { $allot: content.locationAddress },
                    privywalletid: { $allot: walletId },
                    wallettype: { $allot: 'pos' },
                },
            ];

            elizaLogger.info("[CREATE_POS_WALLET] Storing PoS data in Nillion");
            await collection.init();
            await collection.writeToNodes(posData);
            elizaLogger.debug("[CREATE_POS_WALLET] PoS data stored successfully");

            const posResponse: PoSWalletResponse = {
                walletId,
                address,
                location: {
                    name: content.locationName || 'Unnamed Location',
                    type: content.locationType || 'food_truck',
                    address: content.locationAddress || 'No address provided'
                },
                chain: {
                    name: config.chainName,
                    id: 84532 // Base Sepolia chain ID
                },
                timestamp: new Date().toISOString()
            };

            elizaLogger.debug("[CREATE_POS_WALLET] Generated PoS wallet details:", posResponse);

            if (callback) {
                callback({
                    text: `✨ New Point of Sale Wallet Created!\n\n📍 Location: ${posResponse.location.name}\n🏪 Type: ${posResponse.location.type}\n📮 Address: ${posResponse.location.address}\n\n🔐 Wallet Address: ${posResponse.address}\n⛓️ Chain: ${posResponse.chain.name}\n\nYour new point of sale is ready to process transactions! 🎉`,
                    content: {
                        success: true,
                        pos: posResponse
                    },
                });
            }

            elizaLogger.info("[CREATE_POS_WALLET] Action completed successfully");
            return true;
        } catch (error) {
            elizaLogger.error("[CREATE_POS_WALLET] Error creating PoS wallet:", error);
            if (callback) {
                callback({
                    text: `Error creating point of sale wallet: ${error.message}`,
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
                    text: "Create a new wallet for my Downtown food truck location at 123 Main Street",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Set up a point of sale wallet for my Beachside food truck at Ocean Drive",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Add a new location wallet for my food truck at Central Park",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Create a POS wallet for my Airport Terminal kiosk",
                },
            },
        ]
    ] as ActionExample[][],
} as Action;
