import { ContextState, ContextAction, EventsEnum } from "./types";
export default (state: ContextState, action: ContextAction) => {
  switch (action.type) {
    case EventsEnum.SET_DEPOSIT:
      return {
        ...state,
        events: {
          ...state.events,
          deposit: action.payload,
        },
      };

    case EventsEnum.SET_WITHDRAW:
      return {
        ...state,
        events: {
          ...state.events,
          withdraw: action.payload,
        },
      };

    case EventsEnum.SET_ALERT:
      return {
        ...state,
        alert: action.payload,
      };

    case EventsEnum.SET_WALLET:
      return {
        ...state,
        walletBalance: action.payload,
      };
    default:
      return { ...state };
  }
};
