const WETH = artifacts.require("./WETH");
const Bridge = artifacts.require("Bridge")
const Timelock = artifacts.require("Timelock")
const Governance = artifacts.require("Governance")

module.exports = async function (deployer) {
    const [executor, proposer, admin, voter1, voter2, voter3, voter4, voter5] = await web3.eth.getAccounts()
    const funds = web3.utils.toWei('1', 'ether')

    const weth = await WETH.deployed()
    await deployer.deploy(Bridge,
        weth.address,
        [
            '0xe41c6E6fb917cB9b501706563AbEcaC3C133EdC3',
            '0x208F76523Fc9ACa8ECdD527A294c012fBC0D57a4',
            '0xFb9bF6b02eed1273652F34379CfE122e4Fe9acA8',
            '0x95ceEB832a180Ef4370dB373250AE35A5701f095',
            '0x4cb05d2CEC1943133173113c5ef6f80B436eE550'
        ],
        5, { value: funds })

    const bridge = await Bridge.deployed()
    console.log("Deploy Bridge:", bridge.address);

    const governance = await Governance.deployed()
    const timelock = await Timelock.deployed()
    bridge.transferOwnership(timelock.address, { from: executor })

    // Assign roles

    // You can view more information about timelock roles from the openzeppelin documentation:
    // --> https://docs.openzeppelin.com/contracts/4.x/api/governance#timelock-proposer
    // --> https://docs.openzeppelin.com/contracts/4.x/api/governance#timelock-executor

    // const proposerRole = await timelock.PROPOSER_ROLE()
    // const executorRole = await timelock.EXECUTOR_ROLE()
    // const adminRole = await timelock.TIMELOCK_ADMIN_ROLE()

    // await timelock.grantRole(proposerRole, governance.address, { from: admin })
    // await timelock.grantRole(executorRole, governance.address, { from: admin })
    // await timelock.revokeRole(adminRole, admin, { from: admin })
}