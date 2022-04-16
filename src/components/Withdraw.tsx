import { ethers } from "ethers";
import React, { useContext } from "react";
import { DBankAbi__factory } from "../abis/types";
import { convertToEther } from "../helpers/utils";
import { StoreContext } from "../store/context";
import { ActionType } from "../store/types";
import { ADDRESSES } from "../helpers/constants";

export default function Withdraw({ callback }: any) {
  const { dispatch, walletBalance, network } = useContext(StoreContext);
  const withdraw = async (e: any) => {
    e.preventDefault();

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const dBank = DBankAbi__factory.connect(
        ADDRESSES[network]["dBank"],
        signer
      );

      const address = await signer.getAddress();

      const withdrawal = await dBank.withdraw({ from: address.toString() });
      await withdrawal.wait();

      console.log("callback");

      callback();
    } catch (e: any) {
      console.log("Error, withdraw: ", e);

      dispatch({
        type: ActionType.SET_ALERT,
        payload: {
          isError: true,
          message: e.data.message,
        },
      });
    }
  };
  if (Number(walletBalance) === 0) return <h5>You don't have a balance</h5>;
  return (
    <div>
      Do you want to withdraw {convertToEther(walletBalance)} ETH + take
      interest?
      <br></br>
      <br></br>
      <div>
        <button
          onClick={(e) => withdraw(e)}
          type="submit"
          className="bg-blue-400 text-white"
        >
          WITHDRAW
        </button>
      </div>
    </div>
  );
}
