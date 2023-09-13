const { expect } = require("chai");

const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");

describe("GovernanceToken contract", function () {
    console.log("Propose start...")

    async function deployTokenFixture() {

        const [executor, proposer, admin, voter1, voter2, voter3, voter4, voter5] = await ethers.getSigners();
        const name = "GovernanceToken"
        const symbol = "GT"
        const supply = ethers.parseEther("1000")

        const token = await ethers.deployContract("GovernanceToken", [name, symbol, supply]);

        await token.waitForDeployment();

        return { token, executor, proposer, admin, voter1, voter2, voter3, voter4, voter5 };
    }

    describe("Deployment", function () {
        it("Should fail if sender doesn't have enough tokens", async function () {

            const { token, executor } = await loadFixture(deployTokenFixture);

            expect(await token.balanceOf(executor.address)).to.equal(ethers.parseEther("1000"));
        });
    })

})  