const Bridge = artifacts.require("Bridge")
const Governance = artifacts.require("Governance")

module.exports = async function (callback) {
    // Queue 
    let proposalState
    const id = "17186614190730996729504563143428047115254707686790692421777653801310346507604"
    const [executor, proposer, admin, voter1, voter2, voter3, voter4, voter5] = await web3.eth.getAccounts()
    const bridge = await Bridge.deployed()
    const governance = await Governance.deployed()

    const encodedFunction = await bridge.contract.methods.updateRequired(3).encodeABI()
    const hash = web3.utils.sha3("Modify the number of Signers")
    await governance.queue([bridge.address], [0], [encodedFunction], hash, { from: executor })

    proposalState = await governance.state.call(id)
    console.log(`Current state of proposal: ${proposalState.toString()} (Queued) \n`)

    callback()
}