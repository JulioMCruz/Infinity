import { elizaLogger } from "@elizaos/core";
import type { IAgentRuntime } from "@elizaos/core";
import { InfinityConfig } from "./types/Infinitytypes";
import * as viemChains from "viem/chains";

export const validateInfinityConfig = async (
    runtime: IAgentRuntime
): Promise<InfinityConfig> => {
    const infinityPromotionFactoryContractAddress =  runtime.getSetting("INFINITY_PROMOTION_FACTORY_CONTRACT_ADDRESS");
    const chainName =  runtime.getSetting("EVM_CHAIN_NAME");
    if (!infinityPromotionFactoryContractAddress || typeof infinityPromotionFactoryContractAddress !== "string") {
        elizaLogger.debug("❌ InfinityPlugin INFINITY_PROMOTION_FACTORY_CONTRACT_ADDRESS not configured", infinityPromotionFactoryContractAddress);
        throw new Error("InfinityPlugin INFINITY_PROMOTION_FACTORY_CONTRACT_ADDRESS not configured");
    }
    if (!chainName || typeof chainName !== "string") {
        elizaLogger.debug("❌ InfinityPlugin EVM_CHAIN_NAME not configured", chainName);
        throw new Error("InfinityPlugin EVM_CHAIN_NAME not configured");
    }

    if (!viemChains[chainName]) {
        elizaLogger.debug("❌ InfinityPlugin EVM_CHAIN_NAME not supported", chainName);
        throw new Error("InfinityPlugin EVM_CHAIN_NAME not supported");
    }

    return { infinityPromotionFactoryContractAddress, chainName };
};