import { elizaLogger } from "@elizaos/core";
import type { IAgentRuntime } from "@elizaos/core";
import { EthAgenticConfig } from "./types";

export const validateEthAgenticConfig = async (
    runtime: IAgentRuntime
): Promise<EthAgenticConfig> => {
    const secrets = runtime.character?.settings?.secrets;
    elizaLogger.debug("🔵 - validateEthAgenticConfig - secrets", secrets);

    if (!secrets || typeof secrets !== "object") {
        throw new Error("EthAgentic configuration not found");
    }

    const baseUrl = secrets["baseUrl"];
    if (!baseUrl || typeof baseUrl !== "string") {
        throw new Error("EthAgentic baseUrl not configured");
    }

    return { baseUrl };
};