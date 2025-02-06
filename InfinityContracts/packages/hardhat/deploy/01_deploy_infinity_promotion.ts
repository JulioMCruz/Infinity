import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys the InfinityPromotion contract
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployInfinityPromotion: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Constructor arguments
  const name = "Infinity Taco NFT";
  const symbol = "TACO";
  const maxTokens = 1000; // Maximum number of NFTs that can be minted
  const duration = 30 * 24 * 60 * 60; // 30 days in seconds
  const baseURI = "ipfs://YOUR_IPFS_BASE_URI/"; // Replace with actual IPFS URI for metadata

  await deploy("InfinityPromotion", {
    from: deployer,
    args: [name, symbol, maxTokens, duration, baseURI],
    log: true,
    autoMine: true,
  });

  // Get the deployed contract
  const infinityPromotion = await hre.ethers.getContract<Contract>("InfinityPromotion", deployer);
  console.log("🌮 InfinityPromotion deployed to:", infinityPromotion.address);
  console.log("📊 Max tokens:", await infinityPromotion.MAX_TOKENS());
  console.log("⏰ Expiration time:", new Date((await infinityPromotion.expirationTime()).toNumber() * 1000).toISOString());
};

export default deployInfinityPromotion;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags InfinityPromotion
deployInfinityPromotion.tags = ["InfinityPromotion"];
