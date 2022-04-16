import { ethers } from "ethers";
import React, { useContext } from "react";
import { DBankAbi__factory } from "../abis/types";
import { StoreContext } from "../store/context";
import { ActionType } from "../store/types";
import { ADDRESSES } from "../helpers/constants";

export default function Deposit({ callback }: any) {
  const { dispatch, network } = useContext(StoreContext);
  const deposit = async (amount: number) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const dBank = DBankAbi__factory.connect(
        ADDRESSES[network]["dBank"],
        signer
      );
      const tx = await dBank.deposit({
        value: amount.toString(),
      });

      await tx.wait();

      callback();
    } catch (e: any) {
      console.log("Error, deposit: ", e.data.message);

      dispatch({
        type: ActionType.SET_ALERT,
        payload: {
          isError: true,
          message: e.data.message.replace(
            "VM Exception while processing transaction: revert ",
            ""
          ),
        },
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl"> How much do you want to deposit?</h2>
      (min. amount is 0.01 ETH)
      <br></br>
      (1 deposit is possible at the time)
      <br></br>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let amount = +(e.target as any)[0].value;
          amount = amount * 10 ** 18; //convert to wei
          deposit(amount);
        }}
      >
        <div className="form-group mr-sm-2">
          <br></br>
          <input
            id="depositAmount"
            step="0.01"
            min="0.01"
            type="number"
            className="form-control form-control-md"
            placeholder="amount..."
            required
          />
        </div>
        <button type="submit" className="bg-blue-400 text-white mt-5">
          DEPOSIT
        </button>
      </form>
    </div>
  );
}
