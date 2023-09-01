const { expect } = require("chai");
const { ethers} = require("hardhat");
const { abi } = require("../../artifacts/contracts/ERC20Permit/MyToken.sol/MyToken.json")
require('dotenv').config()

function getTimestampInSeconds() {
    // returns current timestamp in seconds
    return Math.floor(Date.now() / 1000);
}

describe("ERC20Permit", function () {

    it("ERC20 permit", async function () {
        // get a provider instance
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
        // get the network chain id
        const chainId = (await provider.getNetwork()).chainId;

        // create a signer instance with the token owner
        const tokenOwner = await new ethers.Wallet(process.env.PRIVATE_KEY_DEPLOYER, provider)

        // create a signer instance with the token receiver
        const tokenReceiver = await new ethers.Wallet(process.env.PRIVATE_KEY_ACCOUNT_2, provider)

        const myToken = new ethers.Contract("YOUR_DEPLOYED_CONTRACT_ADDRESS", abi, provider)

        // check account balances
        let tokenOwnerBalance = (await myToken.balanceOf(tokenOwner.address)).toString()
        let tokenReceiverBalance = (await myToken.balanceOf(tokenReceiver.address)).toString()

        console.log(`Starting tokenOwner balance: ${tokenOwnerBalance}`);
        console.log(`Starting tokenReceiver balance: ${tokenReceiverBalance}`);

        // set token value and deadline
        const value = ethers.parseEther("1");
        const deadline = getTimestampInSeconds() + 4200;

        // get the current nonce for the deployer address
        const nonces = await myToken.nonces(tokenOwner.address);

        // set the domain parameters
        const domain = {
            name: await myToken.name(),
            version: "1",
            chainId: chainId,
            verifyingContract: myToken.target
        };

        // set the Permit type parameters
        const types = {
            Permit: [{
                name: "owner",
                type: "address"
            },
            {
                name: "spender",
                type: "address"
            },
            {
                name: "value",
                type: "uint256"
            },
            {
                name: "nonce",
                type: "uint256"
            },
            {
                name: "deadline",
                type: "uint256"
            },
            ],
        };

        // set the Permit type values
        const values = {
            owner: tokenOwner.address,
            spender: tokenReceiver.address,
            value: value,
            nonce: nonces,
            deadline: deadline,
        };

        // sign the Permit type data with the deployer's private key
        const signature = await tokenOwner.signTypedData(domain, types, values);
        console.log("signature:", signature)

        const signatureObj = ethers.Signature.from(signature);

        const recovered = ethers.verifyTypedData(
            domain,
            types,
            values,
            signature
        );

        console.log("recovered:", recovered);

        let tx = await myToken.connect(tokenOwner).permit(
            tokenOwner.address,
            tokenReceiver.address,
            value,
            deadline,
            signatureObj.v,
            signatureObj.r,
            signatureObj.s
        );

        //await tx.wait(2) //wait 2 blocks after tx is confirmed

        console.log(`Check allowance of tokenReceiver: ${await myToken.allowance(tokenOwner.address, tokenReceiver.address)}`);

        tx = await myToken.connect(tokenReceiver).transferFrom(
            tokenOwner.address,
            tokenReceiver.address,
            value
        );

        //await tx.wait(2) //wait 2 blocks after tx is confirmed

        // Get ending balances
        tokenOwnerBalance = (await myToken.balanceOf(tokenOwner.address)).toString()
        tokenReceiverBalance = (await myToken.balanceOf(tokenOwner.address)).toString()

        console.log(`Ending tokenOwner balance: ${tokenOwnerBalance}`);
        console.log(`Ending tokenReceiver balance: ${tokenReceiverBalance}`);
    })
})