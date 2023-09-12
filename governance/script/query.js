const GovernanceToken = artifacts.require("GovernanceToken")
const Timelock = artifacts.require("Timelock")
const Treasury = artifacts.require("Treasury")
const Governance = artifacts.require("Governance")

module.exports = async function (callback) {
    const [executor, proposer, admin, voter1, voter2, voter3, voter4, voter5] = await web3.eth.getAccounts()

    const governanceTokenInstance = await GovernanceToken.deployed()
    const balance1 = await governanceTokenInstance.balanceOf(voter1)
    const balance2 = await governanceTokenInstance.balanceOf(voter2)
    const balance3 = await governanceTokenInstance.balanceOf(voter3)
    const balance4 = await governanceTokenInstance.balanceOf(voter4)
    const balance5 = await governanceTokenInstance.balanceOf(voter5)
    const balance6 = await governanceTokenInstance.balanceOf(proposer)

    console.log("voter1 balance:", `${web3.utils.fromWei(balance1.toString(), 'ether')}`, "token")
    console.log("voter2 balance:", `${web3.utils.fromWei(balance2.toString(), 'ether')}`, "token")
    console.log("voter3 balance:", `${web3.utils.fromWei(balance3.toString(), 'ether')}`, "token")
    console.log("voter4 balance:", `${web3.utils.fromWei(balance4.toString(), 'ether')}`, "token")
    console.log("voter5 balance:", `${web3.utils.fromWei(balance5.toString(), 'ether')}`, "token")
    console.log("proposer balance:", `${web3.utils.fromWei(balance6.toString(), 'ether')}`, "token")

    const treasury = await Treasury.deployed()
    const owner = await treasury.owner()
    console.log("Treasury owner:", owner)

    const treasuryBalance = await web3.eth.getBalance(treasury.address)
    console.log("treasury ether balance:", `${web3.utils.fromWei(treasuryBalance.toString(), 'ether')}`, "ether")


    // const timeLock = await Timelock.deployed()
    // const proposerRole = await timeLock.PROPOSER_ROLE()
    // const executorRole = await timeLock.EXECUTOR_ROLE()
    // const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()

    // console.log("proposerRole:", proposerRole)
    // const isProposer = await timeLock.hasRole(proposerRole, proposer)
    // console.log(`is proposer ${isProposer}`)
    // console.log("executorRole", executorRole)
    // const isExecutor = await timeLock.hasRole(executorRole, executor)
    // console.log(`is executor ${isExecutor}`)
    // console.log("adminRole", adminRole)

    const governance = await Governance.deployed()
 

    const encodedFunction = await treasury.contract.methods.releaseFunds().encodeABI()
    const hash = web3.utils.sha3("Release Funds from Treasury")
    const id = await governance.hashProposal.call([treasury.address],[0], [encodedFunction], hash)
    console.log(`Current proposal id: ${id}`)

    proposalState = await governance.state.call(id)
    console.log(`Current state of proposal: ${proposalState.toString()}`)

    callback()
}
