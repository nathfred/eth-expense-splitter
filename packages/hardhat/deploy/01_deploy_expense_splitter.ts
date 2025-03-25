import { ethers } from "hardhat";

async function main() {
  const ExpenseSplitter = await ethers.getContractFactory("ExpenseSplitter");
  const expenseSplitter = await ExpenseSplitter.deploy();
  await expenseSplitter.deployed();
  console.log("ExpenseSplitter deployed to:", expenseSplitter.address);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
