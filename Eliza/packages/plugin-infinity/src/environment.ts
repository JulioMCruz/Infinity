import { elizaLogger } from "@elizaos/core";
import type { IAgentRuntime } from "@elizaos/core";
import { InfinityConfig } from "./types/Infinitytypes";

export const validateInfinityConfig = async (
    runtime: IAgentRuntime
): Promise<InfinityConfig> => {
    const infinityPromotionContractAddress =  runtime.getSetting("INFINITY_PROMOTION_CONTRACT_ADDRESS");
    const infinityPromotionFactoryContractAddress =  runtime.getSetting("INFINITY_PROMOTION_FACTORY_CONTRACT_ADDRESS");
    if (!infinityPromotionContractAddress || typeof infinityPromotionContractAddress !== "string") {
        elizaLogger.debug("❌ EthAgentic INFINITY_PROMOTION_CONTRACT_ADDRESS not configured", infinityPromotionContractAddress);
        throw new Error("EthAgentic INFINITY_PROMOTION_CONTRACT_ADDRESS not configured");
    }
    if (!infinityPromotionFactoryContractAddress || typeof infinityPromotionFactoryContractAddress !== "string") {
        elizaLogger.debug("❌ EthAgentic INFINITY_PROMOTION_FACTORY_CONTRACT_ADDRESS not configured", infinityPromotionFactoryContractAddress);
        throw new Error("EthAgentic INFINITY_PROMOTION_FACTORY_CONTRACT_ADDRESS not configured");
    }

    return { infinityPromotionContractAddress, infinityPromotionFactoryContractAddress };
};