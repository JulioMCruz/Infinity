import type { Plugin } from "@elizaos/core";
import { getSalesAction } from "./actions/getSales";

export const salesPlugin: Plugin = {
    name: "sales",
    description: "Retrieve sales data from EthAgentic platform",
    actions: [getSalesAction],
    evaluators: [],
    providers: [],
};
export default salesPlugin;
