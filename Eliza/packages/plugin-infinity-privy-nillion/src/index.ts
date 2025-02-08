import { Plugin } from "@elizaos/core";
import { createSocialWalletAction, createItemSellAction } from "./actions/index.ts";
export * as actions from "./actions/index.ts";
export * as evaluators from "./evaluators/index.ts";
export * as providers from "./providers/index.ts";

import { walletProvider } from "./providers/wallet";

export const infinityPrivyNillionPlugin: Plugin = {
    name: "infinity-privy-nillion",
    description: "Plugin for social wallet creation with Privy and secure storage with Nillion",
    actions: [createSocialWalletAction, createItemSellAction],
    evaluators: [],
    providers: [walletProvider],
};

export default infinityPrivyNillionPlugin;
