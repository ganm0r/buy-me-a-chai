const hre = require('hardhat')

async function main() {
  const BuyMeAChai = await hre.ethers.getContractFactory('BuyMeAChai')
  const buyMeAChai = await BuyMeAChai.deploy()

  await buyMeAChai.deployed()

  console.log('buymeachai deployed to: ', buyMeAChai.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

export {}
