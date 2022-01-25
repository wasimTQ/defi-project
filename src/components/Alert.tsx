import React, { useContext } from "react";
import { StoreContext } from "../store/context";

export default function Alert() {
  const { alert } = useContext(StoreContext);

  if (!alert.message || alert.message.length < 1) return null;
  return (
    <div className="px-5 py-2 bg-red-500 text-white rounded-full fixed left-1/2 top-5 -translate-x-1/2">
      {alert.message}
    </div>
  );
}
