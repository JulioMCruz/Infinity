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
import {PrivyClient} from '@privy-io/server-auth';
import { SecretVaultWrapper } from 'nillion-sv-wrappers';

interface ItemSellContent {
    actionContent: string;
    promotionName: string;
    amount: number;
}

interface ItemSellResponse {
    saleId: string;
    actionContent: string;
    promotionName: string;
    amount: number;
    walletAddress: string;
    timestamp: string;
}

const itemSellTemplate = `Let's create a new food truck product sale! 🚚

IMPORTANT: Only process the most recent message in the conversation. Ignore any previous messages.

From the last message only, extract:

Step 1 - Action Content:
Look for a clear selling action (e.g., "I want to sell", "create a sale"). If found in the last message, use it. If not, use null.

Step 2 - Product Name:
Find a food item name after phrases like "called" or "named". Remove any quotes. Only look in the last message. If no name is found, use null.

Step 3 - Price Amount:
Find a price value after "$" or "for" in the last message. Convert to a number without currency symbols. If no valid amount is found, use null.

Example message: "I want to sell a product called 'Gourmet Street Tacos' for $12.99"
Step-by-step extraction:
1. Action: "I want to sell a product"
2. Name: "Gourmet Street Tacos"
3. Amount: 12.99

{{recentMessages}}

Return the extracted information in this JSON format:
\`\`\`json
{
    "actionContent": "I want to sell a product",
    "promotionName": "Gourmet Street Tacos",
    "amount": 12.99
}
\`\`\``;

function isItemSellContent(
    content: any
): content is ItemSellContent {
    elizaLogger.debug("[CREATE_PRODUCT_SALE] Validating content:", content);
    
    const isValid = (
        typeof content === 'object' &&
        content !== null &&
        typeof content.actionContent === 'string' &&
        content.actionContent.trim() !== '' &&
        typeof content.promotionName === 'string' &&
        content.promotionName.trim() !== '' &&
        (
            (typeof content.amount === 'number' && !isNaN(content.amount) && content.amount > 0) ||
            (typeof content.amount === 'string' && !isNaN(parseFloat(content.amount.replace(/[$,]/g, ''))) && parseFloat(content.amount.replace(/[$,]/g, '')) > 0)
        )
    );

    if (isValid && typeof content.amount === 'string') {
        content.amount = parseFloat(content.amount.replace(/[$,]/g, ''));
    }

    elizaLogger.info("[CREATE_PRODUCT_SALE] Content validation:", isValid ? "successful" : "failed");
    return isValid;
}

export const createItemSellAction: Action = {
    name: "CREATE_PRODUCT_SALE",
    description: "Create a new product sale with implicit wallet understanding",
    similes: ["CREATE_PRODUCT_SALE", "SELL_PRODUCT", "NEW_PRODUCT_SALE"],
    validate: async (_runtime: IAgentRuntime, _message: Memory) => {
        elizaLogger.info("[CREATE_PRODUCT_SALE] Validating action request");
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: unknown,
        callback?: HandlerCallback
    ): Promise<boolean> => {
        elizaLogger.info("[CREATE_PRODUCT_SALE] Action handler started");
        
        if (!state) {
            elizaLogger.info("[CREATE_PRODUCT_SALE] Composing initial state");
            state = (await runtime.composeState(message)) as State;
        } else {
            elizaLogger.info("[CREATE_PRODUCT_SALE] Updating recent message state");
            state = await runtime.updateRecentMessageState(state);
        }

        try {
            elizaLogger.info("[CREATE_PRODUCT_SALE] Processing product sale request");
            // Validate environment configuration
            const config = await validatePrivyNillionConfig(runtime);
            elizaLogger.debug("[CREATE_PRODUCT_SALE] Environment config validated:", config);

            const context = composeContext({
                state,
                template: itemSellTemplate,
            });

            elizaLogger.info("[CREATE_PRODUCT_SALE] Generating product sale parameters from context");
            const content = await generateObjectDeprecated({
                runtime,
                context,
                modelClass: ModelClass.LARGE,
            });
            elizaLogger.debug("[CREATE_PRODUCT_SALE] Extracted parameters:", content);

            if (!content || typeof content !== 'object') {
                elizaLogger.warn("[CREATE_PRODUCT_SALE] Invalid content structure");
                if (callback) {
                    callback({
                        text: "🚚 Let's add a new item to your food truck menu!\n\n💬 Start with a selling action like:\n'I want to sell a product' or 'Create a sale'",
                        content: {
                            success: false,
                            error: "Missing initial action",
                            step: 1
                        },
                    });
                }
                return false;
            }

            const errors = [];
            let currentStep = 1;

            // Step 1: Validate action content
            if (!content.actionContent?.trim()) {
                errors.push("🎯 Start with a selling action (e.g., 'I want to sell a product' or 'Create a sale')");
                currentStep = 1;
            }
            // Step 2: Validate product name
            else if (!content.promotionName?.trim()) {
                errors.push("🍔 What's the name of your food item? Include it after 'called' or 'named'");
                currentStep = 2;
            }
            // Step 3: Validate amount
            else if (!content.amount || isNaN(parseFloat(String(content.amount))) || parseFloat(String(content.amount)) <= 0) {
                errors.push("💰 What's the price of your food item? Include it as '$XX.XX'");
                currentStep = 3;
            }

            if (errors.length > 0) {
                elizaLogger.warn(`[CREATE_PRODUCT_SALE] Validation failed at step ${currentStep}`);
                if (callback) {
                    callback({
                        text: errors[0],
                        content: {
                            success: false,
                            error: "Incomplete information",
                            step: currentStep,
                            receivedContent: content
                        },
                    });
                }
                return false;
            }

            elizaLogger.info("[CREATE_PRODUCT_SALE] Creating product sale response");

            // Create the wallet
            const privy = new PrivyClient(config.privyAppId, config.privyAppSecret);
            const {id, address, chainType} = await privy.walletApi.create({chainType: 'ethereum'});

            console.log("Wallet created:", id, address, chainType);

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

            const data = [
                {
                    userwallet: address,
                    name: content.promotionName, // will be encrypted to a $share
                    privywalletaddress: { $allot: address }, // will be encrypted to a $share
                    usdprice: { $allot: content.amount }, // will be encrypted to a $share
                },
              ];                

            let saleId = ""

              try {
                // Initialize the collection
                await collection.init();

                // Store data
                const dataWritten = await collection.writeToNodes(data);

                saleId = dataWritten[0]._id;

                console.log("Sale ID:", saleId);
                
              } catch (error) {
                console.error("Error writing to nodes:", error);
              }
            
            const itemSellResponse: ItemSellResponse = {
                saleId: saleId,
                actionContent: content.actionContent,
                promotionName: content.promotionName,
                amount: content.amount,
                walletAddress: address,
                timestamp: new Date().toISOString()
            };

            elizaLogger.debug("[CREATE_PRODUCT_SALE] Generated product sale details:", itemSellResponse);
            
            if (callback) {
                elizaLogger.info("[CREATE_PRODUCT_SALE] Sending success response");
                callback({
                    text: `✨ Food Item Added Successfully!\n\n🎯 Action: ${itemSellResponse.actionContent}\n🍽️ Item: ${itemSellResponse.promotionName}\n💰 Price: $${itemSellResponse.amount}\n🔐 Wallet: ${itemSellResponse.walletAddress}\n\n🏷️ Sale ID: ${itemSellResponse.saleId}\n\nYour food item is now ready for customers! 🚚`,
                    content: {
                        success: true,
                        itemSell: itemSellResponse
                    },
                });
            }

            elizaLogger.info("[CREATE_PRODUCT_SALE] Action completed successfully");
            return true;
        } catch (error) {
            elizaLogger.error("[CREATE_PRODUCT_SALE] Error creating product sale:", error);
            if (callback) {
                callback({
                    text: `❌ Error adding food item: ${error.message}`,
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
                    text: "I want to sell a product called 'Gourmet Street Tacos' for $12.99",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Create a sale for my 'Loaded Burger Combo' for $15.99",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Sell my 'Signature Food Truck Bowl' for $13.99",
                },
            },
        ],
    ] as ActionExample[][],
} as Action;
