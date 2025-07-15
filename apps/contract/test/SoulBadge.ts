import { expect } from "chai"
import { ethers } from "hardhat"
import hre from 'hardhat'
import type { SoulBadge } from "../typechain-types";
import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers'
import { Block } from "ethers";

describe("SoulBadge 完整测试套件", function () {
    let SoulBadge: SoulBadge;
    let owner: HardhatEthersSigner, buyer: HardhatEthersSigner, ygg: HardhatEthersSigner;

    beforeEach(async () => {
        // 获取测试账户
        [owner, buyer, ygg] = await ethers.getSigners()

        // 部署合约
        const SoulBadgeFactory = await ethers.getContractFactory('SoulBadge')
        SoulBadge = await SoulBadgeFactory.deploy()
        await SoulBadge.waitForDeployment()
    })
    describe("基础功能", function () {
        // 测试1：检查合约部署
        it("应该正确设置合约拥有者", async function () {
            expect(await SoulBadge.owner()).to.equal(owner.address);
        });

        it("应该正确获取八字cnt", async function () {
            expect(await SoulBadge.sameBaziCnt('戊寅 癸亥 癸酉 己未')).to.equal(0);
        });

        it("应该正确铸造徽章", async function () {
            // 获取当前时间戳
            // let currentTimestamp1 = (await ethers.provider.getBlock("latest"))?.timestamp;
            // console.log("铸造前时间戳:", currentTimestamp1);
            // const futureTimestamp = BigInt(Math.floor(new Date().getTime() / 1000));
            // await hre.network.provider.send("evm_setNextBlockTimestamp", [Number(futureTimestamp)]);
            // // 获取当前区块时间戳
            // await ethers.provider.send("evm_mine", []); // 挖一个新区块，使时间变化生效
            // const currentTimestamp = (await ethers.provider.getBlock('latest'))?.timestamp;
            // console.log("铸造后时间戳:", currentTimestamp); // print 1752483757
            const _birthDate = 911715254n;
            await SoulBadge.mintSoulBadge('戊寅 癸亥 癸酉 己未', 1, 116, 23, _birthDate, 'bafkreicuu7xbqe6cfwk42n2bycjgzpolj46wd256mkq4es7osm32ewc2ne')
            expect(await SoulBadge.getTokenIdCounter()).to.equal(1);
        });
    });
});
