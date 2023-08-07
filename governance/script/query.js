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

    console.log("voter1 balance:", balance1.toString())
    console.log("voter2 balance:", balance2.toString())
    console.log("voter3 balance:", balance3.toString())
    console.log("voter4 balance:", balance4.toString())
    console.log("voter5 balance:", balance5.toString())

    const treasury = await Treasury.deployed()
    const owner = await treasury.owner()
    console.log("Treasury owner:",owner)
    const treasuryBalance = await web3.eth.getBalance(treasury.address)

    console.log("treasury ether balance:", treasuryBalance.toString())


    const timeLock = await Timelock.deployed()
    const proposerRole = await timeLock.PROPOSER_ROLE()
    const executorRole = await timeLock.EXECUTOR_ROLE()
    const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()

    console.log("proposerRole:", proposerRole)
    console.log("executorRole", executorRole)
    console.log("adminRole", adminRole)


    callback()
}
