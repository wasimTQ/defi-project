import { ContextState, ContextAction, ActionType } from "./types";
export default (state: ContextState, action: ContextAction) => {
  switch (action.type) {
    case ActionType.SET_DEPOSIT:
      return {
        ...state,
        events: {
          ...state.events,
          deposit: action.payload,
        },
      };

    case ActionType.SET_WITHDRAW:
      return {
        ...state,
        events: {
          ...state.events,
          withdraw: action.payload,
        },
      };

    case ActionType.SET_ALERT:
      return {
        ...state,
        alert: action.payload,
      };

    case ActionType.SET_WALLET:
      return {
        ...state,
        walletBalance: action.payload,
      };
    default:
      return { ...state };
  }
};
