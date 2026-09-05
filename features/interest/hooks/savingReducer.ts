export type SavingState = {
  amount: number;
  rate: number;
  start: number;
  end: number;
};

export type SavingAction = { type: "update"; payload: Partial<SavingState> };

export const savingInit: SavingState = {
  amount: 0,
  rate: 0,
  start: Date.now(),
  end: Date.now(),
};

export const savingReducer = (
  state: SavingState,
  action: SavingAction,
): SavingState => {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
