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

interface ItemSellContent {
    actionContent: string;
    promotionName: string;
    amount: number;
}

interface ItemSellResponse {
    actionContent: string;
    promotionName: string;
    amount: number;
    walletAddress: string;
    timestamp: string;
}

const itemSellTemplate = `Extract the product sale information from the conversation and format it as a JSON object. Follow these specific guidelines:

1. Action Content: Extract the complete action or request the user is making
   - Look for phrases like "I want to sell", "sell for a product", "create a sale", etc.
   - Include the full context of what they want to do with the product
   - The action should reflect selling a product or creating a sale

2. Promotion Name: Extract the name of the product being sold
   - Look for phrases like "called", "named", "a product called", etc.
   - The name is often enclosed in quotes (e.g., 'Gold Membership', 'Starter Bundle')
   - Remove any quotes from the final name
   - Include only the name itself, without additional descriptors

3. Amount: Extract the monetary value
   - Look for numbers with currency symbols ($, €) or decimal values
   - Convert text numbers to numeric format
   - Remove currency symbols and keep only the numeric value
   - Usually follows "for" (e.g., "for $299.99")

Example 1:
User: "I want to sell for a product called 'Gold Membership' for $299.99"
\`\`\`json
{
    "actionContent": "I want to sell for a product",
    "promotionName": "Gold Membership",
    "amount": 299.99
}
\`\`\`

Example 2:
User: "Create a sale for a product called 'Starter Bundle' for $49.99"
\`\`\`json
{
    "actionContent": "Create a sale for a product",
    "promotionName": "Starter Bundle",
    "amount": 49.99
}
\`\`\`

{{recentMessages}}

Extract the sale information following the guidelines above and respond with a JSON markdown block containing only the extracted values. If any value cannot be determined, use null.`;

function isItemSellContent(
    content: any
): content is ItemSellContent {
    elizaLogger.debug("[CREATE_PRODUCT_SALE] Validating content:", content);
    
    if (typeof content !== 'object' || content === null) {
        elizaLogger.warn("[CREATE_PRODUCT_SALE] Content is not an object or is null");
        return false;
    }

    // Validate actionContent
    if (typeof content.actionContent !== 'string' || !content.actionContent.trim()) {
        elizaLogger.warn("[CREATE_PRODUCT_SALE] Invalid actionContent:", content.actionContent);
        return false;
    }

    // Validate promotionName
    if (typeof content.promotionName !== 'string' || !content.promotionName.trim()) {
        elizaLogger.warn("[CREATE_PRODUCT_SALE] Invalid promotionName:", content.promotionName);
        return false;
    }

    // Validate amount
    if (typeof content.amount !== 'number' || isNaN(content.amount) || content.amount <= 0) {
        // Try to convert string amount to number if needed
        if (typeof content.amount === 'string') {
            const parsedAmount = parseFloat(content.amount.replace(/[$,]/g, ''));
            if (!isNaN(parsedAmount) && parsedAmount > 0) {
                content.amount = parsedAmount;
                elizaLogger.info("[CREATE_PRODUCT_SALE] Successfully converted string amount to number:", parsedAmount);
                return true;
            }
        }
        elizaLogger.warn("[CREATE_PRODUCT_SALE] Invalid amount:", content.amount);
        return false;
    }

    elizaLogger.info("[CREATE_PRODUCT_SALE] Content validation successful");
    return true;
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

            if (!isItemSellContent(content)) {
                elizaLogger.warn("[CREATE_PRODUCT_SALE] Invalid product sale parameters");
                if (callback) {
                    callback({
                        text: `Invalid product sale parameters provided. Please ensure your message includes:\n- A clear action (e.g., "I want to sell for a product")\n- A product name (e.g., "Gold Membership")\n- A valid amount (e.g., "$299.99")`,
                        content: {
                            success: false,
                            error: "Invalid parameters",
                            receivedContent: content
                        },
                    });
                }
                return false;
            }

            elizaLogger.info("[CREATE_PRODUCT_SALE] Creating product sale response");
            // Create response with mock wallet address
            const mockWalletAddress = "0x" + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
            
            const itemSellResponse: ItemSellResponse = {
                actionContent: content.actionContent,
                promotionName: content.promotionName,
                amount: content.amount,
                walletAddress: mockWalletAddress,
                timestamp: new Date().toISOString()
            };

            elizaLogger.debug("[CREATE_PRODUCT_SALE] Generated product sale details:", itemSellResponse);
            
            if (callback) {
                elizaLogger.info("[CREATE_PRODUCT_SALE] Sending success response");
                callback({
                    text: `Successfully created product sale\nAction: ${itemSellResponse.actionContent}\nProduct: ${itemSellResponse.promotionName}\nAmount: $${itemSellResponse.amount}\nWallet: ${itemSellResponse.walletAddress}`,
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
                    text: `Error creating product sale: ${error.message}`,
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
                    text: "I want to sell for a product called 'Gold Membership' for $299.99",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Create a sale for a product called 'Starter Bundle' for $49.99",
                },
            },
        ],
    ] as ActionExample[][],
} as Action;
