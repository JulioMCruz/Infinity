import { Plugin } from "@elizaos/core";
import { createPromotionAction } from "./actions/index.ts";
export * as actions from "./actions/index.ts";
export * as evaluators from "./evaluators/index.ts";
export * as providers from "./providers/index.ts";

import { walletProvider } from "./providers/wallet";

export const infinityPlugin: Plugin = {
    name: "infinity",
    description: "infinity plugin for create promotion",
    actions: [createPromotionAction],
    evaluators: [],
    providers: [walletProvider],
};

export default infinityPlugin;
