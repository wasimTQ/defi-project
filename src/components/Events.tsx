import React, { useContext } from "react";
import { convertTimestamp, convertToEther, parseTime } from "../helpers/utils";
import { StoreContext } from "../store/context";

export default function Events() {
  const { events } = useContext(StoreContext);
  const { deposit, withdraw } = events;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="text-xl">Deposits:</h4>
        <div className="flex flex-col gap-2 mt-3">
          {deposit.length > 0
            ? deposit.map((event, i) => (
                <div className="px-4 py-1 rounded-lg bg-gray-50" key={i}>
                  You've deposited {convertToEther(event.amount)} ETH at{" "}
                  {convertTimestamp(event.depositedAt)}
                </div>
              ))
            : "No deposits till now"}
        </div>
      </div>
      <div>
        <h4 className="text-xl">Withdraws:</h4>
        <div className="flex flex-col gap-2 mt-3">
          {withdraw.length > 0
            ? withdraw.map((event, i) => (
                <div className="px-4 py-1 rounded-lg bg-gray-50" key={i}>
                  You've earned an interest of {convertToEther(event.interest)}{" "}
                  ETH for staking {convertToEther(event.stakedAmount)} ETH of{" "}
                  {parseTime(event.depositTime)}
                </div>
              ))
            : "No Withdrawals till now"}
        </div>
      </div>
    </div>
  );
}
