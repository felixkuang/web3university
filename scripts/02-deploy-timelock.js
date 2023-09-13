async function main() {
    const [executor, proposer, admin, voter1, voter2, voter3, voter4, voter5] = await ethers.getSigners();
    const minDelay = 1; // How long do we have to wait until we can execute after a passed proposal

    console.log(`minDelay ${minDelay}`)
    console.log(`proposer ${proposer.address}`)
    console.log(`executor ${executor.address}`)
    console.log(`admin ${admin.address}`)

    // In addition to passing minDelay, we also need to pass 2 arrays.
    // The 1st array contains addresses of those who are allowed to make a proposal.
    // The 2nd array contains addresses of those who are allowed to make executions.

    const timelock = await ethers.deployContract("TimeLock",[minDelay,[proposer.address], [executor.address], admin.address]);
    console.log("Timelock address:", timelock.target);

    // const TimeLock = await ethers.getContractFactory("TimeLock");
    // const timeLock = await TimeLock.deploy(minDelay,[proposer], [executor], admin);

    // console.log("TimeLock address:", timeLock.target);

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });