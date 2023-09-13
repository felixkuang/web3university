const { network } = require("hardhat");
const hre = require("hardhat");


async function main() {
    // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

    const [executor, proposer, admin, voter1, voter2, voter3, voter4, voter5] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", executor.address);

    //console.log("Account balance:", (await executor.getBalance()).toString());
  
    console.log(`network is ${network.name}`)
    console.log((await ethers.provider.getBalance(executor.address)).toString())
    //console.log(`${ethers.parseEther("1000")}`)

    //const GovernanceToken = await ethers.getContractFactory("GovernanceToken");
    //console.log(GovernanceToken)
    //const token = await GovernanceToken.deployed();
    const timeLock = await ethers.getContractAt("TimeLock", "0x0165878A594ca255338adfa4d48449f69242Eb8F")
    console.log(timeLock.target)

    const proposerRole = await timeLock.PROPOSER_ROLE()
    const executorRole = await timeLock.EXECUTOR_ROLE()
    const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()

    console.log(proposerRole)
    console.log(executorRole)
    console.log(adminRole)

    const adminAddr = await timeLock.hasRole(adminRole,admin.address)
    console.log(adminAddr)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });