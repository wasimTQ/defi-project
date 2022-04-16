export const TOKEN_ADDRESS = "0x3F0535143089ec5664801155Ab98Dea333941ED6";
export const DBANK_ADDRESS = "0x43841c67A36620b794BE3240d86824bDee8323b1";

export const AVAILABLE_NETWORKS = ["ropsten"];

type AddressType = {
  [key: string]: {
    dBank: string;
    token: string;
  };
};
export const ADDRESSES: AddressType = {
  ropsten: {
    dBank: "0x83dEd09d728388bB8f08c8bF660C3f7375A1CB85",
    token: "0x16497B2b3FfebE4EE4326C2C7c5B74322823Ce99",
  },
  localhost: {
    dBank: "0x43841c67A36620b794BE3240d86824bDee8323b1",
    token: "0x3F0535143089ec5664801155Ab98Dea333941ED6",
  },
};
export const CHAIN_PARAMS = {
  kovan: {
    chainId: "0x42", 
    chainName: "Kovan",
    nativeCurrency: {
      name: "Kovan Ether",
      symbol: "KOV",
      decimals: 18,
    },
    rpcUrls: [
      "https://kovan.poa.network",
      "http://kovan.poa.network:8545",
      "https://kovan.infura.io/v3/${INFURA_API_KEY}",
      "wss://kovan.infura.io/ws/v3/${INFURA_API_KEY}",
      "ws://kovan.poa.network:8546",
    ],
    blockExplorerUrls: ["https://kovan.etherscan.io"],
  },
  ropsten: {
    chainId: "0x3",
    name: "Ropsten",
    nativeCurrency: {
      name: "Ropsten Ether",
      symbol: "ROP",
      decimals: 18,
    },
    rpcUrls: [
      "https://ropsten.infura.io/v3/${INFURA_API_KEY}",
      "wss://ropsten.infura.io/ws/v3/${INFURA_API_KEY}",
    ],
    blockExplorerUrls: ["https://ropsten.etherscan.io"],
  },
};
