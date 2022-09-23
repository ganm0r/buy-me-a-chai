import { ethers } from "hardhat";

const main = async () => {
  const [ deployer ] = await ethers.getSigners();
  const balance = await deployer.getBalance();

  console.log("deployer address: ", deployer.address);
  console.log("deployer balance: ", balance.toString());

  const token = await ethers.getContractFactory("Chai");
  const portal = await token.deploy({
    value: ethers.utils.parseEther("0.001"),
  });
  
  await portal.deployed();

  console.log("chai portal address: ", portal.address);
};

const run = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

run();