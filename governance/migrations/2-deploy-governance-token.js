const GovernanceToken = artifacts.require("GovernanceToken")

module.exports = async function (deployer) {
    const [executor, proposer, admin, voter1, voter2, voter3, voter4, voter5] = await web3.eth.getAccounts()

    const name = "GovernanceToken"
    const symbol = "GT"
    const supply = web3.utils.toWei('1000', 'ether')    // 1000 Tokens

    // Deploy token
    await deployer.deploy(GovernanceToken, name, symbol, supply)
    const governanceToken = await GovernanceToken.deployed()
    console.log("Deploy GovernanceToken:", governanceToken.address)

    const amount = web3.utils.toWei('50', 'ether')
    await governanceToken.transfer(voter1, amount, { from: executor })
    await governanceToken.transfer(voter2, amount, { from: executor })
    await governanceToken.transfer(voter3, amount, { from: executor })
    await governanceToken.transfer(voter4, amount, { from: executor })
    await governanceToken.transfer(voter5, amount, { from: executor })
}