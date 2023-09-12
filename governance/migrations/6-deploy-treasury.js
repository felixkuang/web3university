const Treasury = artifacts.require("Treasury")
const Timelock = artifacts.require("Timelock")
const Governance = artifacts.require("Governance")

module.exports = async function (deployer) {
    const [executor, proposer, admin, voter1, voter2, voter3, voter4, voter5] = await web3.eth.getAccounts()
    // Deploy Treasury

    // Timelock contract will be the owner of our treasury contract.
    // In the provided example, once the proposal is successful and executed,
    // timelock contract will be responsible for calling the function.

    const funds = web3.utils.toWei('1', 'ether')

    await deployer.deploy(Treasury, executor, { value: funds })
    const treasury = await Treasury.deployed()
    console.log("Deploy Treasury:", treasury.address)
    const timelock = await Timelock.deployed()
    const governance = await Governance.deployed()

    await treasury.transferOwnership(timelock.address, { from: executor })

    // Assign roles

    // You can view more information about timelock roles from the openzeppelin documentation:
    // --> https://docs.openzeppelin.com/contracts/4.x/api/governance#timelock-proposer
    // --> https://docs.openzeppelin.com/contracts/4.x/api/governance#timelock-executor

    const proposerRole = await timelock.PROPOSER_ROLE()
    const executorRole = await timelock.EXECUTOR_ROLE()
    const adminRole = await timelock.TIMELOCK_ADMIN_ROLE()

    await timelock.grantRole(proposerRole, governance.address, { from: admin })
    await timelock.grantRole(executorRole, governance.address, { from: admin })
    await timelock.revokeRole(adminRole, admin, { from: admin })
}
