import { Plugin } from "@elizaos/core";
export * as evaluators from "./evaluators/index.ts";
export * as providers from "./providers/index.ts";

export const infinityPlugin: Plugin = {
    name: "infinity",
    description: "infinity plugin",
    actions: [],
    evaluators: [],
};

export default infinityPlugin;
