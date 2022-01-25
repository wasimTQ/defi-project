import { ethers } from "ethers";
import React, { useContext } from "react";
import { DBankAbi__factory } from "../abis/types";
import { NETWORK_ID } from "../helpers/constants";
import DBankJson from "../abis/dBank.abi.json";
import { convertToEther, getAddress } from "../helpers/utils";
import { StoreContext } from "../store/context";
import { ActionType } from "../store/types";

export default function Withdraw({ callback }: any) {
  const { dispatch, walletBalance } = useContext(StoreContext);
  const withdraw = async (e: any) => {
    e.preventDefault();

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const dBank = DBankAbi__factory.connect(
        getAddress(DBankJson.networks, NETWORK_ID),
        signer
      );

      const address = await signer.getAddress();

      const withdrawal = await dBank.withdraw({ from: address.toString() });
      await withdrawal.wait();

      console.log("callback");

      callback();
    } catch (e: any) {
      console.log("Error, withdraw: ", e);
      if (dispatch) {
        dispatch({
          type: ActionType.SET_ALERT,
          payload: {
            isError: true,
            message: e.data.message,
          },
        });
      }
    }
  };

  return (
    <div>
      Do you want to withdraw {convertToEther(walletBalance)} ETH + take interest?
      <br></br>
      <br></br>
      <div>
        <button
          onClick={(e) => withdraw(e)}
          type="submit"
          className="bg-blue-400 text-white"
        >
          {/* onClick={(e) => this.withdraw(e)} */}
          WITHDRAW
        </button>
      </div>
    </div>
  );
}
