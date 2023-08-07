import {
  ADD_BALANCE,
  ALLOW_BETTING,
  CLEAR_BETS,
  INCREASE_BET,
  STOP_BETTING,
  UPDATE_BALANCE,
  UPDATE_ROLLED_DICE,
} from "./actionTypes";

const increaseBet = (payload) => {
  return {
    type: INCREASE_BET,
    payload,
  };
};

const clearBets = () => {
  return {
    type: CLEAR_BETS,
  };
};

const updateBalance = (payload) => {
  return {
    type: UPDATE_BALANCE,
    payload,
  };
};

const addBalance = (amount) => {
  return {
    type: ADD_BALANCE,
    payload: amount,
  };
};

const allowBetting = (amount) => {
  return {
    type: ALLOW_BETTING,
  };
};

const stopBetting = (amount) => {
  return {
    type: STOP_BETTING,
  };
};

const updateRolledDiceFace = (faceId) => {
  return {
    type: UPDATE_ROLLED_DICE,
    payload:faceId
  };
};

export {
  addBalance,
  allowBetting,
  clearBets,
  increaseBet,
  stopBetting,
  updateBalance,
  updateRolledDiceFace
};
