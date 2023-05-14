import {expect} from "chai";
import dotenv from "dotenv";
import {ethers} from "hardhat";
import {AccessControlMock, ERC721BOMock, ERC721ReceiverMock} from "../typechain-types";
import {SignerWithAddress as Signer} from "@nomiclabs/hardhat-ethers/signers";
import {ContractTransaction} from "ethers";
const { constants, makeInterfaceId } = require('@openzeppelin/test-helpers/index');
const { ZERO_ADDRESS } = constants;

dotenv.config();

const RECEIVER_MAGIC_VALUE = '0x150b7a02';
const Error = {
    None: 0,
    RevertWithMessage: 1,
    RevertWithoutMessage: 2,
    Panic: 3
}

const ERC721_NAME = process.env.ERC721_NAME || "hogehoge";
const ERC721_SYMBOL = process.env.ERC721_SYMBOL || "";
const ERC721_BASE_URI = process.env.ERC721_BASE_URI || "";

describe("ERC721", async () => {

    let token: ERC721BOMock;
    let receiver: ERC721ReceiverMock;
    let dummy: Signer;
    let owner: Signer;
    let newOwner: Signer;
    let other: Signer;
    let approved: Signer;
    let anotherApproved: Signer;
    let operator: Signer;

    const firstTokenId = 3;
    const secondTokenId = 4;
    const fourthTokenId = 5;
    const nonExistentTokenId = 6;

    beforeEach(async () => {
        token = await (await ethers.getContractFactory("ERC721BOMock")).deploy(ERC721_NAME, ERC721_SYMBOL, ERC721_BASE_URI) as ERC721BOMock;
        receiver = await (await ethers.getContractFactory("ERC721ReceiverMock")).deploy(RECEIVER_MAGIC_VALUE, Error.None) as ERC721ReceiverMock;

        const users = await ethers.getSigners();
        dummy = users[0];
        owner = users[1];
        newOwner = users[2];
        other = users[3];
        approved = users[4];
        anotherApproved = users[5];
        operator = users[6];
    });

    it("check name", async () => {
        const contract = await ethers.getContractFactory("ERC721BOMock");
        const token = await contract.deploy(ERC721_NAME, ERC721_SYMBOL, ERC721_BASE_URI) as ERC721BOMock;
        await token.deployed();
        expect(await token.name()).equal(ERC721_NAME);
        expect(await token.symbol()).equal(ERC721_SYMBOL);
    });

    context('Contract interface', async () => {
        const INTERFACES: any = {
            ERC165: [
                'supportsInterface(bytes4)',
            ],
            ERC721: [
                'balanceOf(address)',
                'ownerOf(uint256)',
                'approve(address,uint256)',
                'getApproved(uint256)',
                'setApprovalForAll(address,bool)',
                'isApprovedForAll(address,address)',
                'transferFrom(address,address,uint256)',
                'safeTransferFrom(address,address,uint256)',
                'safeTransferFrom(address,address,uint256,bytes)',
            ],
            ERC721Enumerable: [
                'totalSupply()',
                'tokenOfOwnerByIndex(address,uint256)',
                'tokenByIndex(uint256)',
            ],
            ERC721Metadata: [
                'name()',
                'symbol()',
                'tokenURI(uint256)',
            ],
            ERC2981: [
                'royaltyInfo(uint256,uint256)',
            ],
            AccessControl: [
                'hasRole(bytes32,address)',
                'getRoleAdmin(bytes32)',
                'grantRole(bytes32,address)',
                'revokeRole(bytes32,address)',
                'renounceRole(bytes32,address)',
            ],

        };

        const INTERFACE_IDS: any = {};
        const FN_SIGNATURES: any = {};
        let contractUnderTest: any = {};
        let inheritedToken: AccessControlMock;

        for (const k of Object.getOwnPropertyNames(INTERFACES)) {
            INTERFACE_IDS[k] = makeInterfaceId.ERC165(INTERFACES[k]);
            for (const fnName of INTERFACES[k]) {
                // the interface id of a single function is equivalent to its function signature
                FN_SIGNATURES[fnName] = makeInterfaceId.ERC165([fnName]);
            }
        }

        beforeEach(async () => {
            contractUnderTest = token;
	    inheritedToken = await (await ethers.getContractFactory("AccessControlMock")).deploy() as AccessControlMock;
        });

        for (const k of ["ERC165", "ERC721", "ERC721Enumerable", "ERC721Metadata", /*"ERC2981"*/]) {
            const interfaceId = INTERFACE_IDS[k];
            describe(k, () => {
                describe('ERC165\'s supportsInterface(bytes4)', () => {
		    //ERC721BO
                    it('uses less than 30k gas', async () => {
                        const gas = await contractUnderTest.estimateGas.supportsInterface(interfaceId);
                        expect(gas.toNumber()).be.lte(30000);
                    });

                    it('claims support', async () => {
                        expect(await contractUnderTest.supportsInterface(interfaceId)).equal(true);
                    });

		    //Inherited
		    it('uses less than 30k gas', async () => {
                        const gas = await inheritedToken.estimateGas.supportsInterface(interfaceId);
                        expect(gas.toNumber()).be.lte(30000);
                    });

                    it('claims support', async () => {
                        expect(await inheritedToken.supportsInterface(interfaceId)).equal(true);
                    });
                });

                for (const fnName of INTERFACES[k]) {
                    const fnSig = FN_SIGNATURES[fnName];
                    describe(fnName, () => {
                        it('has to be implemented', () => {
                            expect(contractUnderTest.interface.fragments.filter((fn: any) => {
                                if (fn.name === null)
                                    return false;

                                return ethers.utils.Interface.getSighash(fn) === fnSig;
                            }).length).equal(1);

                            expect(inheritedToken.interface.fragments.filter((fn: any) => {
                                if (fn.name === null)
                                    return false;

                                return ethers.utils.Interface.getSighash(fn) === fnSig;
                            }).length).equal(1);

                        });
                    });
                }
            });
        }

        //AccessControl
        describe('AccessControl', () => {
            const interfaceId = makeInterfaceId.ERC165(INTERFACES["AccessControl"]);
            it('uses less than 30k gas', async () => {
                const gas = await inheritedToken.estimateGas.supportsInterface(interfaceId);
                expect(gas.toNumber()).be.lte(30000);
            });

            it('claims support', async () => {
                expect(await inheritedToken.supportsInterface(interfaceId)).equal(true);
            });
        });

    });

    context('with minted tokens', () => {

        beforeEach(async () => {
            await token["safeMint(address,uint256)"](dummy.address, 3);
            await token["safeMint(address,uint256)"](owner.address, 1);
            await token["safeMint(address,uint256)"](owner.address, 1);
        });

        describe('balanceOf', () => {
            context('when the given address owns some tokens', () => {
                it('returns the amount of tokens owned by the given address', async () => {
                    expect(await token.balanceOf(owner.address)).be.eq(2);
                });
            });

            context('when the given address does not own any tokens', () => {
                it('returns 0', async () => {
                    expect(await token.balanceOf(owner.address)).be.eq(2);
                    expect(await token.balanceOf(other.address)).be.eq(0);
                });
            });

            context('when querying the zero address', () => {
                it('throws', async () => {
                    const t = token.balanceOf(ZERO_ADDRESS);
                    await expect(t).be.revertedWithCustomError(token, "InvalidAddress");
                });
            });
        });

        describe('ownerOf', () => {
            const tokenId = firstTokenId;
            context('when the given token ID was tracked by this token', () => {
                it('returns the owner of the given token ID', async () => {
                    expect(await token.ownerOf(tokenId)).be.equal(owner.address);
                });
            });

            context('when the given token ID was not tracked by this token', () => {
                const tokenId = nonExistentTokenId;

                it('reverts', async () => {
                    const t = token.ownerOf(tokenId);
                    await expect(t).be.revertedWithCustomError(token, "NonexistentToken");
                });
            });
        });

        describe('transfers', () => {
            const tokenId = firstTokenId;
            const data = '0x42';
            let toWhom: string;
            let tx: ContractTransaction;

            beforeEach(async () => {
                await token.connect(owner).approve(approved.address, tokenId);
                await token.connect(owner).setApprovalForAll(operator.address, true);
                toWhom = receiver.address;
            });

            const transferWasSuccessful = (from: () => string, to: () => string, tokenId: number) => {

                it('transfers the ownership of the given token ID to the given address', async () => {
                    expect(await token.ownerOf(tokenId)).be.equal(to());
                });

                it('emits a Transfer event', async () => {
                    //await expect(transfer()).emit(contract, "Transfer").withArgs(owner, owner, tokenId);
                    await expect(tx).emit(token, "Transfer").withArgs(from(), to(), tokenId);
                });

                it('clears the approval for the token ID', async () => {
                    expect(await token.getApproved(tokenId)).be.equal(ZERO_ADDRESS);
                });

                it('emits an Approval event', async () => {
                    //await expect(transfer()).emit(contract, "Approval").withArgs(owner, ZERO_ADDRESS, tokenId);
                    await expect(tx).emit(token, "Approval").withArgs(from(), ZERO_ADDRESS, tokenId);
                });

                it('adjusts owners balances', async () => {
                    expect(await token.balanceOf(from())).be.eq(1);
                });

                it('adjusts owners tokens by index', async () => {
                    if (!token.tokenOfOwnerByIndex) return;
                    expect(await token.tokenOfOwnerByIndex(toWhom, 0)).be.eq(tokenId);
                    expect(await token.tokenOfOwnerByIndex(from(), 0)).be.not.equal(tokenId);
                });
            };

            const shouldTransferTokensByUsers =
                (transferFunction: (caller: Signer, from: string, to: string, tokenId: number, data: string)
                    => Promise<ContractTransaction>) => {
                    context('when called by the owner', () => {
                        beforeEach(async () => {
                            tx = await transferFunction(owner, owner.address, toWhom, tokenId, "");
                        });
                        transferWasSuccessful(() => owner.address, () => toWhom, tokenId);
                    });

                    context('when called by the approved individual', () => {
                        beforeEach(async () => {
                            tx = await transferFunction(approved, owner.address, toWhom, tokenId, "");
                        });
                        transferWasSuccessful(() => owner.address, () => toWhom, tokenId);
                    });

                    context('when called by the operator', () => {
                        beforeEach(async () => {
                            tx = await transferFunction(operator, owner.address, toWhom, tokenId, "");
                        });
                        transferWasSuccessful(() => owner.address, () => toWhom, tokenId);
                    });

                    context('when called by the owner without an approved user', () => {
                        beforeEach(async () => {
                            await token.connect(owner).approve(ZERO_ADDRESS, tokenId);
                            tx = await transferFunction(operator, owner.address, toWhom, tokenId, "");
                        });
                        transferWasSuccessful(() => owner.address, () => toWhom, tokenId);
                    });

                    context('when sent to the owner', () => {
                        beforeEach(async () => {
                            tx = await transferFunction(owner, owner.address, owner.address, tokenId, "");
                        });

                        it('keeps ownership of the token', async () => {
                            expect(await token.ownerOf(tokenId)).be.equal(owner.address);
                        });

                        it('clears the approval for the token ID', async () => {
                            expect(await token.getApproved(tokenId)).be.equal(ZERO_ADDRESS);
                        });

                        it('emits only a transfer event', async () => {
                            await expect(tx).emit(token, "Transfer").withArgs(owner.address, owner.address, tokenId);
                        });

                        it('keeps the owner balance', async () => {
                            expect(await token.balanceOf(owner.address)).be.eq(2);
                        });

                        it('keeps same tokens by index', async () => {
                            if (!token.tokenOfOwnerByIndex) return;
                            const tokensListed = await Promise.all(
                                [0, 1].map(i => token.tokenOfOwnerByIndex(owner.address, i)),
                            );
                            expect(tokensListed.map(t => t.toString())).have.members(
                                [firstTokenId.toString(), secondTokenId.toString()],
                            );
                        });
                    });

                    context('when the address of the previous owner is incorrect', () => {
                        it('reverts', async () => {
                            const t = transferFunction(owner, other.address, other.address, tokenId, "");
                            await expect(t).be.revertedWithCustomError(token, "TransferFromIncorrectOwner");
                        });
                    });

                    context('when the sender is not authorized for the token id', () => {
                        it('reverts', async () => {
                            const t = transferFunction(other, owner.address, other.address, tokenId, "");
                            await expect(t).be.revertedWithCustomError(token, "CallerIsNotOwnerNorApproved");
                        });
                    });

                    context('when the given token ID does not exist', () => {
                        it('reverts', async () => {
                            const t = transferFunction(owner, owner.address, other.address, nonExistentTokenId, "");
                            await expect(t).be.revertedWithCustomError(token, "NonexistentToken");
                        });
                    });

                    context('when the address to transfer the token to is the zero address', () => {
                        it('reverts', async () => {
                            const t = transferFunction(owner, owner.address, ZERO_ADDRESS, tokenId, "");
                            await expect(t).be.revertedWithCustomError(token, "InvalidAddress");
                        });
                    });
                };

            describe('via transferFrom', () => {
                shouldTransferTokensByUsers((caller: Signer, from: string, to: string, tokenId: number) => {
                    return token.connect(caller).transferFrom(from, to, tokenId);
                });
            });

            describe('via safeTransferFrom', () => {
                const safeTransferFromWithData = (caller: Signer, from: string, to: string, tokenId: number, data: string) => {
                    if (data == "") data = "0x";
                    return token.connect(caller)["safeTransferFrom(address,address,uint256,bytes)"](from, to, tokenId, data);
                };

                const safeTransferFromWithoutData = (caller: Signer, from: string, to: string, tokenId: number, _: string) => {
                    return token.connect(caller)["safeTransferFrom(address,address,uint256)"](from, to, tokenId);
                };

                const shouldTransferSafely =
                    (transferFun: (caller: Signer, from: string, to: string, tokenId: number, data: string)
                        => Promise<ContractTransaction>, data: string) => {
                        describe('to a user account', () => {
                            shouldTransferTokensByUsers(transferFun);
                        });

                        describe('to a valid receiver contract', () => {
                            beforeEach(async () => {
                                receiver = await (await ethers.getContractFactory("ERC721ReceiverMock")).deploy(RECEIVER_MAGIC_VALUE, Error.None) as ERC721ReceiverMock;
                                toWhom = receiver.address;
                            });

                            shouldTransferTokensByUsers(transferFun);

                            it('calls onERC721Received', async () => {
                                const t = await transferFun(owner, owner.address, receiver.address, tokenId, data);
                                await expect(t).emit(receiver, "Received").withArgs(owner.address, owner.address, tokenId, data)
                            });

                            it('calls onERC721Received from approved', async () => {
                                const t = await transferFun(approved, owner.address, receiver.address, tokenId, data);
                                await expect(t).emit(receiver, "Received").withArgs(approved.address, owner.address, tokenId, data)
                            });

                            describe('with an invalid token id', () => {
                                it('reverts', async () => {
                                    const t = transferFun(owner, owner.address, receiver.address, nonExistentTokenId, data);
                                    await expect(t).be.revertedWithCustomError(token, "NonexistentToken");
                                });
                            });
                        });
                    };

                describe('with data', () => {
                    shouldTransferSafely(safeTransferFromWithData, data);
                });

                describe('without data', () => {
                    shouldTransferSafely(safeTransferFromWithoutData, "0x");
                });

                describe('to a receiver contract returning unexpected value', () => {
                    it('reverts', async () => {
                        const invalidReceiver = await (await ethers.getContractFactory("ERC721ReceiverMock")).deploy("0x00000042", Error.None) as ERC721ReceiverMock;
                        const t = token.connect(owner)["safeTransferFrom(address,address,uint256)"](owner.address, invalidReceiver.address, tokenId);
                        await expect(t).be.revertedWithCustomError(token, "TransferToNonERC721ReceiverImplementer");
                    });
                });

                describe('to a receiver contract that reverts with message', () => {
                    it('reverts', async () => {
                        const revertingReceiver = await (await ethers.getContractFactory("ERC721ReceiverMock")).deploy(RECEIVER_MAGIC_VALUE, Error.RevertWithMessage) as ERC721ReceiverMock;
                        const t = token.connect(owner)["safeTransferFrom(address,address,uint256)"](owner.address, revertingReceiver.address, tokenId);
                        await expect(t).be.revertedWith("ERC721ReceiverMock: reverting");
                    });
                });

                describe('to a receiver contract that reverts without message', () => {
                    it('reverts', async () => {
                        const revertingReceiver = await (await ethers.getContractFactory("ERC721ReceiverMock")).deploy(RECEIVER_MAGIC_VALUE, Error.RevertWithoutMessage) as ERC721ReceiverMock;
                        const t = token.connect(owner)["safeTransferFrom(address,address,uint256)"](owner.address, revertingReceiver.address, tokenId);
                        await expect(t).be.revertedWithCustomError(token, "TransferToNonERC721ReceiverImplementer");
                    });
                });

                describe('to a receiver contract that panics', () => {
                    it('reverts', async () => {
                        const revertingReceiver = await (await ethers.getContractFactory("ERC721ReceiverMock")).deploy(RECEIVER_MAGIC_VALUE, Error.Panic) as ERC721ReceiverMock;
                        const t = token.connect(owner)["safeTransferFrom(address,address,uint256)"](owner.address, revertingReceiver.address, tokenId);
                        await expect(t).be.revertedWithPanic();
                    });
                });

                describe('to a contract that does not implement the required function', () => {
                    it('reverts', async () => {
                        const t = token.connect(owner)["safeTransferFrom(address,address,uint256)"](owner.address, token.address, tokenId);
                        await expect(t).be.revertedWithCustomError(token, "TransferToNonERC721ReceiverImplementer");
                    });
                });
            });
        });

        describe('safe mint', () => {
            const tokenId = fourthTokenId;
            const data = '0x42';

            describe('via safeMint', () => { // regular minting is tested in ERC721Mintable.test.js and others
                it('calls onERC721Received — with data', async () => {
                    receiver = await (await ethers.getContractFactory("ERC721ReceiverMock")).deploy(RECEIVER_MAGIC_VALUE, Error.None) as ERC721ReceiverMock;
                    const t = await token.connect(owner)["safeMint(address,uint256,bytes)"](receiver.address, 1, data);
                    await expect(t).emit(receiver, "Received").withArgs(owner.address, ZERO_ADDRESS, tokenId, data);
                });

                it('calls onERC721Received — without data', async () => {
                    receiver = await (await ethers.getContractFactory("ERC721ReceiverMock")).deploy(RECEIVER_MAGIC_VALUE, Error.None) as ERC721ReceiverMock;
                    const t = await token.connect(owner)["safeMint(address,uint256)"](receiver.address, 1);
                    await expect(t).emit(receiver, "Received").withArgs(owner.address, ZERO_ADDRESS, tokenId, "0x");
                });

                context('to a receiver contract returning unexpected value', () => {
                    it('reverts', async () => {
                        const invalidReceiver = await (await ethers.getContractFactory("ERC721ReceiverMock")).deploy("0x00000042", Error.None) as ERC721ReceiverMock;
                        const t = token["safeMint(address,uint256)"](invalidReceiver.address, tokenId);
                        await expect(t).be.revertedWithCustomError(token, "TransferToNonERC721ReceiverImplementer");
                    });
                });

                context('to a receiver contract that reverts with message', () => {
                    it('reverts', async () => {
                        const revertingReceiver = await (await ethers.getContractFactory("ERC721ReceiverMock")).deploy(RECEIVER_MAGIC_VALUE, Error.RevertWithMessage) as ERC721ReceiverMock;
                        const t = token["safeMint(address,uint256)"](revertingReceiver.address, tokenId);
                        await expect(t).be.revertedWith("ERC721ReceiverMock: reverting");
                    });
                });

                context('to a receiver contract that reverts without message', () => {
                    it('reverts', async () => {
                        const revertingReceiver = await (await ethers.getContractFactory("ERC721ReceiverMock")).deploy(RECEIVER_MAGIC_VALUE, Error.RevertWithoutMessage) as ERC721ReceiverMock;
                        const t = token["safeMint(address,uint256)"](revertingReceiver.address, tokenId);
                        await expect(t).be.revertedWithCustomError(token, "TransferToNonERC721ReceiverImplementer");
                    });
                });

                context('to a receiver contract that panics', () => {
                    it('reverts', async () => {
                        const revertingReceiver = await (await ethers.getContractFactory("ERC721ReceiverMock")).deploy(RECEIVER_MAGIC_VALUE, Error.Panic) as ERC721ReceiverMock;
                        const t = token["safeMint(address,uint256)"](revertingReceiver.address, tokenId);
                        await expect(t).be.revertedWithPanic();
                    });
                });

                context('to a contract that does not implement the required function', () => {
                    it('reverts', async () => {
                        const t = token["safeMint(address,uint256)"](token.address, tokenId);
                        await expect(t).be.revertedWithCustomError(token, "TransferToNonERC721ReceiverImplementer");
                    });
                });
            });
        });

        describe('approve', () => {
            const tokenId = firstTokenId;
            let tx: ContractTransaction;

            const itClearsApproval = () => {
                it('clears approval for the token', async () => {
                    expect(await token.getApproved(tokenId)).be.equal(ZERO_ADDRESS);
                });
            };

            const itApproves = (address: () => string) => {
                it('sets the approval for the target address', async () => {
                    expect(await token.getApproved(tokenId)).be.equal(address());
                });
            };

            const itEmitsApprovalEvent = (address: () => string) => {
                it('emits an approval event', async () => {
                    await expect(tx).emit(token, "Approval").withArgs(owner.address, address(), tokenId);
                });
            };

            context('when clearing approval', () => {
                context('when there was no prior approval', () => {
                    beforeEach(async () => {
                        tx = await token.connect(owner).approve(ZERO_ADDRESS, tokenId);
                    });

                    itClearsApproval();
                    itEmitsApprovalEvent(() => ZERO_ADDRESS);
                });

                context('when there was a prior approval', () => {
                    beforeEach(async () => {
                        await token.connect(owner).approve(approved.address, tokenId);
                        tx = await token.connect(owner).approve(ZERO_ADDRESS, tokenId);
                    });

                    itClearsApproval();
                    itEmitsApprovalEvent(() => ZERO_ADDRESS);
                });
            });

            context('when approving a non-zero address', () => {
                context('when there was no prior approval', () => {
                    beforeEach(async () => {
                        tx = await token.connect(owner).approve(approved.address, tokenId);
                    });

                    itApproves(() => approved.address);
                    itEmitsApprovalEvent(() => approved.address);
                });

                context('when there was a prior approval to the same address', () => {
                    beforeEach(async () => {
                        await token.connect(owner).approve(approved.address, tokenId);
                        tx = await token.connect(owner).approve(approved.address, tokenId);
                    });

                    itApproves(() => approved.address);
                    itEmitsApprovalEvent(() => approved.address);
                });

                context('when there was a prior approval to a different address', () => {
                    beforeEach(async () => {
                        await token.connect(owner).approve(anotherApproved.address, tokenId);
                        tx = await token.connect(owner).approve(anotherApproved.address, tokenId);
                    });

                    itApproves(() => anotherApproved.address);
                    itEmitsApprovalEvent(() => anotherApproved.address);
                });
            });

            context('when the address that receives the approval is the owner', () => {
                it('reverts', async () => {
                    const t = token.connect(owner).approve(owner.address, tokenId);
                    await expect(t).be.revertedWithCustomError(token, "CallerIsNotOwnerNorApproved");
                });
            });

            context('when the sender does not own the given token ID', () => {
                it('reverts', async () => {
                    const t = token.connect(other).approve(approved.address, tokenId);
                    await expect(t).be.revertedWithCustomError(token, "CallerIsNotOwnerNorApprovedForAll");
                });
            });

            context('when the sender is approved for the given token ID', () => {
                it('reverts', async () => {
                    await token.connect(owner).approve(approved.address, tokenId);
                    const t = token.connect(approved).approve(anotherApproved.address, tokenId);
                    await expect(t).be.revertedWithCustomError(token, "CallerIsNotOwnerNorApprovedForAll");
                });
            });

            context('when the sender is an operator', () => {
                beforeEach(async () => {
                    await token.connect(owner).setApprovalForAll(operator.address, true);
                    tx = await token.connect(operator).approve(approved.address, tokenId);
                });

                itApproves(() => approved.address);
                itEmitsApprovalEvent(() => approved.address);
            });

            context('when the given token ID does not exist', () => {
                it('reverts', async () => {
                    const t = token.connect(operator).approve(approved.address, nonExistentTokenId);
                    await expect(t).be.revertedWithCustomError(token, "NonexistentToken");
                });
            });
        });

        describe('setApprovalForAll', () => {
            context('when the operator willing to approve is not the owner', () => {
                context('when there is no operator approval set by the sender', () => {
                    it('approves the operator', async () => {
                        await token.connect(owner).setApprovalForAll(operator.address, true);
                        expect(await token.isApprovedForAll(owner.address, operator.address)).equal(true);
                    });

                    it('emits an approval event', async () => {
                        const t = await token.connect(owner).setApprovalForAll(operator.address, true);
                        await expect(t).emit(token, "ApprovalForAll").withArgs(owner.address, operator.address, true);
                    });
                });

                context('when the operator was set as not approved', () => {
                    beforeEach(async () => {
                        await token.connect(owner).setApprovalForAll(operator.address, false);
                    });

                    it('approves the operator', async () => {
                        await token.connect(owner).setApprovalForAll(operator.address, true);
                        expect(await token.isApprovedForAll(owner.address, operator.address)).equal(true);
                    });

                    it('emits an approval event', async () => {
                        const t = await token.connect(owner).setApprovalForAll(operator.address, true);
                        await expect(t).emit(token, "ApprovalForAll").withArgs(owner.address, operator.address, true);
                    });

                    it('can unset the operator approval', async () => {
                        await token.connect(owner).setApprovalForAll(operator.address, false);
                        expect(await token.isApprovedForAll(owner.address, operator.address)).equal(false);
                    });
                });

                context('when the operator was already approved', () => {
                    beforeEach(async () => {
                        await token.connect(owner).setApprovalForAll(operator.address, true);
                    });

                    it('keeps the approval to the given address', async () => {
                        await token.connect(owner).setApprovalForAll(operator.address, true);
                        expect(await token.isApprovedForAll(owner.address, operator.address)).equal(true);
                    });

                    it('emits an approval event', async () => {
                        const t = await token.connect(owner).setApprovalForAll(operator.address, true);
                        await expect(t).emit(token, "ApprovalForAll").withArgs(owner.address, operator.address, true);
                    });
                });
            });

            context('when the operator is the owner', () => {
                it('reverts', async () => {
                    const t = token.connect(owner).setApprovalForAll(owner.address, true);
                    await expect(t).be.revertedWithCustomError(token, "ApproveToCaller");
                });
            });
        });

        describe('getApproved', () => {
            context('when token is not minted', async () => {
                it('reverts', async () => {
                    const t = token.getApproved(nonExistentTokenId);
                    await expect(t).be.revertedWithCustomError(token, "NonexistentToken");
                });
            });

            context('when token has been minted ', async () => {
                it('should return the zero address', async () => {
                    expect(await token.getApproved(firstTokenId)).be.equal(
                        ZERO_ADDRESS,
                    );
                });

                context('when account has been approved', async () => {
                    beforeEach(async () => {
                        await token.connect(owner).approve(approved.address, firstTokenId);
                    });

                    it('returns approved account', async () => {
                        expect(await token.getApproved(firstTokenId)).be.equal(approved.address);
                    });
                });
            });
        });

        //region ERC721Enumerable
        describe('totalSupply', () => {
            it('returns total token supply', async () => {
                expect(await token.totalSupply()).be.equal(5);
            });
        });

        describe('tokenOfOwnerByIndex', () => {
            describe('when the given index is lower than the amount of tokens owned by the given address', () => {
                it('returns the token ID placed at the given index', async () => {
                    expect(await token.tokenOfOwnerByIndex(owner.address, 0)).be.equal(firstTokenId);
                });
            });

            describe('when the index is greater than or equal to the total tokens owned by the given address', () => {
                it('reverts', async () => {
                    const t = token.tokenOfOwnerByIndex(owner.address, 2);
                    await expect(t).be.revertedWithCustomError(token, "IndexOutOfRange");
                });
            });

            describe('when the given address does not own any token', () => {
                it('reverts', async () => {
                    const t = token.tokenOfOwnerByIndex(other.address, 0);
                    await expect(t).be.revertedWithCustomError(token, "IndexOutOfRange");
                });
            });

            describe('after transferring all tokens to another user', () => {
                beforeEach(async () => {
                    await token.connect(owner).transferFrom(owner.address, other.address, firstTokenId);
                    await token.connect(owner).transferFrom(owner.address, other.address, secondTokenId);
                });

                it('returns correct token IDs for target', async () => {
                    expect(await token.balanceOf(other.address)).be.equal(2);
                    const tokensListed = await Promise.all(
                        [0, 1].map(i => token.tokenOfOwnerByIndex(other.address, i)),
                    );
                    expect(tokensListed.map(t => t.toNumber())).have.members([firstTokenId, secondTokenId]);
                });

                it('returns empty collection for original owner', async () => {
                    expect(await token.balanceOf(owner.address)).be.equal(0);
                    const t = token.tokenOfOwnerByIndex(owner.address, 0);
                    await expect(t).be.revertedWithCustomError(token, "IndexOutOfRange");
                });
            });
        });

        describe('tokenByIndex', () => {
            it('returns all tokens', async () => {
                const tokensListed = await Promise.all([3, 4].map(i => token.tokenByIndex(i)));
                expect(tokensListed.map(t => t.toNumber())).have.members([firstTokenId, secondTokenId]);
            });

            it('reverts if index is greater than supply', async () => {
                const t = token.tokenByIndex(5);
                await expect(t).be.revertedWithCustomError(token, "IndexOutOfRange");
            });

            [firstTokenId, secondTokenId].forEach(function (tokenId) {
                it(`returns all tokens after burning token ${tokenId} and minting new tokens`, async () => {
                    const newTokenId = fourthTokenId;
                    const anotherNewTokenId = newTokenId + 1;

                    await token["safeMint(address,uint256)"](newOwner.address, 2);
                    await token.burn(tokenId);

                    expect(await token.totalSupply()).be.equal(6);
                    const t = token.tokenByIndex(6);
                    await expect(t).be.revertedWithCustomError(token, "IndexOutOfRange");

                    const tokensListed = await Promise.all([3, 4, 5].map(i => token.tokenByIndex(i)));

                    const expectedTokens = [firstTokenId, secondTokenId, newTokenId, anotherNewTokenId].filter(
                        x => (x !== tokenId),
                    );
                    expect(tokensListed.map(t => t.toNumber())).have.members(expectedTokens.map(t => t));
                });
            });
        });
        //endregion
    });

    describe('_mint(address, uint256)', () => {
        let tx: ContractTransaction;

        it('reverts with a null destination address', async () => {
            const t = token["safeMint(address,uint256)"](ZERO_ADDRESS, 1);
            await expect(t).be.revertedWithCustomError(token, "InvalidAddress");
        });

        context('with minted token', async () => {
            beforeEach(async () => {
                await token["safeMint(address,uint256)"](dummy.address, 3);
                tx = await token["safeMint(address,uint256)"](owner.address, 1);
            });

            it('emits a Transfer event', async () => {
                await expect(tx).emit(token, "Transfer").withArgs(ZERO_ADDRESS, owner.address, firstTokenId);
            });

            it('creates the token', async () => {
                expect(await token.balanceOf(owner.address)).be.equal(1);
                expect(await token.ownerOf(firstTokenId)).equal(owner.address);
            });

            it('reverts when adding a token id that already exists', async () => {
                const t = token.safeReMint(token.address, firstTokenId);
                await expect(t).be.revertedWithCustomError(token, "TokenAlreadyMinted");
            });

            it('adjusts owner tokens by index', async () => {
                expect(await token.tokenOfOwnerByIndex(owner.address, 0)).be.equal(firstTokenId);
            });

            it('adjusts all tokens list', async () => {
                expect(await token.tokenByIndex(3)).be.equal(firstTokenId);
            });
        });
    });

    describe('_burn', () => {
        let tx: ContractTransaction;

        it('reverts when burning a non-existent token id', async () => {
            const t = token.burn(nonExistentTokenId);
            await expect(t).be.revertedWithCustomError(token, "NonexistentToken");
        });

        context('with minted tokens', () => {
            beforeEach(async () => {
                await token["safeMint(address,uint256)"](dummy.address, 3);
                await token["safeMint(address,uint256)"](owner.address, 2);
            });

            context('with burnt token', () => {
                beforeEach(async () => {
                    tx = await token.burn(firstTokenId);
                });

                it('emits a Transfer event', async () => {
                    await expect(tx).emit(token, "Transfer").withArgs(owner.address, ZERO_ADDRESS, firstTokenId);
                });

                it('deletes the token', async () => {
                    expect(await token.balanceOf(owner.address)).be.equal(1);
                    const t = token.burn(firstTokenId);
                    await expect(t).be.revertedWithCustomError(token, "NonexistentToken");
                });

                it('reverts when burning a token id that has been deleted', async () => {
                    const t = token.burn(firstTokenId);
                    await expect(t).be.revertedWithCustomError(token, "NonexistentToken");
                });

                it('removes that token from the token list of the owner', async () => {
                    expect(await token.tokenOfOwnerByIndex(owner.address, 0)).be.equal(secondTokenId);
                });

                it('adjusts all tokens list', async () => {
                    expect(await token.tokenByIndex(3)).be.equal(secondTokenId);
                });

                it('burns all tokens', async () => {
                    while ((await token.totalSupply()).toNumber() > 0) {
                        await token.burn(await token.tokenByIndex(0));
                    }

                    expect(await token.totalSupply()).be.equal(0);
                    const t = token.tokenByIndex(0);
                    await expect(t).be.revertedWithCustomError(token, "IndexOutOfRange");
                });
            });
        });
    });

    describe('metadata', () => {
        const baseURI = 'https://api.example.com/v1/';

        it('has a name', async () => {
            expect(await token.name()).be.equal(ERC721_NAME);
        });

        it('has a symbol', async () => {
            expect(await token.symbol()).be.equal(ERC721_SYMBOL);
        });

        describe('token URI', () => {
            beforeEach(async () => {
                await token["safeMint(address,uint256)"](dummy.address, 3);
                await token["safeMint(address,uint256)"](owner.address, 1);
            });

            it('return empty string by default', async () => {
                expect(await token.tokenURI(firstTokenId)).be.equal('');
            });

            it('reverts when queried for non existent token id', async () => {
                const t = token.tokenURI(nonExistentTokenId);
                await expect(t).be.revertedWithCustomError(token, "NonexistentToken");
            });

            describe('base URI', () => {

                it('base URI can be set', async () => {
                    await token.setBaseURI(baseURI);
                    expect(await token.baseURI()).equal(baseURI);
                });

                it('base URI is added as a prefix to the token URI', async () => {
                    await token.setBaseURI(baseURI);
                    expect(await token.tokenURI(firstTokenId)).be.equal(baseURI + firstTokenId.toString());
                });

                it('token URI can be changed by changing the base URI', async () => {
                    await token.setBaseURI(baseURI);
                    const newBaseURI = 'https://api.example.com/v2/';
                    await token.setBaseURI(newBaseURI);
                    expect(await token.tokenURI(firstTokenId)).be.equal(newBaseURI + firstTokenId.toString());
                });
            });
        });
    });
});
