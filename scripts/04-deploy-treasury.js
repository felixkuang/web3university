const path = require("path");
const { ethers } = require("hardhat");

async function main() {
    const [executor, proposer, admin, voter1, voter2, voter3, voter4, voter5] = await ethers.getSigners();
    // Deploy Treasury

    // Timelock contract will be the owner of our treasury contract.
    // In the provided example, once the proposal is successful and executed,
    // timelock contract will be responsible for calling the function.

    const funds = ethers.parseEther("1")

    const treasury = await ethers.deployContract("Treasury",[executor.address], { from: executor.address,value: funds });
    await treasury.waitForDeployment();
    console.log(`Treasury address: ${treasury.target}`);

    const timelock = await ethers.getContractAt("TimeLock", "0x0165878A594ca255338adfa4d48449f69242Eb8F")
    const governance = await ethers.getContractAt("Governance", "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853")

    await treasury.transferOwnership(timelock.target, { from: executor.address })

    // Assign roles

    // You can view more information about timelock roles from the openzeppelin documentation:
    // --> https://docs.openzeppelin.com/contracts/4.x/api/governance#timelock-proposer
    // --> https://docs.openzeppelin.com/contracts/4.x/api/governance#timelock-executor

    const proposerRole = await timelock.PROPOSER_ROLE()
    const executorRole = await timelock.EXECUTOR_ROLE()
    const adminRole = await timelock.TIMELOCK_ADMIN_ROLE()

    await timelock.connect(admin).grantRole(proposerRole, governance.target)
    await timelock.connect(admin).grantRole(executorRole, governance.target)
    //await timelock.revokeRole(adminRole, admin, { from: admin })
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });