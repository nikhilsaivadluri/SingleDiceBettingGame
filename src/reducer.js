import {
  ADD_BALANCE,
  ALLOW_BETTING,
  CLEAR_BETS,
  INCREASE_BET,
  STOP_BETTING,
  UPDATE_ROLLED_DICE
} from "./actionTypes";

const initialBetAmountState = {
  diceFaceOne: 0,
  diceFaceTwo: 0,
  diceFaceThree: 0,
  diceFaceFour: 0,
  diceFaceFive: 0,
  diceFaceSix: 0,
};

const initialState = {
  betAmounts: initialBetAmountState,
  userBalance: 100,
  allowBetting: false,
  rolledDiceFace: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE_BET:
      const diceFace = action.payload;
      const userBalance = state.userBalance - 1;
      const betAmounts = { ...state.betAmounts };
      betAmounts[diceFace] += 1;
      return {
        ...state,
        userBalance,
        betAmounts,
      };

    case CLEAR_BETS:
      return {
        ...state,
        betAmounts: initialBetAmountState,
      };

    case ADD_BALANCE:
      const amount = action.payload;
      return {
        ...state,
        userBalance: state.userBalance + amount,
      };

    case ALLOW_BETTING:
      return {
        ...state,
        allowBetting: true,
      };

    case STOP_BETTING:
      return {
        ...state,
        allowBetting: false,
      };

    case UPDATE_ROLLED_DICE:
      const rolledDiceFace = action.payload;
      return {
        ...state,
        rolledDiceFace,
      };

    default:
      return state;
  }
};
export default reducer;
