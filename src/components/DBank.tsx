import { Tab } from "@headlessui/react";
import { ethers } from "ethers";
import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  DBankAbi,
  DBankAbi__factory,
  TokenAbi,
  TokenAbi__factory,
} from "../abis/types";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import { Web3Provider } from "@ethersproject/providers";
import Events from "./Events";
import { StoreContext } from "../store/context";
import { ActionType } from "../store/types";
import { convertToEther } from "../helpers/utils";
import { DepositEvent, WithdrawEvent } from "../abis/types/DBankAbi";
import {
  ADDRESSES,
  AVAILABLE_NETWORKS,
  CHAIN_PARAMS,
} from "../helpers/constants";
interface DefaultTokenInterface {
  balance?: string;
  name?: string;
}
interface Account {
  address: string;
  balance?: string;
}

interface TokenAbiInterface extends DefaultTokenInterface {
  abi: TokenAbi;
}

interface DBankAbiInterface extends DefaultTokenInterface {
  abi: DBankAbi;
  address?: string;
  etherBalance?: string;
}

export default function DBank() {
  const [account, setAccount] = useState<Account>();
  const [token, setToken] = useState<TokenAbiInterface>();
  const [dBank, setDBank] = useState<DBankAbiInterface>();
  const [web3Provider, setWeb3Provider] = useState<Web3Provider>();

  const { dispatch, network } = useContext(StoreContext);

  const setNetwork = (name: string) => {
    dispatch({
      type: ActionType.SET_NETWORK,
      payload: name,
    });
  };
  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  const updateBalance = async () => {
    if (web3Provider) {
      const accounts = await web3Provider.listAccounts();
      const account = accounts[0];
      const acntBal = await web3Provider.getBalance(account);

      setAccount({
        address: account,
        balance: acntBal.toString(),
      });

      const ethBal = await dBank?.abi.etherBalanceOf(account);

      dispatch({
        type: ActionType.SET_WALLET,
        payload: ethBal?.toString(),
      });
    }
  };

  const depositEvents = async (address?: string, fallbackAbi?: DBankAbi) => {
    let filter,
      events: DepositEvent[] = [];

    if (dBank?.abi) {
      filter = dBank.abi.filters.Deposit();
      events = await dBank.abi.queryFilter(filter, 0);
    } else if (fallbackAbi) {
      filter = fallbackAbi.filters.Deposit();
      events = await fallbackAbi.queryFilter(filter, 0);
    }

    address = address ?? account?.address;
    events.reverse();
    events = events.filter((event) => event.args.user === address);
    const payload = events.map((event) => {
      if (event.args.user === address) {
        return {
          amount: event.args.etherAmount.toString(),
          depositedAt: event.args.timeStart.toString(),
        };
      }
    });

    dispatch({
      type: ActionType.SET_DEPOSIT,
      payload,
    });
  };

  const withdrawEvents = async (address?: string, fallbackAbi?: DBankAbi) => {
    let filter,
      events: WithdrawEvent[] = [];

    if (dBank?.abi) {
      filter = dBank.abi.filters.Withdraw();
      events = await dBank.abi.queryFilter(filter, 0);
    } else if (fallbackAbi) {
      filter = fallbackAbi.filters.Withdraw();
      events = await fallbackAbi.queryFilter(filter, 0);
    }

    address = address ?? account?.address;

    events.reverse();

    events = events.filter((event) => event.args.user === address);
    const payload = events.map((event) => {
      if (event.args.user === address) {
        return {
          earned: event.args.etherAmount.add(event.args.interest).toString(),
          depositTime: event.args.depositTime.toString(),
          interest: event.args.interest.toString(),
          stakedAmount: event.args.etherAmount.toString(),
        };
      }
    });

    dispatch({
      type: ActionType.SET_WITHDRAW,
      payload,
    });
  };

  const setProvider = async () => {
    await requestAccount();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { name } = await provider.getNetwork();
    const network = name === "unknown" ? "localhost" : name;
    setNetwork(network);
    const accounts = await provider.listAccounts();
    const account = accounts[0];

    const acntBal = await provider.getBalance(account);

    setAccount({
      address: account,
      balance: acntBal.toString(),
    });

    const token = TokenAbi__factory.connect(
      ADDRESSES[network]["token"],
      provider
    );
    setToken({
      abi: token,
    });
    const dBank = DBankAbi__factory.connect(
      ADDRESSES[network]["dBank"],
      provider
    );
    const ethBal = await dBank.etherBalanceOf(account);

    dispatch({
      type: ActionType.SET_WALLET,
      payload: ethBal.toString(),
    });

    setWeb3Provider(provider);
    setDBank({
      abi: dBank,
      etherBalance: ethBal.toString(),
    });

    depositEvents(account, dBank);
    withdrawEvents(account, dBank);
  };

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setProvider();

      window.ethereum.on("accountsChanged", (accounts: any) => {
        setProvider();
      });
      window.ethereum.on("networkChanged", (networkId: any) => {
        setProvider();
      });
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }, []);

  const tabs = [
    {
      heading: "Deposit",
      component: (
        <Deposit
          callback={() => {
            updateBalance();
            depositEvents();
          }}
        />
      ),
    },
    {
      heading: "Withdraw",
      component: (
        <Withdraw
          callback={() => {
            updateBalance();
            withdrawEvents();
          }}
        />
      ),
    },
  ];

  if (!AVAILABLE_NETWORKS.includes(network))
    return (
      <div className="flex flex-col text-xl justify-center items-center h-screen">
        <h5 className="text-3xl">The {network} network is not available ATM</h5>
        <h4>Please connect to ropsten</h4>
        <div className="flex flex-col gap-4 mt-4">
          {AVAILABLE_NETWORKS.map((network) => (
            <button
              onClick={async () => {
                try {
                  await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [
                      { chainId: (CHAIN_PARAMS as any)[network].chainId },
                    ], 
                  });
                } catch (error: any) {
                  if (error.code === 4902) {
                    try {
                      await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [(CHAIN_PARAMS as any)[network]],
                      });
                    } catch (addError) {
                      console.error(addError);
                    }
                  }
                }
              }}
              className="bg-yellow-400 text-gray-900 font-semibold"
            >
              Switch to {network}
            </button>
          ))}
        </div>
      </div>
    );

  return (
    <div className="">
      <nav className="py-3 px-7 fixed top-0 w-full bg-blue-900 text-white flex justify-between items-center">
        <img src="/assets/dbank.png" className="h-8" alt="" />
        <h6>{account?.address}</h6>
        <b>Balance: {convertToEther(account?.balance)}</b>
      </nav>
      <main className="py-5 px-7 mt-16">
        <div className="flex gap-6 justify-between">
          <div className="w-1/3">
            <h5>You're currently on</h5>
            <h4 className="px-3 py-1 rounded-lg bg-gray-500 mb-4 inline-block">
              {network}
            </h4>
            <h5 className="mb-4">Address for token to use on metamask</h5>
            <div className="rounded-lg mb-4 px-3 py-1 max-w-sm bg-slate-600 flex gap-3 justify-between">
              <h4
                style={{
                  maxWidth: "25ch",
                }}
                className="overflow-hidden"
              >
                {token?.abi.address}
              </h4>
              <span>
                <svg
                  onClick={() => {
                    navigator.clipboard.writeText(token?.abi.address!);
                  }}
                  className="w-6 h-6 cursor-pointer"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </span>
            </div>

            <Tab.Group>
              <Tab.List className={`rounded-lg`}>
                {tabs.map((tab, i) => (
                  <Tab as={Fragment} key={i}>
                    {({ selected }) => (
                      <button
                        className={`py-2 rounded-full px-3 mr-2 ${
                          selected
                            ? "bg-indigo-500 text-white"
                            : "bg-gray-100 text-black"
                        }`}
                      >
                        {tab.heading}
                      </button>
                    )}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className={`mt-2 bg-gray-700 px-5 py-3 rounded-lg`}>
                {tabs.map((tab, i) => (
                  <Tab.Panel key={i}>{tab.component}</Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
          <div className="w-2/3">
            <Events />
          </div>
        </div>
      </main>
    </div>
  );
}
