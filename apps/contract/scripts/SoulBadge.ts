import { ethers } from "hardhat"

(async () => {
    const SoulBadgeFactory = await ethers.getContractFactory('SoulBadge')
    const sb = await SoulBadgeFactory.deploy()
    await sb.waitForDeployment()
    const contractAddress = await sb.getAddress()
    console.log("Contract Address:", contractAddress);
})()
    .then()
    .catch(err => {
        console.log(err);
        process.exit(1)
    })