const path = require("path");
const { ethers} = require("hardhat");

async function main() {
    const [executor, proposer, admin, voter1, voter2, voter3, voter4, voter5] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", executor.address);

    const name = "GovernanceToken"
    const symbol = "GT"
    const supply = ethers.parseEther("1000")    // 1000 Tokens
  
    const GovernanceToken = await ethers.deployContract("GovernanceToken",[name,symbol,supply]);
    await GovernanceToken.waitForDeployment();
    console.log(`GovernanceToken address: ${GovernanceToken.target}`);

    const amount = ethers.parseEther("50")
    await GovernanceToken.transfer(voter1, amount, { from: executor })
    await GovernanceToken.transfer(voter2, amount, { from: executor })
    await GovernanceToken.transfer(voter3, amount, { from: executor })
    await GovernanceToken.transfer(voter4, amount, { from: executor })
    await GovernanceToken.transfer(voter5, amount, { from: executor })

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });