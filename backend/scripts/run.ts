import { ethers } from "hardhat";

const main = async () => {
  const chaiContractFactory = await ethers.getContractFactory("Chai");
  const chaiContract = await chaiContractFactory.deploy({
    value: ethers.utils.parseEther("0.000001"),
  });

  await chaiContract.deployed();
  console.log("chai contract deployed to: ", chaiContract.address);
  
  let chaiContractBalance = await ethers.provider.getBalance(chaiContract.address);
  console.log("contract balance: ", ethers.utils.formatEther(chaiContractBalance));

  const chaiTransaction = await chaiContract.buyChai(
    "gandharv",
    "this is chai #1",
    ethers.utils.parseEther("0.000001"),
  );
  
  await chaiTransaction.wait();

  chaiContractBalance = await ethers.provider.getBalance(chaiContract.address);
  console.log("contract balance: ", ethers.utils.formatEther(chaiContractBalance));

  let allChai = await chaiContract.getAllChai();
  console.log(allChai);
};

const run = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

run();