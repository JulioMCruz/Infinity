import type { Plugin } from "@elizaos/core";
import { walletProvider,  } from "./provider";
import createRewardTokenAction from "./actions/createRewardAction.ts";

// Initial banner
console.log("\n┌════════════════════════════════════════┐");
console.log("│          INFINITY AGENTKIT PLUGIN               │");
console.log("├────────────────────────────────────────┤");
console.log("│  Initializing INFINITY AgentKit Plugin...       │");
console.log("│  Version: 0.0.1                        │");
console.log("└════════════════════════════════════════┘");


export const infinityAgentKitPlugin: Plugin = {
    name: "infinity agentkit",
    description: "infinity agentkit plugin",
    actions: [createRewardTokenAction] ,
    evaluators: [],
    providers: [walletProvider],
};


export default infinityAgentKitPlugin;
