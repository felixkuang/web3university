const Timelock = artifacts.require("Timelock")

module.exports = async function (deployer) {
    const [executor, proposer, admin, voter1, voter2, voter3, voter4, voter5] = await web3.eth.getAccounts()
    
    // Deploy timelock    
    const minDelay = 1; // How long do we have to wait until we can execute after a passed proposal

    // In addition to passing minDelay, we also need to pass 2 arrays.
    // The 1st array contains addresses of those who are allowed to make a proposal.
    // The 2nd array contains addresses of those who are allowed to make executions.

    await deployer.deploy(Timelock, minDelay, [proposer], [executor], admin)
    const timelock = await Timelock.deployed()

    console.log("Deploy Timelock:", timelock.address);
}

