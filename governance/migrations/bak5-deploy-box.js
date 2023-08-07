const Box = artifacts.require("Box")
const Timelock = artifacts.require("Timelock")

module.exports = async function (deployer) {
    const [executor, proposer, admin, voter1, voter2, voter3, voter4, voter5] = await web3.eth.getAccounts()
    await deployer.deploy(Box)
    const box = await Box.deployed()
    console.log("Deploy Box:", box.address)

    const boxSetTx = await box.store(10);
    
    const boxVal = await box.retrieve();
    const timelock = await Timelock.deployed()
    const boxTransferOwnerTx = await box.transferOwnership(timelock.address, { from: executor });

    console.log("box contract deployed, the value:", boxVal.toString());
}