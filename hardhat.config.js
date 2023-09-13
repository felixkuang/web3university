require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      gas: 12000000,
      blockGasLimit: 80000000,
      allowUnlimitedContractSize: true
    },
    hardhat: {
      // See its defaults
    }
  },
  solidity: {
    version:"0.8.19",
    settings:{
      optimizer: {
        enabled: true,
        runs: 200,
      },
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};
