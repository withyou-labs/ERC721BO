import {expect} from "chai";
import dotenv from "dotenv";
import {ethers} from "hardhat";
import {OwnersMock} from "../typechain-types";
const { AddressZero } = ethers.constants;

dotenv.config();

describe("Owners", () => {

    const getContract = async () => {
        const factory = await ethers.getContractFactory("OwnersMock");
        return await factory.deploy() as OwnersMock;
    };

    describe("mintBatch", () => {
        describe("single user", async () => {
            const validate = async (contract: OwnersMock, values: string[]) => {
                for (let i = 0; i < values.length; i++) {
                    expect(await contract.ownerOf(i)).eq(values[i]);
                }
            };

            it("id = 0", async () => {
                const [user] = await ethers.getSigners();
                const contract = await getContract();
                await expect(contract.mintBatch(user.address, 0, 1)).not.reverted;
                await validate(contract, [user.address, AddressZero, AddressZero, AddressZero]);
            });
            it("id = 1", async () => {
                const [user] = await ethers.getSigners();
                const contract = await getContract();
                await expect(contract.mintBatch(user.address, 1, 1)).not.reverted;
                await validate(contract, [AddressZero, user.address, AddressZero, AddressZero]);
            });
            it("id = 2", async () => {
                const [user] = await ethers.getSigners();
                const contract = await getContract();
                await expect(contract.mintBatch(user.address, 2, 1)).not.reverted;
                await validate(contract, [AddressZero, AddressZero, user.address, AddressZero]);
            });
            it("id = 0, 2, 4", async () => {
                const [user] = await ethers.getSigners();
                const contract = await getContract();
                await expect(contract.mintBatch(user.address, 0, 1)).not.reverted;
                await expect(contract.mintBatch(user.address, 2, 1)).not.reverted;
                await expect(contract.mintBatch(user.address, 4, 1)).not.reverted;
                await validate(contract, [
                    user.address,
                    AddressZero,
                    user.address,
                    AddressZero,
                    user.address,
                    AddressZero
                ]);
            });
            it("id = 0, 1, 2, 5, 6, 7", async () => {
                const [user] = await ethers.getSigners();
                const contract = await getContract();
                await expect(contract.mintBatch(user.address, 0, 3)).not.reverted;
                await expect(contract.mintBatch(user.address, 5, 3)).not.reverted;
                await validate(contract, [
                    user.address,
                    user.address,
                    user.address,
                    AddressZero,
                    AddressZero,
                    user.address,
                    user.address,
                    user.address
                ]);
            });
        });

        describe("multiple user", async () => {
            const validate = async (contract: OwnersMock, values: string[]) => {
                for (let i = 0; i < values.length; i++) {
                    expect(await contract.ownerOf(i)).eq(values[i]);
                }
            };

            it("id = 0, 1, 2", async () => {
                const [user1, user2, user3] = await ethers.getSigners();
                const contract = await getContract();
                await expect(contract.mintBatch(user1.address, 0, 1)).not.reverted;
                await expect(contract.mintBatch(user2.address, 1, 1)).not.reverted;
                await expect(contract.mintBatch(user3.address, 2, 1)).not.reverted;
                await validate(contract, [user1.address, user2.address, user3.address, AddressZero]);
            });
            it("id = 1, 3, 5", async () => {
                const [user1, user2, user3] = await ethers.getSigners();
                const contract = await getContract();
                await expect(contract.mintBatch(user1.address, 1, 1)).not.reverted;
                await expect(contract.mintBatch(user2.address, 3, 1)).not.reverted;
                await expect(contract.mintBatch(user3.address, 5, 1)).not.reverted;
                await validate(contract, [
                    AddressZero,
                    user1.address,
                    AddressZero,
                    user2.address,
                    AddressZero,
                    user3.address,
                    AddressZero
                ]);
            });
            it("id = 1-2, 3-4, 5-6", async () => {
                const [user1, user2, user3] = await ethers.getSigners();
                const contract = await getContract();
                await expect(contract.mintBatch(user1.address, 1, 2)).not.reverted;
                await expect(contract.mintBatch(user2.address, 3, 2)).not.reverted;
                await expect(contract.mintBatch(user3.address, 5, 2)).not.reverted;
                await validate(contract, [
                    AddressZero,
                    user1.address,
                    user1.address,
                    user2.address,
                    user2.address,
                    user3.address,
                    user3.address,
                    AddressZero
                ]);
            });
            it("id = 0-3, 4-7, 8-11", async () => {
                const [user1, user2, user3] = await ethers.getSigners();
                const contract = await getContract();
                await expect(contract.mintBatch(user1.address, 0, 4)).not.reverted;
                await expect(contract.mintBatch(user2.address, 4, 4)).not.reverted;
                await expect(contract.mintBatch(user3.address, 8, 4)).not.reverted;
                await validate(contract, [
                    user1.address,
                    user1.address,
                    user1.address,
                    user1.address,
                    user2.address,
                    user2.address,
                    user2.address,
                    user2.address,
                    user3.address,
                    user3.address,
                    user3.address,
                    user3.address,
                    AddressZero
                ]);
            });
            it("id = 0-2, 4-6, 7-10", async () => {
                const [user1, user2, user3] = await ethers.getSigners();
                const contract = await getContract();
                await expect(contract.mintBatch(user1.address, 0, 3)).not.reverted;
                await expect(contract.mintBatch(user2.address, 4, 3)).not.reverted;
                await expect(contract.mintBatch(user3.address, 8, 3)).not.reverted;
                await validate(contract, [
                    user1.address,
                    user1.address,
                    user1.address,
                    AddressZero,
                    user2.address,
                    user2.address,
                    user2.address,
                    AddressZero,
                    user3.address,
                    user3.address,
                    user3.address,
                    AddressZero
                ]);
            });
            it("Overwrite 2 by 3 users after setting with id=0-7, 2 by 2", async () => {
                const [user1, user2, user3, user4] = await ethers.getSigners();
                const contract = await getContract();
                await expect(contract.mintBatch(user1.address, 0, 8)).not.reverted;
                await expect(contract.mintBatch(user2.address, 2, 2)).not.reverted;
                await expect(contract.mintBatch(user3.address, 3, 2)).not.reverted;
                await expect(contract.mintBatch(user4.address, 5, 2)).not.reverted;

                await validate(contract, [
                    user1.address,
                    user1.address,
                    user2.address,
                    user3.address,
                    user3.address,
                    user4.address,
                    user4.address,
                    user1.address,
                    AddressZero
                ]);
            });
        });
    });
    describe("transferTo", () => {
        const validate = async (contract: OwnersMock, values: string[]) => {
            for (let i = 0; i < values.length; i++) {
                expect(await contract.ownerOf(i)).eq(values[i]);
            }
        };

        it("id = 0", async () => {
            const [user1, user2] = await ethers.getSigners();
            const contract = await getContract();
            await expect(contract.mintBatch(user1.address, 0, 1)).not.reverted;
            await validate(contract, [user1.address, AddressZero, AddressZero, AddressZero]);
            await expect(contract.transferTo( 0, user2.address)).not.reverted;
            await validate(contract, [user2.address, AddressZero, AddressZero, AddressZero]);
        });

        it("Overwrite id = 0, 1, 2 from the beginning by user", async () => {
            const [user1, user2, user3, user4] = await ethers.getSigners();
            const contract = await getContract();
            await expect(contract.mintBatch(user1.address, 0, 3)).not.reverted;
            await validate(contract, [user1.address, user1.address, user1.address, AddressZero]);

            await expect(contract.transferTo( 0, user2.address)).not.reverted;
            await validate(contract, [user2.address, user1.address, user1.address, AddressZero]);

            await expect(contract.transferTo( 1, user3.address)).not.reverted;
            await validate(contract, [user2.address, user3.address, user1.address, AddressZero]);

            await expect(contract.transferTo( 2, user4.address)).not.reverted;
            await validate(contract, [user2.address, user3.address, user4.address, AddressZero]);
        });

        it("Overwrite id = 0, 1, 2 by one user from the end", async () => {
            const [user1, user2, user3, user4] = await ethers.getSigners();
            const contract = await getContract();
            await expect(contract.mintBatch(user1.address, 0, 3)).not.reverted;
            await validate(contract, [user1.address, user1.address, user1.address, AddressZero]);

            await expect(contract.transferTo( 2, user2.address)).not.reverted;
            await validate(contract, [user1.address, user1.address, user2.address, AddressZero]);

            await expect(contract.transferTo( 1, user3.address)).not.reverted;
            await validate(contract, [user1.address, user3.address, user2.address, AddressZero]);

            await expect(contract.transferTo( 0, user4.address)).not.reverted;
            await validate(contract, [user4.address, user3.address, user2.address, AddressZero]);
        });

        it("Overwrite id = 0, 1, 2, 3 with only 1 and 2 at once", async () => {
            const [user1, user2] = await ethers.getSigners();
            const contract = await getContract();
            await expect(contract.mintBatch(user1.address, 0, 4)).not.reverted;
            await validate(contract, [user1.address, user1.address, user1.address, user1.address, AddressZero]);

            await expect(contract.mintBatch( user2.address, 1, 2)).not.reverted;
            await validate(contract, [user1.address, user2.address, user2.address, user1.address, AddressZero]);
        });

        it("Overwrite id = 0, 1, 2, 3 with only 1 and 2 individually", async () => {
            const [user1, user2, user3] = await ethers.getSigners();
            const contract = await getContract();
            await expect(contract.mintBatch(user1.address, 0, 4)).not.reverted;
            await validate(contract, [user1.address, user1.address, user1.address, user1.address, AddressZero]);

            await expect(contract.transferTo(1, user2.address)).not.reverted;
            await expect(contract.transferTo(2, user3.address)).not.reverted;
            await validate(contract, [user1.address, user2.address, user3.address, user1.address, AddressZero]);
        });

        it("Overwrite id = 0, 1, 2 individually by 0", async () => {
            const [user1, user2] = await ethers.getSigners();
            const contract = await getContract();
            await expect(contract.mintBatch(user1.address, 0, 3)).not.reverted;
            await validate(contract, [user1.address, user1.address, user1.address, AddressZero]);

            await expect(contract.transferTo(0, user2.address)).not.reverted;
            await validate(contract, [user2.address, user1.address, user1.address, AddressZero]);
        });
    });
    describe("reverts", () => {
        it("ERC721BO Owners: count must be less than 2^32", async () => {
            const [user1] = await ethers.getSigners();
            const contract = await getContract();
            const count = 2 ** 32;
            await expect(contract.mintBatch(user1.address, 0, count - 1)).not.reverted;
            await expect(contract.mintBatch(user1.address, 0, count))
                .revertedWith("ERC721BO Owners: count must be less than 2^32");
        });
    });
});
