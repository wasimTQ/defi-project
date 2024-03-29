import React, { createContext, useEffect, useMemo, useReducer } from "react";
import Reducer from "./reducer";
import { ContextState, ActionType } from "./types";

const initialState: any = {
  events: {
    deposit: [],
    withdraw: [],
  },
  alert: {
    isError: true,
    message: "",
  },
  walletBalance: "",
  network: "ropsten",
};

export const StoreContext = createContext<ContextState>({} as ContextState);
export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    if (state.alert.message.length > 0) {
      setTimeout(() => {
        dispatch({
          type: ActionType.SET_ALERT,
          payload: {
            isError: true,
            message: "",
          },
        });
      }, 1500);
    }
  }, [state]);

  const stateProvider = useMemo(
    () => ({
      ...state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <StoreContext.Provider value={stateProvider}>
      {children}
    </StoreContext.Provider>
  );
};
