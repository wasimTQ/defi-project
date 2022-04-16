export interface ContextState {
  alert: {
    isError: boolean;
    message: string;
  };
  events: {
    deposit: {
      amount: string;
      depositedAt: string;
    }[];
    withdraw: {
      earned: string;
      depositTime: string;
      interest: string;
      stakedAmount: string;
    }[];
  };

  walletBalance: string;
  network: string;

  dispatch: React.Dispatch<ContextAction>;
}

export enum ActionType {
  SET_WITHDRAW,
  SET_DEPOSIT,
  SET_ALERT,
  SET_WALLET,
  SET_NETWORK
}

export interface ContextAction {
  type: ActionType;
  payload: any;
}
