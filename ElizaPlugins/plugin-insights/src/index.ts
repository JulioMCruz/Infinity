import type { Plugin } from "@elizaos/core";
import { getInsightsAction } from "./actions/getInsights";

export const insightsPlugin: Plugin = {
    name: "insights",
    description: "Provides insights and analytics about platform performance",
    actions: [getInsightsAction],
    evaluators: [],
    providers: [],
};
export default insightsPlugin;
