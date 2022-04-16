import React, { useContext } from "react";
import { convertTimestamp, convertToEther, parseTime } from "../helpers/utils";
import { StoreContext } from "../store/context";

export default function Events() {
  const { events } = useContext(StoreContext);
  const { deposit, withdraw } = events;

  return (
    <div className="flex gap-4">
      <div className="event-wrapper">
        <h4>Deposits:</h4>
        <div className="scroller">
          {deposit.length > 0
            ? deposit.map((event, i) => (
                <div className="notification" key={i}>
                  You've deposited {convertToEther(event.amount)} ETH at{" "}
                  {convertTimestamp(event.depositedAt)}
                </div>
              ))
            : "No deposits till now"}
        </div>
      </div>
      <div className="event-wrapper">
        <h4>Withdraws:</h4>
        <div className="scroller">
          {withdraw.length > 0
            ? withdraw.map((event, i) => (
                <div className="notification" key={i}>
                  You've earned an interest of {convertToEther(event.interest)}{" "}
                  DBC for staking {convertToEther(event.stakedAmount)} ETH for{" "}
                  {parseTime(event.depositTime)}
                </div>
              ))
            : "No Withdrawals till now"}
        </div>
      </div>
    </div>
  );
}
