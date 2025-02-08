import { elizaLogger } from "@elizaos/core";
import type { IAgentRuntime } from "@elizaos/core";
import { PrivyNillionConfig } from "./types/Infinitytypes";
import * as viemChains from "viem/chains";

export const validatePrivyNillionConfig = async (
    runtime: IAgentRuntime
): Promise<PrivyNillionConfig> => {
    // Get Privy configuration
    const privyAppId = runtime.getSetting("PRIVY_APP_ID");
    const privyAppSecret = runtime.getSetting("PRIVY_APP_SECRET");

    // Get Nillion configuration
    const nillionOrgSk = runtime.getSetting("NILLION_ORG_SK");
    const nillionOrgDid = runtime.getSetting("NILLION_ORG_DID");
    
    const nillionNode1Url = runtime.getSetting("NILLION_NODE1_URL");
    const nillionNode1Did = runtime.getSetting("NILLION_NODE1_DID");
    const nillionNode2Url = runtime.getSetting("NILLION_NODE2_URL");
    const nillionNode2Did = runtime.getSetting("NILLION_NODE2_DID");
    const nillionNode3Url = runtime.getSetting("NILLION_NODE3_URL");
    const nillionNode3Did = runtime.getSetting("NILLION_NODE3_DID");
    
    const nillionSaleSchemaId = runtime.getSetting("NILLION_SALE_SCHEMA_ID");
    
    // Get chain configuration
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
    if (!nillionOrgSk || typeof nillionOrgSk !== "string") {
        elizaLogger.error("❌ PrivyNillionPlugin NILLION_ORG_SK not configured", nillionOrgSk);
        throw new Error("PrivyNillionPlugin NILLION_ORG_SK not configured");
    }
    if (!nillionOrgDid || typeof nillionOrgDid !== "string") {
        elizaLogger.error("❌ PrivyNillionPlugin NILLION_ORG_DID not configured", nillionOrgDid);
        throw new Error("PrivyNillionPlugin NILLION_ORG_DID not configured");
    }

    // Validate Nillion nodes configuration
    if (!nillionNode1Url || typeof nillionNode1Url !== "string" || !nillionNode1Did || typeof nillionNode1Did !== "string") {
        elizaLogger.error("❌ PrivyNillionPlugin NILLION_NODE1 configuration invalid");
        throw new Error("PrivyNillionPlugin NILLION_NODE1 configuration invalid");
    }
    if (!nillionNode2Url || typeof nillionNode2Url !== "string" || !nillionNode2Did || typeof nillionNode2Did !== "string") {
        elizaLogger.error("❌ PrivyNillionPlugin NILLION_NODE2 configuration invalid");
        throw new Error("PrivyNillionPlugin NILLION_NODE2 configuration invalid");
    }
    if (!nillionNode3Url || typeof nillionNode3Url !== "string" || !nillionNode3Did || typeof nillionNode3Did !== "string") {
        elizaLogger.error("❌ PrivyNillionPlugin NILLION_NODE3 configuration invalid");
        throw new Error("PrivyNillionPlugin NILLION_NODE3 configuration invalid");
    }

    // Validate Nillion schema configuration
    if (!nillionSaleSchemaId || typeof nillionSaleSchemaId !== "string") {
        elizaLogger.error("❌ PrivyNillionPlugin NILLION_SALE_SCHEMA_ID not configured", nillionSaleSchemaId);
        throw new Error("PrivyNillionPlugin NILLION_SALE_SCHEMA_ID not configured");
    }

    // Validate chain configuration
    // if (!chainName || typeof chainName !== "string") {
    //     elizaLogger.error("❌ PrivyNillionPlugin EVM_CHAIN_NAME not configured", chainName);
    //     throw new Error("PrivyNillionPlugin EVM_CHAIN_NAME not configured");
    // }

    // if (!viemChains[chainName]) {
    //     elizaLogger.error("❌ PrivyNillionPlugin EVM_CHAIN_NAME not supported", chainName);
    //     throw new Error("PrivyNillionPlugin EVM_CHAIN_NAME not supported");
    // }

    elizaLogger.info("✅ PrivyNillionPlugin configuration validated successfully");
    elizaLogger.debug("Chain configured:", chainName);

    return {
        privyAppId,
        privyAppSecret,
        nillionOrgSk,
        nillionOrgDid,
        nillionNodes: {
            node1: { url: nillionNode1Url, did: nillionNode1Did },
            node2: { url: nillionNode2Url, did: nillionNode2Did },
            node3: { url: nillionNode3Url, did: nillionNode3Did }
        },
        nillionSaleSchemaId,
        chainName
    };
};
