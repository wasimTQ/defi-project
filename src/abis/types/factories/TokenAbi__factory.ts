/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TokenAbi, TokenAbiInterface } from "../TokenAbi";

const _abi = [
  {
    inputs: [],
    stateMutability: "payable",
    type: "constructor",
    payable: true,
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
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
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
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "MinterChanged",
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
        indexed: false,
        internalType: "uint256",
        name: "value",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
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
    constant: true,
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "minter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
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
    constant: true,
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
    constant: true,
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
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "dBank",
        type: "address",
      },
    ],
    name: "passMinterRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526040518060400160405280601b81526020017f446563656e7472616c697a65642042616e6b2043757272656e637900000000008152506040518060400160405280600381526020017f444243000000000000000000000000000000000000000000000000000000000081525081600390805190602001906200008892919062000107565b508060049080519060200190620000a192919062000107565b506012600560006101000a81548160ff021916908360ff160217905550505033600560016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620001bd565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826200013f57600085556200018b565b82601f106200015a57805160ff19168380011785556200018b565b828001600101855582156200018b579182015b828111156200018a5782518255916020019190600101906200016d565b5b5090506200019a91906200019e565b5090565b5b80821115620001b95760008160009055506001016200019f565b5090565b61165080620001cd6000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c806340c10f191161008c578063a457c2d711610066578063a457c2d71461045a578063a9059cbb146104be578063d7fc5b1514610522578063dd62ed3e1461057c576100ea565b806340c10f191461033157806370a082311461037f57806395d89b41146103d7576100ea565b806318160ddd116100c857806318160ddd1461020a57806323b872dd14610228578063313ce567146102ac57806339509351146102cd576100ea565b806306fdde03146100ef5780630754617214610172578063095ea7b3146101a6575b600080fd5b6100f76105f4565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561013757808201518184015260208101905061011c565b50505050905090810190601f1680156101645780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61017a610696565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101f2600480360360408110156101bc57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506106bc565b60405180821515815260200191505060405180910390f35b6102126106da565b6040518082815260200191505060405180910390f35b6102946004803603606081101561023e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506106e4565b60405180821515815260200191505060405180910390f35b6102b46107bd565b604051808260ff16815260200191505060405180910390f35b610319600480360360408110156102e357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506107d4565b60405180821515815260200191505060405180910390f35b61037d6004803603604081101561034757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610887565b005b6103c16004803603602081101561039557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061093b565b6040518082815260200191505060405180910390f35b6103df610983565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561041f578082015181840152602081019050610404565b50505050905090810190601f16801561044c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6104a66004803603604081101561047057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610a25565b60405180821515815260200191505060405180910390f35b61050a600480360360408110156104d457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610af2565b60405180821515815260200191505060405180910390f35b6105646004803603602081101561053857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610b10565b60405180821515815260200191505060405180910390f35b6105de6004803603604081101561059257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610c66565b6040518082815260200191505060405180910390f35b606060038054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561068c5780601f106106615761010080835404028352916020019161068c565b820191906000526020600020905b81548152906001019060200180831161066f57829003601f168201915b5050505050905090565b600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006106d06106c9610ced565b8484610cf5565b6001905092915050565b6000600254905090565b60006106f1848484610eec565b6107b2846106fd610ced565b6107ad8560405180606001604052806028815260200161155860289139600160008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000610763610ced565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546111ad9092919063ffffffff16565b610cf5565b600190509392505050565b6000600560009054906101000a900460ff16905090565b600061087d6107e1610ced565b8461087885600160006107f2610ced565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461126d90919063ffffffff16565b610cf5565b6001905092915050565b600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461092d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602b81526020018061152d602b913960400191505060405180910390fd5b61093782826112f5565b5050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b606060048054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a1b5780601f106109f057610100808354040283529160200191610a1b565b820191906000526020600020905b8154815290600101906020018083116109fe57829003601f168201915b5050505050905090565b6000610ae8610a32610ced565b84610ae3856040518060600160405280602581526020016115f66025913960016000610a5c610ced565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546111ad9092919063ffffffff16565b610cf5565b6001905092915050565b6000610b06610aff610ced565b8484610eec565b6001905092915050565b6000600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610bb8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602d8152602001806115c9602d913960400191505060405180910390fd5b81600560016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff167f3b0007eb941cf645526cbb3a4fdaecda9d28ce4843167d9263b536a1f1edc0f683604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a260019050919050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610d7b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001806115a56024913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610e01576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806114e56022913960400191505060405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040518082815260200191505060405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610f72576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260258152602001806115806025913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610ff8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001806114c26023913960400191505060405180910390fd5b6110038383836114bc565b61106e81604051806060016040528060268152602001611507602691396000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546111ad9092919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611101816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461126d90919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a3505050565b600083831115829061125a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561121f578082015181840152602081019050611204565b50505050905090810190601f16801561124c5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060008385039050809150509392505050565b6000808284019050838110156112eb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081525060200191505060405180910390fd5b8091505092915050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611398576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f45524332303a206d696e7420746f20746865207a65726f20616464726573730081525060200191505060405180910390fd5b6113a4600083836114bc565b6113b98160025461126d90919063ffffffff16565b600281905550611410816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461126d90919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050565b50505056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e63654572726f722c206d73672e73656e64657220646f6573206e6f742068617665206d696e74657220726f6c6545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f20616464726573734572726f722c206f6e6c79206f776e65722063616e206368616e67652070617373206d696e74657220726f6c6545524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa2646970667358221220bf8bad7dd20066e490acbc950f7823d922f146f7487c0768396fc9c6b6e79aca64736f6c63430007060033";

type TokenAbiConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TokenAbiConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TokenAbi__factory extends ContractFactory {
  constructor(...args: TokenAbiConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "TokenAbi";
  }

  deploy(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<TokenAbi> {
    return super.deploy(overrides || {}) as Promise<TokenAbi>;
  }
  getDeployTransaction(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TokenAbi {
    return super.attach(address) as TokenAbi;
  }
  connect(signer: Signer): TokenAbi__factory {
    return super.connect(signer) as TokenAbi__factory;
  }
  static readonly contractName: "TokenAbi";
  public readonly contractName: "TokenAbi";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenAbiInterface {
    return new utils.Interface(_abi) as TokenAbiInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TokenAbi {
    return new Contract(address, _abi, signerOrProvider) as TokenAbi;
  }
}