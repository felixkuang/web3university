const Treasury = artifacts.require("Treasury")
const Governance = artifacts.require("Governance")

module.exports = async function (callback) {
    // Execute
    let isReleased, funds, proposalState
    const id = "15356230472075598437200295397811233350645082797008050432374033298202495071836"
    const [executor, proposer, admin, voter1, voter2, voter3, voter4, voter5] = await web3.eth.getAccounts()
    const treasury = await Treasury.deployed()
    const governance = await Governance.deployed()

    const encodedFunction = await treasury.contract.methods.releaseFunds().encodeABI()
    const hash = web3.utils.sha3("Release Funds from Treasury")


    await governance.execute([treasury.address], [0], [encodedFunction], hash, { from: executor })

    proposalState = await governance.state.call(id)
    console.log(`Current state of proposal: ${proposalState.toString()} (Executed) \n`)

    isReleased = await treasury.isReleased()
    console.log(`Funds released? ${isReleased}`)

    funds = await web3.eth.getBalance(treasury.address)
    console.log(`Funds inside of treasury: ${web3.utils.fromWei(funds.toString(), 'ether')} ETH\n`)

    callback()
}