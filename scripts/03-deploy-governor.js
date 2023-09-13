const path = require("path");

async function main() {
    const [executor, proposer, admin, voter1, voter2, voter3, voter4, voter5] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", executor.address);
    // Deploy governanace
    const quorum = 5 // Percentage of total supply of tokens needed to aprove proposals (5%)
    const votingDelay = 0 // How many blocks after proposal until voting becomes active
    const votingPeriod = 5 // How many blocks to allow voters to vote


    const governance = await ethers.deployContract("Governance",["0x5fbdb2315678afecb367f032d93f642f64180aa3", "0x0165878A594ca255338adfa4d48449f69242Eb8F", quorum, votingDelay, votingPeriod]);
    console.log("Governance address:", governance.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });