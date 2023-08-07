const Governance = artifacts.require("Governance")
const GovernanceToken = artifacts.require("GovernanceToken")

module.exports = async function (callback) {
    const [executor, proposer, admin, voter1, voter2, voter3, voter4, voter5] = await web3.eth.getAccounts()

    let blockNumber, proposalState, vote
    const id = "15356230472075598437200295397811233350645082797008050432374033298202495071836"
    const amount = web3.utils.toWei('1', 'ether')
    const governance = await Governance.deployed()
    const token = await GovernanceToken.deployed()

    // Vote
    console.log(`Casting votes...\n`)
    
    // 0 = Against, 1 = For, 2 = Abstain
    vote = await governance.castVote(id, 1, { from: voter1 })
    vote = await governance.castVote(id, 1, { from: voter2 })
    vote = await governance.castVote(id, 1, { from: voter3 })
    vote = await governance.castVote(id, 0, { from: voter4 })
    vote = await governance.castVote(id, 2, { from: voter5 })

    // States: Pending, Active, Canceled, Defeated, Succeeded, Queued, Expired, Executed
    proposalState = await governance.state.call(id)
    console.log(`Current state of proposal: ${proposalState.toString()} (Active) \n`)

    // NOTE: Transfer serves no purposes, it's just used to fast foward one block after the voting period ends
    await token.transfer(proposer, amount, { from: executor })

    const { againstVotes, forVotes, abstainVotes } = await governance.proposalVotes.call(id)
    console.log(`Votes For: ${web3.utils.fromWei(forVotes.toString(), 'ether')}`)
    console.log(`Votes Against: ${web3.utils.fromWei(againstVotes.toString(), 'ether')}`)
    console.log(`Votes Neutral: ${web3.utils.fromWei(abstainVotes.toString(), 'ether')}\n`)

    blockNumber = await web3.eth.getBlockNumber()
    console.log(`Current blocknumber: ${blockNumber}\n`)

    proposalState = await governance.state.call(id)
    console.log(`Current state of proposal: ${proposalState.toString()} (Succeeded) \n`)    
    
    callback()
}