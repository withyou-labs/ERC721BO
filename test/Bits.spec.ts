import {expect} from "chai";
import dotenv from "dotenv";
import {ethers} from "hardhat";
import {BitsMock} from "../typechain-types";
import {BigNumber} from "@ethersproject/bignumber";
import {beforeEach} from "mocha";
const { MaxUint256 } = ethers.constants;

dotenv.config();

describe("Bits", async () => {

    let contract: BitsMock;

    beforeEach(async () => {
        const factory = await ethers.getContractFactory("BitsMock");
        contract = await factory.deploy() as BitsMock;
    });

    describe("popCount", () => {
        it("0", async () => {
            expect(await contract.popCount(0)).equal(0);
        });
        it("1", async () => {
            expect(await contract.popCount(1)).equal(1);
        });
        it("2", async () => {
            expect(await contract.popCount(2)).equal(1);
        });
        it("3", async () => {
            expect(await contract.popCount(3)).equal(2);
        });
        it("MaxUint256", async () => {
            expect(await contract.popCount(MaxUint256)).equal(256);
        });
        describe("shift 128 bits by 1 bit", () => {
            for (let i = 0; i <= 128; i++) {
                it(`${i}`, async () => {
                    expect(await contract.popCount(MaxUint256.shr(128).shl(i))).equal(128);
                });
            }
        });
    });

    describe("indexOf", () => {
        it("0", async () => {
            for (let i = 0; i < 256; i++) {
                expect(await contract.indexOf(0, i)).equal(MaxUint256);
            }
        });

        describe("0 ~ 255", () => {
            for (let i = 0; i < 256; i++) {
                it(`${i}`, async () => {
                    expect(await contract.indexOf(MaxUint256, i)).equal(i);
                });
            }
        });

        describe("shift 128 bits by 1 bit", () => {
            for (let i = 0; i <= 128; i++) {
                it(`${i}`, async () => {
                    for (let j = 0; j < 128; j++) {
                        const value = MaxUint256.shr(128).shl(i);
                        expect(await contract.indexOf(value, j)).equal(j + i);
                    }
                });
            }
        });

        describe("shift left by 1 bit", () => {
            let number = BigNumber.from(1);
            for (let i = 0; !number.isZero(); i++) {
                let n = number;
                it(`${i}`, async () => {
                    expect(await contract.indexOf(n, 0)).equal(i);
                });
                number = number.shl(1);
                if (number.gt(MaxUint256)) {
                    break;
                }
            }
        });

        describe("reverts", () => {
            it('Bits: index out of bounds', async () => {
                await expect(contract.indexOf(MaxUint256, 255)).not.reverted;
                await expect(contract.indexOf(MaxUint256, 256)).revertedWith("Bits: index out of bounds");
                await expect(contract.indexOf(MaxUint256, 300)).revertedWith("Bits: index out of bounds");
                await expect(contract.indexOf(MaxUint256, 1024)).revertedWith("Bits: index out of bounds");
                await expect(contract.indexOf(MaxUint256, 2048)).revertedWith("Bits: index out of bounds");
            });
        });
    });
});
