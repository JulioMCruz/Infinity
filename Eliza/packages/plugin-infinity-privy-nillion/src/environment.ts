import { elizaLogger } from "@elizaos/core";
import type { IAgentRuntime } from "@elizaos/core";
import { PrivyNillionConfig } from "./types/Infinitytypes";
import * as viemChains from "viem/chains";

export const validatePrivyNillionConfig = async (
    runtime: IAgentRuntime
): Promise<PrivyNillionConfig> => {
    const privyAppId = runtime.getSetting("PRIVY_APP_ID");
    const privyAppSecret = runtime.getSetting("PRIVY_APP_SECRET");
    const nillionApiKey = runtime.getSetting("NILLION_API_KEY");
    const chainName = runtime.getSetting("EVM_CHAIN_NAME");

    // Validate Privy configuration
    if (!privyAppId || typeof privyAppId !== "string") {
        elizaLogger.error("❌ PrivyNillionPlugin PRIVY_APP_ID not configured", privyAppId);
        throw new Error("PrivyNillionPlugin PRIVY_APP_ID not configured");
    }
    if (!privyAppSecret || typeof privyAppSecret !== "string") {
        elizaLogger.error("❌ PrivyNillionPlugin PRIVY_APP_SECRET not configured", privyAppSecret);
        throw new Error("PrivyNillionPlugin PRIVY_APP_SECRET not configured");
    }

    // Validate Nillion configuration
    if (!nillionApiKey || typeof nillionApiKey !== "string") {
        elizaLogger.error("❌ PrivyNillionPlugin NILLION_API_KEY not configured", nillionApiKey);
        throw new Error("PrivyNillionPlugin NILLION_API_KEY not configured");
    }

    // Validate chain configuration
    if (!chainName || typeof chainName !== "string") {
        elizaLogger.error("❌ PrivyNillionPlugin EVM_CHAIN_NAME not configured", chainName);
        throw new Error("PrivyNillionPlugin EVM_CHAIN_NAME not configured");
    }

    if (!viemChains[chainName]) {
        elizaLogger.error("❌ PrivyNillionPlugin EVM_CHAIN_NAME not supported", chainName);
        throw new Error("PrivyNillionPlugin EVM_CHAIN_NAME not supported");
    }

    elizaLogger.info("✅ PrivyNillionPlugin configuration validated successfully");
    elizaLogger.debug("Chain configured:", chainName);

    return { 
        privyAppId, 
        privyAppSecret, 
        nillionApiKey, 
        chainName 
    };
};
