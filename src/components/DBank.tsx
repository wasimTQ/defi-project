import TokenJson from "../abis/Token.abi.json";
import DBankJson from "../abis/dBank.abi.json";
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
import { EventsEnum } from "../store/types";
import { convertToEther, getAddress } from "../helpers/utils";
import { DepositEvent, WithdrawEvent } from "../abis/types/DBankAbi";
import { NETWORK_ID } from "../helpers/constants";

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
  const [chainId, setChainId] = useState<string>();
  const [token, setToken] = useState<TokenAbiInterface>();
  const [dBank, setDBank] = useState<DBankAbiInterface>();
  const [web3Provider, setWeb3Provider] = useState<Web3Provider>();
  const [depositEventValues, setDepositEventValues] = useState<any>();
  const [withdrawEventValues, setWithdrawEventValues] = useState<any>();

  const { dispatch } = useContext(StoreContext);

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
    }
  };

  const setDepositEvents = (events: DepositEvent[], address: string) => {
    const payload = events.map((event) => {
      if (event.args.user === address) {
        return {
          amount: event.args.etherAmount.toString(),
          depositedAt: event.args.timeStart.toString(),
        };
      }
    });

    if (dispatch) {
      dispatch({
        type: EventsEnum.SET_DEPOSIT,
        payload,
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

    const payload = events.map((event) => {
      if (event.args.user === address) {
        return {
          amount: event.args.etherAmount.toString(),
          depositedAt: event.args.timeStart.toString(),
        };
      }
    });

    if (dispatch) {
      dispatch({
        type: EventsEnum.SET_DEPOSIT,
        payload,
      });
    }
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

    if (dispatch) {
      dispatch({
        type: EventsEnum.SET_WITHDRAW,
        payload,
      });
    }
  };

  const setProvider = async () => {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setWeb3Provider(provider);
    const accounts = await provider.listAccounts();
    const account = accounts[0];
    const acntBal = await provider.getBalance(account);
    setAccount({
      address: account,
      balance: acntBal.toString(),
    });
    const network = await provider.getNetwork();

    const token = TokenAbi__factory.connect(
      getAddress(TokenJson.networks, NETWORK_ID),
      provider
    );
    setToken({
      abi: token,
    });
    const dBank = DBankAbi__factory.connect(
      getAddress(DBankJson.networks, NETWORK_ID),
      provider
    );
    const ethBal = await dBank.etherBalanceOf(account);
    // console.log(convertToEther(ethBal.toString()));
    if (dispatch) {
      dispatch({
        type: EventsEnum.SET_WALLET,
        payload: ethBal.toString(),
      });
    }

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

  return (
    <div className="">
      <nav className="py-3 px-7 bg-indigo-600 text-white flex justify-between items-center">
        <img src="/assets/dbank.png" className="h-8" alt="" />
        <h6>{account?.address}</h6>
        <b>Balance: {convertToEther(account?.balance)}</b>
      </nav>
      <main className="py-5 px-7">
        <h5 className="mb-4">The token address is {token?.abi.address}</h5>
        <div className="flex gap-6">
          <div className="w-full">
            <Tab.Group>
              <Tab.List className={`border-blue-200 border rounded-lg`}>
                {tabs.map((tab, i) => (
                  <Tab as={Fragment} key={i}>
                    {({ selected }) => (
                      <button
                        className={`py-2 px-3 ${
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
              <Tab.Panels
                className={`mt-2 border border-indigo-100 px-5 py-3 rounded-lg`}
              >
                {tabs.map((tab, i) => (
                  <Tab.Panel key={i}>{tab.component}</Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
          <div className="w-5/12">
            <Events />
          </div>
        </div>
      </main>
    </div>
  );
}
