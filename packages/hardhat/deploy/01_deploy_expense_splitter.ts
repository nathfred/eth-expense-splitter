import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployExpenseSplitter: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("ExpenseSplitter", {
    from: deployer,
    log: true,
  });
};

export default deployExpenseSplitter;
deployExpenseSplitter.tags = ["ExpenseSplitter"];
