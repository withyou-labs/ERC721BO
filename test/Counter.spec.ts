import {expect} from "chai";
import dotenv from "dotenv";
import {ethers} from "hardhat";
import {CounterMock} from "../typechain-types";
import {beforeEach} from "mocha";
const { MaxUint256 } = ethers.constants;

dotenv.config();

describe("Counter", async () => {

    let contract: CounterMock;

    beforeEach(async () => {
        const factory = await ethers.getContractFactory("CounterMock");
        contract = await factory.deploy() as CounterMock;
    });

    describe("increments", () => {
        it("increment 1", async () => {
            await contract.increment(1);
            expect(await contract.current()).equal(1);
        });
        it("increment 2", async () => {
            await contract.increment(2);
            expect(await contract.current()).equal(2);
        });
        it("increment 3", async () => {
            await contract.increment(3);
            expect(await contract.current()).equal(3);
        });
    });

    describe("revert", () => {
        it("ERC721BO Counter: count must be greater than 0", async () => {
            await expect(contract.increment(0)).revertedWith("Counter: count must be greater than 0");
        });
        it("overflow", async () => {
            await expect(contract.increment(1)).not.reverted;
            console.log(await contract.current());
            await expect(contract.increment(MaxUint256)).revertedWithPanic("0x11");
            console.log(await contract.current());
            await expect(contract.increment(MaxUint256.sub(2))).not.reverted;
            console.log(await contract.current());
            await expect(contract.increment(1)).revertedWith("Counter: overflow");
            await expect(contract.increment(2)).revertedWithPanic("0x11");
            await expect(contract.increment(3)).revertedWithPanic("0x11");
        });
    });
});
