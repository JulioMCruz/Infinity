import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployInfinityPromotionFactory: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("InfinityPromotionFactory", {
    from: deployer,
    args: [], // No constructor arguments needed as it only takes msg.sender for Ownable
    log: true,
    autoMine: true,
  });

  // Get the deployed contract
  const infinityPromotionFactory = await hre.ethers.getContract<Contract>("InfinityPromotionFactory", deployer);
  console.log("📊 Number of deployed promotions:", await infinityPromotionFactory.getDeployedPromotionsCount());
};

export default deployInfinityPromotionFactory;

// Tags represent the deployment scripts that this deployment depends on
deployInfinityPromotionFactory.tags = ["InfinityPromotionFactory"];