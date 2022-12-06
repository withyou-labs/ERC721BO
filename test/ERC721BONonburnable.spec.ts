import {expect} from "chai";
import dotenv from "dotenv";
import {ethers} from "hardhat";
import {ERC721BONonburnableMock, ERC721ReceiverMock} from "../typechain-types";

dotenv.config();

const ERC721_NAME = process.env.ERC721_NAME || "hogehoge";
const ERC721_SYMBOL = process.env.ERC721_SYMBOL || "";

describe("ERC721BONonburnable", () => {

    const getContract = async () => {
        const factory = await ethers.getContractFactory("ERC721BONonburnableMock");
        return await factory.deploy(ERC721_NAME, ERC721_SYMBOL) as ERC721BONonburnableMock;
    };

    describe("reverts", () => {
        describe('_safeReMint', async () => {
            it('TransferToNonERC721ReceiverImplementer', async () => {
                const contractB = await ethers.getContractFactory("ERC721BONonburnableMock");
                let erc721BO = await contractB.deploy(ERC721_NAME, ERC721_SYMBOL) as ERC721BONonburnableMock;

                const [, user1] = await ethers.getSigners();
                await expect(erc721BO.mint(user1.address, 1)).not.reverted;

                const factory = await ethers.getContractFactory("ERC721ReceiverMock");
                const receiver = await factory.deploy("0x00000002", 0) as ERC721ReceiverMock;
                await expect(erc721BO.safeReMint(receiver.address, 0))
                    .be.revertedWith("Not supported");
            });
        });
    });

    it('normal operation', async () => {
        const contractB = await ethers.getContractFactory("ERC721BONonburnableMock");
        let erc721BO = await contractB.deploy(ERC721_NAME, ERC721_SYMBOL) as ERC721BONonburnableMock;

        const [, user1, user2, user3, user4] = await ethers.getSigners();
        await expect(erc721BO.mint(user1.address, 1)).not.reverted;
        await expect(erc721BO.safeMint(user1.address, 1)).not.reverted;
        await expect(erc721BO.mint(user1.address, 1)).not.reverted;
        await expect(erc721BO.safeMint(user2.address, 1)).not.reverted;
        await expect(erc721BO.safeMint(user2.address, 1)).not.reverted;
        await expect(erc721BO.safeMint(user3.address, 1)).not.reverted;

        expect(await erc721BO.balanceOf(user1.address)).eq(3);
        expect(await erc721BO.balanceOf(user2.address)).eq(2);
        expect(await erc721BO.balanceOf(user3.address)).eq(1);
        expect(await erc721BO.balanceOf(user4.address)).eq(0);

        expect(await erc721BO.ownerOf(0)).eq(user1.address);
        expect(await erc721BO.ownerOf(1)).eq(user1.address);
        expect(await erc721BO.ownerOf(2)).eq(user1.address);

        //user1 -> user4
        await expect(erc721BO.connect(user1).transferFrom(user1.address, user4.address, 0)).not.reverted;

        //user3 -> user2
        await expect(erc721BO.connect(user3).transferFrom(user3.address, user2.address, 5)).not.reverted;

        expect(await erc721BO.balanceOf(user1.address)).eq(2);
        expect(await erc721BO.balanceOf(user2.address)).eq(3);
        expect(await erc721BO.balanceOf(user3.address)).eq(0);
        expect(await erc721BO.balanceOf(user4.address)).eq(1);

        //user4 -> user3
        await expect(erc721BO.connect(user4).transferFrom(user4.address, user3.address, 0)).not.reverted;

        //user2 -> user1
        await expect(erc721BO.connect(user2).transferFrom(user2.address, user1.address, 3)).not.reverted;

        expect(await erc721BO.balanceOf(user1.address)).eq(3);
        expect(await erc721BO.balanceOf(user2.address)).eq(2);
        expect(await erc721BO.balanceOf(user3.address)).eq(1);
        expect(await erc721BO.balanceOf(user4.address)).eq(0);
    });

    describe("balanceOf and totalSupply", async () => {
        let token: ERC721BONonburnableMock;
        beforeEach(async () => {
            token = await getContract();
        });

        const safeSupplyAndAssert = (i: number, totalCount: number, batchCount: number) => {
            it(`${totalCount} by ${batchCount} mint`, async () => {
                const users = await ethers.getSigners();
                const to = users[i].address;

                const count = totalCount / batchCount;
                for (let i = 0; i < count; i++) {
                    await token.safeMint(to, batchCount);
                    expect(await token.balanceOf(to)).eq(batchCount * (i + 1));
                    expect(await token.totalSupply()).eq(batchCount * (i + 1));
                }
            });
        };

        describe("mint to 512 by multiples of 2", async () => {
            const totalCount = 512;
            for (let i = 0, batchCount = totalCount; batchCount >= 8; batchCount /= 2, i++) {
                safeSupplyAndAssert(i, totalCount, batchCount);
            }
        });

        describe("mint to 640 by multiples of 5", async () => {
            const totalCount = 640;
            for (let i = 0, batchCount = totalCount; batchCount >= 10; batchCount /= 2, i++) {
                safeSupplyAndAssert(i, totalCount, batchCount);
            }
        });

        it("mint 512 and burn 255, 256, 510, 511", async () => {
            const count = 512;
            const [user1] = await ethers.getSigners();
            await token.safeMint(user1.address, count);

            const burnAndAssert = async (i: number) => {
                await expect(token.burn(i)).be.revertedWith("Not supported");
                expect(await token.balanceOf(user1.address)).eq(count);
                expect(await token.totalSupply()).eq(count);
            };

            await burnAndAssert(255);
            await burnAndAssert(256);
            await burnAndAssert(510);
            await burnAndAssert(511);
        });
    });

    describe("ownerOf", async () => {
        const tokenCount = 64;
        let token: ERC721BONonburnableMock;
        beforeEach(async () => {
            token = await getContract();
        });

        describe("mint every 1~5", async () => {
            const burnSpanMax = 5;
            const totalCount = 32;

            async function safeSupplyAndAssert(i: number) {
                const users = await ethers.getSigners();
                const user = users[i];

                await token.safeMint(user.address, tokenCount);
                expect(await token.balanceOf(user.address)).eq(tokenCount);
                expect(await token.totalSupply()).eq(tokenCount);

                //search all
                for (let j = 0; j < tokenCount; j++) {
                    expect(await token.ownerOf(j)).be.eq(user.address);
                }
                return {users, user};
            }

            for (let i = 1; i <= burnSpanMax; i++) {
                it(`mint ${totalCount} and transfer every ${i} to another user`, async () => {
                    const {users, user} = await safeSupplyAndAssert(i);
                    let balances: { [key: string]: number } = {};

                    //transfer
                    balances[user.address] = tokenCount;
                    for (let j = 0; j < tokenCount; j++) {
                        if (j % i == 0) {
                            const to = users[i + 1].address;
                            await token.connect(user)["safeTransferFrom(address,address,uint256)"](user.address, to, j);
                            balances[to] = balances[to] ? balances[to] + 1 : 1;
                            balances[user.address]--;
                        }
                    }

                    //verify the owner after the transfer
                    for (let j = 0; j < tokenCount; j++) {
                        if (j % i == 0) {
                            const to = users[i + 1].address;
                            expect(await token.ownerOf(j)).be.eq(to);
                        } else {
                            expect(await token.ownerOf(j)).be.eq(user.address);
                        }
                    }

                    //check balance
                    for (const to in balances) {
                        expect(await token.balanceOf(to)).be.eq(balances[to]);
                    }

                    //search out range
                    for (let j = tokenCount; j < tokenCount + 3; j++) {
                        await expect(token.ownerOf(j)).be.revertedWithCustomError(token, "NonexistentToken");
                    }
                });
            }
        });
    });

    describe("boundary value", async () => {
        const tokenCount = 1030;
        const tokenIdList = [
            0, 1,
            254, 255, 256, 257,
            511, 512, 513, 514,
            767, 768, 769, 770,
            1022, 1023, 1024, 1025, 1026
        ];
        const nonExistsTokenIdList = [1030, 1031, 1032];
        let token: ERC721BONonburnableMock;

        beforeEach(async () => {
            token = await getContract();
            const [user1] = await ethers.getSigners();
            await token.safeMint(user1.address, tokenCount);
        });

        describe("ERC721Enumerable", async () => {
            describe("tokenOfOwnerByIndex", async () => {
                describe("Index = TokenId", async () => {
                    describe("normal", async () => {
                        tokenIdList.forEach((tokenId) => {
                            it(`${tokenId}`, async () => {
                                const index = tokenId
                                const [user1] = await ethers.getSigners();
                                expect(await token.tokenOfOwnerByIndex(user1.address, index)).eq(tokenId);
                            });
                        });
                    });

                    describe("reverts", async () => {
                        nonExistsTokenIdList.forEach((tokenId) => {
                            it(`${tokenId}`, async () => {
                                const [user1] = await ethers.getSigners();
                                await expect(token.tokenOfOwnerByIndex(user1.address, tokenId))
                                    .be.revertedWithCustomError(token, "IndexOutOfRange");
                            });
                        });
                    });
                });

                describe("Index > TokenId", async () => {
                    //NOP
                });

                describe("Index < TokenId", async () => {
                    const burntTokenIdList = [
                        1,
                        255,
                        513,
                        768,
                        1025
                    ];

                    beforeEach(async () => {
                        const [user1, user2] = await ethers.getSigners();
                        for (let i = 0; i < burntTokenIdList.length; i++)
                            await token.connect(user1)["safeTransferFrom(address,address,uint256)"](user1.address, user2.address, burntTokenIdList[i]);
                    });

                    describe("normal", async () => {
                        tokenIdList.filter(x => !burntTokenIdList.includes(x)).forEach((tokenId) => {
                            it(`${tokenId}`, async () => {
                                const index = tokenId - burntTokenIdList.filter(x => x < tokenId).length;
                                const [user1] = await ethers.getSigners();
                                expect(await token.tokenOfOwnerByIndex(user1.address, index)).eq(tokenId);
                            });
                        });

                        burntTokenIdList.forEach((tokenId, index) => {
                            it(`${tokenId}`, async () => {
                                const [,user2] = await ethers.getSigners();
                                expect(await token.tokenOfOwnerByIndex(user2.address, index)).eq(tokenId);
                            });
                        });
                    });

                    describe("reverts", async () => {
                        nonExistsTokenIdList.forEach((tokenId) => {
                            it(`${tokenId}`, async () => {
                                const [user1] = await ethers.getSigners();
                                await expect(token.tokenOfOwnerByIndex(user1.address, tokenId))
                                    .be.revertedWithCustomError(token, "IndexOutOfRange");
                            });
                        });
                    });
                });
            });

            describe("tokenByIndex", async () => {
                describe("Index = TokenId", async () => {
                    describe("normal", async () => {
                        tokenIdList.forEach((tokenId) => {
                            it(`${tokenId}`, async () => {
                                expect(await token.tokenByIndex(tokenId)).eq(tokenId);
                            });
                        });
                    });

                    describe("reverts", async () => {
                        nonExistsTokenIdList.forEach((tokenId) => {
                            it(`${tokenId}`, async () => {
                                await expect(token.tokenByIndex(tokenId)).be.revertedWithCustomError(token, "IndexOutOfRange");
                            });
                        });
                    });
                });
            });
        });

        describe("_exists", async () => {
            describe("true", async () => {
                const existsAndAssert = (i: number) => {
                    it(`exists(${i})`, async () => {
                        expect(await token.exists(i)).be.true;
                    });
                };
                for (const key in tokenIdList) {
                    existsAndAssert(tokenIdList[key]);
                }
            });

            describe("false", async () => {
                const existsAndRevert = (i: number) => {
                    it(`exists(${i})`, async () => {
                        expect(await token.exists(i)).be.false;
                    });
                };

                for (const key in nonExistsTokenIdList) {
                    existsAndRevert(nonExistsTokenIdList[key]);
                }
            });
        });
    });

    describe("max mint", async () => {
        let token: ERC721BONonburnableMock;

        beforeEach(async () => {
            token = await getContract();
        });

        it("65536", async () => {
            const [user1] = await ethers.getSigners();
            for (let i = 0; i < 256; i++) {
                await token.safeMint(user1.address, 256);
            }
            expect(await token.totalSupply()).be.eq(65536); //256 page * 256 bit = 65536
        });

        it("65537 (revert)", async () => {
            const [user1] = await ethers.getSigners();
            for (let i = 0; i < 256; i++) {
                await token.safeMint(user1.address, 256);
            }
            await expect(token.safeMint(user1.address, 1))
                .be.revertedWithCustomError(token, "ExceededMaxOfMint");
        });
    });

    describe("not mint", async () => {
        let token: ERC721BONonburnableMock;

        beforeEach(async () => {
            token = await getContract();
        });

        it("IndexOutOfRange", async () => {
            const [user1] = await ethers.getSigners();
            await expect(token.tokenOfOwnerByIndex(user1.address, 0))
                .be.revertedWithCustomError(token, "IndexOutOfRange");

            await expect(token.tokenByIndex(10))
                .be.revertedWithCustomError(token, "IndexOutOfRange");
        });
    });
});
