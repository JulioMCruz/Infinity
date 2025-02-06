import { Plugin } from "@elizaos/core";
import { launchTokenAction, testAction } from "./actions/index.ts";
export * as actions from "./actions/index.ts";
export * as evaluators from "./evaluators/index.ts";
export * as providers from "./providers/index.ts";

import { walletProvider } from "./providers/wallet";
import { addressAction } from "./actions/addressAction.ts";

export const infinityPlugin: Plugin = {
    name: "infinity",
    description: "infinity plugin",
    actions: [addressAction, launchTokenAction, testAction],
    evaluators: [],
    providers: [walletProvider],
};

export default infinityPlugin;
