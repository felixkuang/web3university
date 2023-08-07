const Governance = artifacts.require("Governance")
const GovernanceToken = artifacts.require("GovernanceToken")
const Timelock = artifacts.require("Timelock")

module.exports = async function (deployer) {
    const [executor, proposer, admin, voter1, voter2, voter3, voter4, voter5] = await web3.eth.getAccounts()

    const timelock = await Timelock.deployed()
    const governance = await Governance.deployed()

    const proposerRole = await timelock.PROPOSER_ROLE()
    const executorRole = await timelock.EXECUTOR_ROLE()
    const adminRole = await timelock.TIMELOCK_ADMIN_ROLE()

    const proposerTx = await timelock.grantRole(proposerRole, governance.address, { from: admin })
    const executorTx = await timelock.grantRole(executorRole, governance.address, { from: admin })
    const revokeTx = await timelock.revokeRole(adminRole, admin ,{ from: admin })
}