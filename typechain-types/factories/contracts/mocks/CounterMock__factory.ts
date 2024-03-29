/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  CounterMock,
  CounterMockInterface,
} from "../../../contracts/mocks/CounterMock";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "current",
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
        name: "count",
        type: "uint256",
      },
    ],
    name: "increment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610025600061002a60201b6100891760201c565b610031565b6000199055565b6102dc806100406000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80637cf5dab01461003b5780639fa6a6e314610050575b600080fd5b61004e61004936600461024d565b61006a565b005b610058610078565b60405190815260200160405180910390f35b6100756000826100ae565b50565b60006100846000610211565b905090565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9055565b60008111610143576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f436f756e7465723a20636f756e74206d7573742062652067726561746572207460448201527f68616e203000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b815460007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821461017d576101788383610266565b61017f565b825b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff810361020a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f436f756e7465723a206f766572666c6f77000000000000000000000000000000604482015260640161013a565b9092555050565b80546000907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146102435780610246565b60005b9392505050565b60006020828403121561025f57600080fd5b5035919050565b808201808211156102a0577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b9291505056fea2646970667358221220644619e17b0ddfde6271a9fe7d7ac48332dec86e198745c661b09f2745bd3a8564736f6c63430008100033";

type CounterMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CounterMockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CounterMock__factory extends ContractFactory {
  constructor(...args: CounterMockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CounterMock> {
    return super.deploy(overrides || {}) as Promise<CounterMock>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): CounterMock {
    return super.attach(address) as CounterMock;
  }
  override connect(signer: Signer): CounterMock__factory {
    return super.connect(signer) as CounterMock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CounterMockInterface {
    return new utils.Interface(_abi) as CounterMockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CounterMock {
    return new Contract(address, _abi, signerOrProvider) as CounterMock;
  }
}
