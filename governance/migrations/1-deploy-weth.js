const WETH = artifacts.require("./WETH");

module.exports = async function (deployer) {
    await deployer.deploy(WETH);
    const weth = await WETH.deployed();
    console.log("Deploy WETH:", weth.address);
};