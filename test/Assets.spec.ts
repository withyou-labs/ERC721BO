import {expect} from "chai";
import dotenv from "dotenv";
import {ethers} from "hardhat";
import {AssetsMock} from "../typechain-types";
import {BigNumber} from "@ethersproject/bignumber";
const { MaxUint256, Zero } = ethers.constants;

dotenv.config();

describe("Assets", async () => {

    const getContract = async () => {
        const factory = await ethers.getContractFactory("AssetsMock");
        return await factory.deploy() as AssetsMock;
    };


    describe("set/unset", () => {
        const values = [
            0,
            1,
            2,
            254,
            255,
            256,
            257,
            510,
            511,
            512,
            513,
            514,
        ];

        for (const value of values) {
            it(`${value}`, async () => {
                const users = (await ethers.getSigners()).slice(0, 3);
                const contract = await getContract();

                for (const user of users) {
                    //false
                    expect(await contract.get(user.address, value)).false;

                    //false -> true
                    await expect(contract.set(user.address, value)).not.reverted;
                    expect(await contract.get(user.address, value)).true;

                    //true -> true
                    await expect(contract.set(user.address, value)).not.reverted;
                    expect(await contract.get(user.address, value)).true;

                    //true -> false
                    await expect(contract.unset(user.address, value)).not.reverted;
                    expect(await contract.get(user.address, value)).false;

                    //false -> false
                    await expect(contract.unset(user.address, value)).not.reverted;
                    expect(await contract.get(user.address, value)).false;
                }
            });
        }
    });

    describe("setRange/unsetRange", () => {
        const validatePages = async (contract: AssetsMock, owner:string, values: number[] | BigNumber[]) => {
            for (let i = 0; i < values.length; i++) {
                expect(await contract.page(owner, i)).eq(values[i]);
            }
        };

        it("0", async () => {
            const [user] = await ethers.getSigners();
            const contract = await getContract();

            await expect(contract.setRange(user.address, 0, 0)).not.reverted;
            expect(await contract.page(user.address, 0)).eq(0);

            await expect(contract.unsetRange(user.address, 0, 0)).not.reverted;
            expect(await contract.page(user.address, 0)).eq(0);
        });

        it("1bit", async () => {
            const [user] = await ethers.getSigners();
            const contract = await getContract();

            await expect(contract.setRange(user.address, 0, 1)).not.reverted;
            await validatePages(contract, user.address, [1, 0, 0]);

            await expect(contract.unsetRange(user.address, 0, 1)).not.reverted;
            await validatePages(contract, user.address, [0, 0, 0]);
        });

        it("2page (256bit * 2)", async () => {
            const [user] = await ethers.getSigners();
            const contract = await getContract();

            //set flags for 2page
            await expect(contract.setRange(user.address, 0, 512)).not.reverted;
            await validatePages(contract, user.address, [MaxUint256, MaxUint256, Zero]);

            //unset flags for 1page
            await expect(contract.unsetRange(user.address, 0, 256)).not.reverted;
            await validatePages(contract, user.address, [Zero, MaxUint256, Zero]);

            //unset flags for all
            await expect(contract.unsetRange(user.address, 0, 512)).not.reverted;
            await validatePages(contract, user.address, [0, 0, 0]);
        });

        it("2page + 1bit", async () => {
            const [user] = await ethers.getSigners();
            const contract = await getContract();

            //set flags for 2page + 1bit
            await expect(contract.setRange(user.address, 0, 513)).not.reverted;
            await validatePages(contract, user.address, [MaxUint256, MaxUint256, BigNumber.from(1)]);

            //unset flags for 2page
            await expect(contract.unsetRange(user.address, 256, 256)).not.reverted;
            await validatePages(contract, user.address, [MaxUint256, Zero, BigNumber.from(1)]);

            //unset flags for all
            await expect(contract.unsetRange(user.address, 0, 513)).not.reverted;
            await validatePages(contract, user.address, [0, 0, 0]);
        });

        it("2page + 2bit", async () => {
            const [user] = await ethers.getSigners();
            const contract = await getContract();

            //set flags for 2page + 2bit
            await expect(contract.setRange(user.address, 0, 514)).not.reverted;
            await validatePages(contract, user.address, [MaxUint256, MaxUint256, BigNumber.from(3)]);

            //Unset flag for half of 2page
            await expect(contract.unsetRange(user.address, 384, 128)).not.reverted;
            await validatePages(contract, user.address, [MaxUint256, MaxUint256.shr(128), BigNumber.from(3)]);

            //unset flags for all
            await expect(contract.unsetRange(user.address, 0, 514)).not.reverted;
            await validatePages(contract, user.address, [0, 0, 0]);
        });

        it("4, 5, 6bit of 3page", async () => {
            const [user] = await ethers.getSigners();
            const contract = await getContract();

            //set flags for 4~6bit of 3page
            await expect(contract.setRange(user.address, 516, 3)).not.reverted;
            await validatePages(contract, user.address, [Zero, Zero, BigNumber.from(112)]);

            //unset flags for 5bit of 3page
            await expect(contract.unsetRange(user.address, 517, 1)).not.reverted;
            await validatePages(contract, user.address, [Zero, Zero, BigNumber.from(80)]);

            //unset flags for all
            await expect(contract.unsetRange(user.address, 516, 1)).not.reverted;
            await expect(contract.unsetRange(user.address, 518, 1)).not.reverted;
            await validatePages(contract, user.address, [0, 0, 0]);
        });
    });

    describe("revert", () => {
        it("PageOutOfRange", async () => {
            const [user] = await ethers.getSigners();
            const contract = await getContract();
            await expect(contract.page(user.address, 2**32 + 1))
                .revertedWith("ERC721BO Assets: pageNo must be less than 2^32");
        });

        it("setRange overflow", async () => {
            const [user] = await ethers.getSigners();
            const contract = await getContract();
            await expect(contract.setRange(user.address, MaxUint256, 1)).revertedWithPanic("0x11");
            await expect(contract.setRange(user.address, MaxUint256.sub(1), 2)).revertedWithPanic("0x11");
            await expect(contract.setRange(user.address, MaxUint256.sub(1), 1))
                    .revertedWith("ERC721BO Assets: pageNo must be less than 2^32");
        });

        it("unsetRange overflow", async () => {
            const [user] = await ethers.getSigners();
            const contract = await getContract();
            await expect(contract.unsetRange(user.address, MaxUint256, 1)).revertedWithPanic("0x11");
            await expect(contract.unsetRange(user.address, MaxUint256.sub(1), 2)).revertedWithPanic("0x11");
            await expect(contract.unsetRange(user.address, MaxUint256.sub(1), 1))
                .revertedWith("ERC721BO Assets: pageNo must be less than 2^32");
        });
    });
});
