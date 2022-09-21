import { ethers } from "hardhat";

const main = async () => {
  const chaiContractFactory = await ethers.getContractFactory('Chai');
  const chaiContract = await chaiContractFactory.deploy();

  await chaiContract.deployed();

  console.log("chai contract deployed to: ", chaiContract.address);
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