export type FixedState = {
  amount: number;
  rate: number;
  start: number;
  month: number;
};

export type FixedAction = { type: "update"; payload: Partial<FixedState> };

export const fixedInit: FixedState = {
  amount: 0,
  rate: 0,
  start: Date.now(),
  month: 0,
};

export const fixedReducer = (
  state: FixedState,
  action: FixedAction,
): FixedState => {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
