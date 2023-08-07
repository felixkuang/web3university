const GovernanceToken = artifacts.require("GovernanceToken")
const Bridge = artifacts.require("Bridge")
const Governance = artifacts.require("Governance")

module.exports = async function (callback) {
    const [executor, proposer, admin, voter1, voter2, voter3, voter4, voter5] = await web3.eth.getAccounts()
    let owner, funds, blockNumber, proposalState, vote
    
    const token = await GovernanceToken.deployed()
    await token.delegate(voter1, { from: voter1 })
    await token.delegate(voter2, { from: voter2 })
    await token.delegate(voter3, { from: voter3 })
    await token.delegate(voter4, { from: voter4 })
    await token.delegate(voter5, { from: voter5 })

    const bridge = await Bridge.deployed()

    owner = await bridge.owner()
    console.log(`Bridge Owner ${owner}`)

    funds = await web3.eth.getBalance(bridge.address)
    console.log(`Funds inside of bridge: ${web3.utils.fromWei(funds.toString(), 'ether')} ETH\n`)

    const governance = await Governance.deployed()
    const encodedFunction = await bridge.contract.methods.updateRequired(3).encodeABI()

    const description = "Modify the number of Signers"

    const tx = await governance.propose([bridge.address], [0], [encodedFunction], description, { from: proposer })

    const id = tx.logs[0].args.proposalId
    console.log(`Created Proposal: ${id.toString()}\n`)

    proposalState = await governance.state.call(id)
    console.log(`Current state of proposal: ${proposalState.toString()} (Pending) \n`)

    const snapshot = await governance.proposalSnapshot.call(id)
    console.log(`Proposal created on block ${snapshot.toString()}`)

    const deadline = await governance.proposalDeadline.call(id)
    console.log(`Proposal deadline on block ${deadline.toString()}\n`)

    blockNumber = await web3.eth.getBlockNumber()
    console.log(`Current blocknumber: ${blockNumber}\n`)

    const quorum = await governance.quorum(blockNumber - 1)
    console.log(`Number of votes required to pass: ${web3.utils.fromWei(quorum.toString(), 'ether')}\n`)

    callback()
}