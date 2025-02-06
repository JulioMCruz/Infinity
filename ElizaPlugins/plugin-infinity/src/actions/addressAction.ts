import {
    Action,
    HandlerCallback,
    Memory,
    State,
    type IAgentRuntime,
} from "@elizaos/core";
import { initWalletProvider } from "../providers/wallet";

export const addressAction: Action = {
    name: "GET_WALLET_ADDRESS",
    similes: [
        "SHARE_YOUR_WALLET_ADDRESS",
        "SHOW_YOUR_WALLET_ADDRESS",
        "STATE_YOUR_WALLET_ADDRESS",
        "FIND_YOUR_WALLET_ADDRESS",
        "OBTAIN_YOUR_WALLET_ADDRESS",
        "DISPLAY_YOUR_WALLET_ADDRESS",
        "REVEAL_YOUR_WALLET_ADDRESS",
        "PROVIDE_YOUR_WALLET_ADDRESS",
        "FETCH_YOUR_WALLET_ADDRESS",
        "RETRIEVE_YOUR_WALLET_ADDRESS",
    ],
    description:
        "Retrieves the wallet address associated with the current runtime",
    examples: [
        // Happy path - Basic wallet address request
        [
            {
                user: "{{user1}}",
                content: {
                    text: "What's your wallet address?",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Here's my wallet address",
                    action: "GET_WALLET_ADDRESS",
                },
            },
        ],
        // Edge case - Formal request with context
        [
            {
                user: "{{user1}}",
                content: {
                    text: "I need to send you some ETH. Could you share your wallet address?",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "I'll retrieve my wallet address for you",
                    action: "GET_WALLET_ADDRESS",
                },
            },
        ],
        // Error case - No private key configured
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Please show me your wallet address",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "I apologize, but I cannot access my wallet address at the moment. Please ensure the EVM_PRIVATE_KEY is properly configured.",
                },
            },
        ],
    ],
    handler: async (
        runtime: IAgentRuntime,
        _message: Memory,
        _state: State,
        _options: unknown,
        _callback: HandlerCallback
    ) => {
        const walletProvider = await initWalletProvider(runtime);
        const address = walletProvider.getAddress();

        return address;
    },
    validate: async (runtime: IAgentRuntime) => {
        const privateKey = runtime.getSetting("EVM_PRIVATE_KEY");
        return typeof privateKey === "string" && privateKey.startsWith("0x");
    },
    // suppressInitialMessage: true,
};
