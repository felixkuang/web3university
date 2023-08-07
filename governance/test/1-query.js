const GovernanceToken = artifacts.require("GovernanceToken")
const Timelock = artifacts.require("Timelock")
const Treasury = artifacts.require("Treasury")
const Governance = artifacts.require("Governance")

contract("Info", (accounts) => {
    const [executor, proposer, admin, voter1, voter2, voter3, voter4, voter5] = accounts
    let isReleased, funds, blockNumber, proposalState, vote

    it("get voter balance", async () => {
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
        const treasuryBalance = await web3.eth.getBalance(treasury.address)

        console.log("treasury ether balance:", treasuryBalance.toString())

    })

    // it("Propose", async () => {
       

    //     const amount = web3.utils.toWei('5', 'ether')

    //     const token = await GovernanceToken.deployed()
    //     await token.delegate(voter1, { from: voter1 })
    //     await token.delegate(voter2, { from: voter2 })
    //     await token.delegate(voter3, { from: voter3 })
    //     await token.delegate(voter4, { from: voter4 })
    //     await token.delegate(voter5, { from: voter5 })

    //     const treasury = await Treasury.deployed()

    //     isReleased = await treasury.isReleased()
    //     console.log(`Funds released? ${isReleased}`)
    
    //     funds = await web3.eth.getBalance(treasury.address)
    //     console.log(`Funds inside of treasury: ${web3.utils.fromWei(funds.toString(), 'ether')} ETH\n`)
    
    //     const governance = await Governance.deployed()
    //     const encodedFunction = await treasury.contract.methods.releaseFunds().encodeABI()
    //     const description = "Release Funds from Treasury"
    
    //     const tx = await governance.propose([treasury.address], [0], [encodedFunction], description, { from: proposer })
        
    // })

    // it("timeLock", async () => {
    //     const timeLock = await Timelock.deployed()
    //     const proposerRole = await timeLock.PROPOSER_ROLE()
    //     const executorRole = await timeLock.EXECUTOR_ROLE()
    //     const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()

    //     console.log(proposerRole, executorRole, adminRole)

    //     const ar = await timeLock.getRoleAdmin(adminRole)
    //     console.log("ar:",ar);
    // })
    // it("accounts", async()=>{
    //     const a = await web3.eth.getAccounts()
    //     for(var i=0;i<a.length;i++){
    //         console.log(a[i]);
    //     }
    // })

})