const Treasury = artifacts.require("Treasury")
const Governance = artifacts.require("Governance")

module.exports = async function (callback) {
    // Queue 
    let proposalState
    const id = "9818846468997281827720677591548342793148174686114498564706115154545109484759"
    const [executor, proposer, admin, voter1, voter2, voter3, voter4, voter5] = await web3.eth.getAccounts()
    const treasury = await Treasury.deployed()
    const governance = await Governance.deployed()

    const encodedFunction = await treasury.contract.methods.releaseFunds().encodeABI()
    const hash = web3.utils.sha3("Release Funds from Treasury")
    await governance.queue([treasury.address], [0], [encodedFunction], hash, { from: executor })

    proposalState = await governance.state.call(id)
    console.log(`Current state of proposal: ${proposalState.toString()} (Queued) \n`)

    callback()
}