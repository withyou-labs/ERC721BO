/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  ERC721BOMock,
  ERC721BOMockInterface,
} from "../../../contracts/mocks/ERC721BOMock";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ApproveToCaller",
    type: "error",
  },
  {
    inputs: [],
    name: "CallerIsNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "CallerIsNotOwnerNorApprovedForAll",
    type: "error",
  },
  {
    inputs: [],
    name: "ExceededMaxOfMint",
    type: "error",
  },
  {
    inputs: [],
    name: "IndexOutOfRange",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "NonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "TokenAlreadyMinted",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferFromIncorrectOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToNonERC721ReceiverImplementer",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "exists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeReMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalBurnt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalMinted",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002cc338038062002cc3833981016040819052620000349162000152565b8282600062000044838262000272565b50600162000053828262000272565b506200006b60026200008660201b62000b7c1760201c565b50600790506200007c828262000272565b505050506200033e565b6000199055565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620000b557600080fd5b81516001600160401b0380821115620000d257620000d26200008d565b604051601f8301601f19908116603f01168101908282118183101715620000fd57620000fd6200008d565b816040528381526020925086838588010111156200011a57600080fd5b600091505b838210156200013e57858201830151818301840152908201906200011f565b600093810190920192909252949350505050565b6000806000606084860312156200016857600080fd5b83516001600160401b03808211156200018057600080fd5b6200018e87838801620000a3565b94506020860151915080821115620001a557600080fd5b620001b387838801620000a3565b93506040860151915080821115620001ca57600080fd5b50620001d986828701620000a3565b9150509250925092565b600181811c90821680620001f857607f821691505b6020821081036200021957634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200026d57600081815260208120601f850160051c81016020861015620002485750805b601f850160051c820191505b81811015620002695782815560010162000254565b5050505b505050565b81516001600160401b038111156200028e576200028e6200008d565b620002a6816200029f8454620001e3565b846200021f565b602080601f831160018114620002de5760008415620002c55750858301515b600019600386901b1c1916600185901b17855562000269565b600085815260208120601f198616915b828110156200030f57888601518255948401946001909101908401620002ee565b50858210156200032e5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b612975806200034e6000396000f3fe608060405234801561001057600080fd5b50600436106101ae5760003560e01c806355f804b3116100ee578063966ff65011610097578063a2309ff811610071578063a2309ff814610375578063b88d4fde1461037d578063c87b56dd14610390578063e985e9c5146103a357600080fd5b8063966ff65014610347578063a14481941461034f578063a22cb4651461036257600080fd5b806370a08231116100c857806370a08231146103195780638832e6e31461032c57806395d89b411461033f57600080fd5b806355f804b3146102eb5780636352211e146102fe5780636c0360eb1461031157600080fd5b80632f745c591161015b57806342842e0e1161013557806342842e0e1461029f57806342966c68146102b25780634f558e79146102c55780634f6ccce7146102d857600080fd5b80632f745c59146102665780632fe43dd51461027957806340c10f191461028c57600080fd5b8063095ea7b31161018c578063095ea7b31461022857806318160ddd1461023d57806323b872dd1461025357600080fd5b806301ffc9a7146101b357806306fdde03146101db578063081812fc146101f0575b600080fd5b6101c66101c136600461232d565b6103ec565b60405190151581526020015b60405180910390f35b6101e361051d565b6040516101d291906123b8565b6102036101fe3660046123cb565b6105af565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101d2565b61023b61023636600461240d565b610619565b005b6102456106ff565b6040519081526020016101d2565b61023b610261366004612437565b610720565b61024561027436600461240d565b61076b565b61023b61028736600461240d565b61081c565b61023b61029a36600461240d565b61082a565b61023b6102ad366004612437565b610834565b61023b6102c03660046123cb565b61084f565b6101c66102d33660046123cb565b61085b565b6102456102e63660046123cb565b610866565b61023b6102f9366004612536565b610932565b61020361030c3660046123cb565b61093e565b6101e36109e1565b61024561032736600461257f565b6109eb565b61023b61033a3660046125ba565b610a46565b6101e3610a51565b610245610a60565b61023b61035d36600461240d565b610a6c565b61023b610370366004612611565b610a76565b610245610a81565b61023b61038b36600461264d565b610a8d565b6101e361039e3660046123cb565b610adf565b6101c66103b13660046126b5565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260066020908152604080832093909416825291909152205460ff1690565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f01ffc9a700000000000000000000000000000000000000000000000000000000148061047f57507fffffffff0000000000000000000000000000000000000000000000000000000082167f80ac58cd00000000000000000000000000000000000000000000000000000000145b806104cb57507fffffffff0000000000000000000000000000000000000000000000000000000082167f780e9d6300000000000000000000000000000000000000000000000000000000145b8061051757507fffffffff0000000000000000000000000000000000000000000000000000000082167f5b5e139f00000000000000000000000000000000000000000000000000000000145b92915050565b60606000805461052c906126e8565b80601f0160208091040260200160405190810160405280929190818152602001828054610558906126e8565b80156105a55780601f1061057a576101008083540402835291602001916105a5565b820191906000526020600020905b81548152906001019060200180831161058857829003601f168201915b5050505050905090565b60006105ba82610b83565b6105f0576040517fb1d04f0800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5060009081526005602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60006106248261093e565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361068b576040517f4fe05af100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff8216148015906106b857506106b681336103b1565b155b156106ef576040517fd585559200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6106fa818484610bac565b505050565b6000610709610a60565b610711610a81565b61071b919061276a565b905090565b61072a3382610c2d565b610760576040517f4fe05af100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6106fa838383610d04565b600080600861077a6002610e19565b901c90506000805b600061079060048884610e36565b9050806000036107a357506001016107e2565b60006107ae82610e5c565b90508681850111156107d857600883901b6107cb83868a03611098565b0195505050505050610517565b9290920191506001015b82811115610782576040517f1390f2a100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6108268282611408565b5050565b6108268282611422565b6106fa83838360405180602001604052806000815250610a8d565b6108588161143b565b50565b600061051782610b83565b6000806108736002610e19565b9050600881901c6000806000195b60006108906004600186610e36565b199050806000036108a757836001019350506108e6565b60006108b282610e5c565b90508881850111156108d957600885901b6108cf83868c03611098565b01925050506108ef565b6001909401939290920191505b83831115610881575b848110610928576040517f1390f2a100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b9695505050505050565b600761082682826127c3565b60008161094b6002610e19565b11610982576040517fb1d04f0800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600061098f6003846114f5565b9050600173ffffffffffffffffffffffffffffffffffffffff821611610517576040517fb1d04f0800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b606061071b61155f565b6000600173ffffffffffffffffffffffffffffffffffffffff831611610a3d576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61051782611595565b6106fa8383836115d7565b60606001805461052c906126e8565b600061071b6001611595565b610826828261167b565b610826338383611695565b600061071b6002610e19565b610a973383610c2d565b610acd576040517f4fe05af100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610ad984848484611792565b50505050565b6060610aea82610b83565b610b20576040517fb1d04f0800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000610b2a61155f565b90506000815111610b4a5760405180602001604052806000815250610b75565b80610b54846117df565b604051602001610b659291906128a1565b6040516020818303038152906040525b9392505050565b6000199055565b600081610b906002610e19565b1180156105175750610ba5600460018461187f565b1592915050565b60008181526005602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff86811691821790925591518493918716917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b6000610c3882610b83565b610c6e576040517fb1d04f0800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610c7a6004848461187f565b15610c8757506001610517565b6000610c928361093e565b73ffffffffffffffffffffffffffffffffffffffff80821660009081526006602090815260408083209389168352929052205490915060ff1680610cfc575060008381526005602052604090205473ffffffffffffffffffffffffffffffffffffffff8581169116145b949350505050565b610d106004848361187f565b610d46576040517fa114810000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600173ffffffffffffffffffffffffffffffffffffffff831611610d96576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610da083826118b6565b610dad6004848484611930565b610db960038284611946565b808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b80546000906000198114610e2d5780610b75565b60009392505050565b60008381610e448486611a11565b81526020019081526020016000205490509392505050565b600081600003610e6e57506000919050565b7f55555555555555555555555555555555555555555555555555555555555555558260011c167f555555555555555555555555555555555555555555555555555555555555555583160191507f33333333333333333333333333333333333333333333333333333333333333338260021c167f333333333333333333333333333333333333333333333333333333333333333383160191507f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f8260041c167f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f83160191507eff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff8260081c167eff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff83160191507dffff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff8260101c167dffff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff83160191507bffffffff00000000ffffffff00000000ffffffff00000000ffffffff8260201c167bffffffff00000000ffffffff00000000ffffffff00000000ffffffff831601915077ffffffffffffffff0000000000000000ffffffffffffffff8260401c1677ffffffffffffffff0000000000000000ffffffffffffffff83160191506fffffffffffffffffffffffffffffffff8260801c166fffffffffffffffffffffffffffffffff8316019150819050919050565b600060ff82111561110a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f426974733a20696e646578206f7574206f6620626f756e64730000000000000060448201526064015b60405180910390fd5b8260000361111b5750600019610517565b60009050600182019150827f55555555555555555555555555555555555555555555555555555555555555558160011c167f55555555555555555555555555555555555555555555555555555555555555558216017f33333333333333333333333333333333333333333333333333333333333333338160021c167f33333333333333333333333333333333333333333333333333333333333333338216017f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f8160041c167f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f8216017eff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff8160081c167eff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff8216017dffff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff8160101c167dffff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff8216017bffffffff00000000ffffffff00000000ffffffff00000000ffffffff8160201c167bffffffff00000000ffffffff00000000ffffffff00000000ffffffff82160177ffffffffffffffff0000000000000000ffffffffffffffff8160401c1677ffffffffffffffff0000000000000000ffffffffffffffff8216016fffffffffffffffffffffffffffffffff81169050808a111561133757608089019850808a0399505b5080881c67ffffffffffffffff16808a111561135957604089019850808a0399505b5081881c63ffffffff16808a111561137757602089019850808a0399505b5082881c61ffff16808a111561139357601089019850808a0399505b5083881c60ff16808a11156113ae57600889019850808a0399505b5084881c600f16808a11156113c957600489019850808a0399505b5085881c600316808a11156113e457600289019850808a0399505b5086881c600116808a11156113fa576001890198505b505050505050505092915050565b610826828260405180602001604052806000815250611ad5565b600061142e6002610e19565b90506106fa838284611b22565b61144481610b83565b61147a576040517fb1d04f0800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006114858261093e565b905061149181836118b6565b61149f600482600185611930565b6114ac6003836001611946565b604051829060009073ffffffffffffffffffffffffffffffffffffffff8416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b6000815b600081815260208581526040909120549081901c9063ffffffff1673ffffffffffffffffffffffffffffffffffffffff82161580159061153a575084818401115b15611549575091506105179050565b50506000198101906114f9575060009392505050565b60606007805461156e906126e8565b159050611582576007805461052c906126e8565b5060408051602081019091526000815290565b60008060086115a46002610e19565b901c90506000805b6115c06115bb60048784610e36565b610e5c565b90910190600101828111156115ac57509392505050565b60006115e36002610e19565b90506115f0848285611b22565b73ffffffffffffffffffffffffffffffffffffffff84163b6116125750505050565b808301815b6116246000878387611c37565b61165a576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001018181111561161757818584011461167357600080fd5b505050505050565b6108268282604051806020016040528060008152506115d7565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036116fa576040517fb06307db00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff83811660008181526006602090815260408083209487168084529482529182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b61179d848484610d04565b6117a984848484611c37565b610ad9576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b606060006117ec83611dd4565b600101905060008167ffffffffffffffff81111561180c5761180c612473565b6040519080825280601f01601f191660200182016040528015611836576020820181803683370190505b5090508181016020015b600019017f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a850494508461184057509392505050565b600080611890600884901c85611a11565b600090815260208690526040902054600160ff85169190911c8116149150509392505050565b60008181526005602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001690555182919073ffffffffffffffffffffffffffffffffffffffff8516907f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925908390a45050565b61193b848483611eb6565b610ad9848383611eee565b600082815260208481526040909120549081901c9063ffffffff1661196c836001611f25565b60008581526020879052604090205573ffffffffffffffffffffffffffffffffffffffff8216158061199f575060018111155b156119ab575050505050565b60006119b88560016128d0565b600081815260208881526040909120549192501c73ffffffffffffffffffffffffffffffffffffffff16611673576119fa836119f560018561276a565b611f25565b600082815260208890526040902055505050505050565b600063ffffffff831115611aa7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f455243373231424f204173736574733a20706167654e6f206d7573742062652060448201527f6c657373207468616e20325e33320000000000000000000000000000000000006064820152608401611101565b5077ffffffffffffffffffffffffffffffffffffffff00000000602082901b1663ffffffff83161792915050565b611adf8383611fe0565b611aec6000848484611c37565b6106fa576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600173ffffffffffffffffffffffffffffffffffffffff841611611b72576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b62010000611b8082846128d0565b1115611bb8576040517f12d23d8800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611bc560048484846120d5565b611bd260038484846121bc565b611bdd6002826121dd565b60005b6040518382019073ffffffffffffffffffffffffffffffffffffffff8616906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a4600101818110611be05750505050565b600073ffffffffffffffffffffffffffffffffffffffff84163b15611dc9576040517f150b7a0200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85169063150b7a0290611cae9033908990889088906004016128e3565b6020604051808303816000875af1925050508015611d07575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252611d0491810190612922565b60015b611d7e573d808015611d35576040519150601f19603f3d011682016040523d82523d6000602084013e611d3a565b606091505b508051600003611d76576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050610cfc565b506001949350505050565b6000807a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310611e1d577a184f03e93ff9f4daa797ed6e38ed64bf6a1f010000000000000000830492506040015b6d04ee2d6d415b85acef81000000008310611e49576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc100008310611e6757662386f26fc10000830492506010015b6305f5e1008310611e7f576305f5e100830492506008015b6127108310611e9357612710830492506004015b60648310611ea5576064830492506002015b600a83106105175760010192915050565b6000611ec6600883901c84611a11565b60009081526020949094525060409092208054600160ff9094169390931b1990921690915550565b6000611efe600883901c84611a11565b60009081526020949094525060409092208054600160ff9094169390931b90921790915550565b600063ffffffff821115611fbb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602d60248201527f455243373231424f204f776e6572733a20636f756e74206d757374206265206c60448201527f657373207468616e20325e3332000000000000000000000000000000000000006064820152608401611101565b5060209190911b77ffffffffffffffffffffffffffffffffffffffff00000000161790565b600173ffffffffffffffffffffffffffffffffffffffff831611612030576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61203d600460018361187f565b612072576040517ea5a1f500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b612080600460018484611930565b61208c60038284611946565b604051819073ffffffffffffffffffffffffffffffffffffffff8416906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b8015610ad957600060016120e983856128d0565b6120f3919061276a565b9050600883811c9082901c8082146121735760006121118388611a11565b9050600061211f8389611a11565b9050815b6000198282036121365760ff80881690031c5b83820361214b57600160ff8a1681901b909103015b600082815260208c9052604090208054909117905560010181811115612123575050506121b3565b600160ff86811682901b6000198287169092039190911c03018088600061219a868b611a11565b8152602081019190915260400160002080549091179055505b50505050505050565b6121c68382611f25565b600092835260209490945250604090209190915550565b6000811161226d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f436f756e7465723a20636f756e74206d7573742062652067726561746572207460448201527f68616e20300000000000000000000000000000000000000000000000000000006064820152608401611101565b8154600060001982146122895761228483836128d0565b61228b565b825b905060001981036122f8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f436f756e7465723a206f766572666c6f770000000000000000000000000000006044820152606401611101565b9092555050565b7fffffffff000000000000000000000000000000000000000000000000000000008116811461085857600080fd5b60006020828403121561233f57600080fd5b8135610b75816122ff565b60005b8381101561236557818101518382015260200161234d565b50506000910152565b6000815180845261238681602086016020860161234a565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b602081526000610b75602083018461236e565b6000602082840312156123dd57600080fd5b5035919050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461240857600080fd5b919050565b6000806040838503121561242057600080fd5b612429836123e4565b946020939093013593505050565b60008060006060848603121561244c57600080fd5b612455846123e4565b9250612463602085016123e4565b9150604084013590509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600067ffffffffffffffff808411156124bd576124bd612473565b604051601f85017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f0116810190828211818310171561250357612503612473565b8160405280935085815286868601111561251c57600080fd5b858560208301376000602087830101525050509392505050565b60006020828403121561254857600080fd5b813567ffffffffffffffff81111561255f57600080fd5b8201601f8101841361257057600080fd5b610cfc848235602084016124a2565b60006020828403121561259157600080fd5b610b75826123e4565b600082601f8301126125ab57600080fd5b610b75838335602085016124a2565b6000806000606084860312156125cf57600080fd5b6125d8846123e4565b925060208401359150604084013567ffffffffffffffff8111156125fb57600080fd5b6126078682870161259a565b9150509250925092565b6000806040838503121561262457600080fd5b61262d836123e4565b91506020830135801515811461264257600080fd5b809150509250929050565b6000806000806080858703121561266357600080fd5b61266c856123e4565b935061267a602086016123e4565b925060408501359150606085013567ffffffffffffffff81111561269d57600080fd5b6126a98782880161259a565b91505092959194509250565b600080604083850312156126c857600080fd5b6126d1836123e4565b91506126df602084016123e4565b90509250929050565b600181811c908216806126fc57607f821691505b602082108103612735577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b818103818111156105175761051761273b565b601f8211156106fa57600081815260208120601f850160051c810160208610156127a45750805b601f850160051c820191505b81811015611673578281556001016127b0565b815167ffffffffffffffff8111156127dd576127dd612473565b6127f1816127eb84546126e8565b8461277d565b602080601f831160018114612826576000841561280e5750858301515b600019600386901b1c1916600185901b178555611673565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b8281101561287357888601518255948401946001909101908401612854565b50858210156128915787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b600083516128b381846020880161234a565b8351908301906128c781836020880161234a565b01949350505050565b808201808211156105175761051761273b565b600073ffffffffffffffffffffffffffffffffffffffff808716835280861660208401525083604083015260806060830152610928608083018461236e565b60006020828403121561293457600080fd5b8151610b75816122ff56fea2646970667358221220cb4e2d97bb60881a6f1a1679c96e601656688083713d73573c95eedc460773ac64736f6c63430008100033";

type ERC721BOMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721BOMockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721BOMock__factory extends ContractFactory {
  constructor(...args: ERC721BOMockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    uri: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC721BOMock> {
    return super.deploy(
      name,
      symbol,
      uri,
      overrides || {}
    ) as Promise<ERC721BOMock>;
  }
  override getDeployTransaction(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    uri: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name, symbol, uri, overrides || {});
  }
  override attach(address: string): ERC721BOMock {
    return super.attach(address) as ERC721BOMock;
  }
  override connect(signer: Signer): ERC721BOMock__factory {
    return super.connect(signer) as ERC721BOMock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721BOMockInterface {
    return new utils.Interface(_abi) as ERC721BOMockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721BOMock {
    return new Contract(address, _abi, signerOrProvider) as ERC721BOMock;
  }
}
