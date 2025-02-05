import { elizaLogger } from "@elizaos/core";
import type { IAgentRuntime } from "@elizaos/core";
import { EthAgenticConfig } from "./types";

export const validateEthAgenticConfig = async (
    runtime: IAgentRuntime
): Promise<EthAgenticConfig> => {
    const baseUrl = runtime.getSetting("BACKEND_DATA_ENDPOINT");
    if (!baseUrl || typeof baseUrl !== "string") {
        elizaLogger.error("EthAgentic BACKEND_DATA_ENDPOINT not configured", baseUrl );
        throw new Error("EthAgentic BACKEND_DATA_ENDPOINT not configured");
    }

    return { baseUrl };
};