import { Plugin } from "@elizaos/core";
import { createPoSWalletAction } from "./actions/index.ts";
export * as actions from "./actions/index.ts";
export * as evaluators from "./evaluators/index.ts";
export * as providers from "./providers/index.ts";

export const infinityPrivyNillionPlugin: Plugin = {
    name: "infinity-privy-nillion",
    description: "Plugin for PoS wallet creation with Privy and secure storage with Nillion",
    actions: [createPoSWalletAction],
    evaluators: [],
    providers: [],
};

export default infinityPrivyNillionPlugin;
