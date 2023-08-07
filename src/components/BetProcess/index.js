import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DiceFaces, DiceImages } from "../../Config/Constants";
import {
  addBalance,
  allowBetting,
  clearBets,
  stopBetting,
  updateRolledDiceFace,
} from "../../actions";
import {
  BetResult,
  GameProcessContainer,
  PlaceBetText,
  RoledDiceContainer,
  RolledDice,
  RollingDice,
} from "./styledComponents";

export default function BetProcess() {
  const [isDiceRolling, setIsDiceRolling] = useState(false);
  const [gameTimingCounter, setGameTimingCounter] = useState(0);
  const gameTimer = useRef(null);

  const betAmounts = useSelector((state) => state.betAmounts);
  const userBalance = useSelector((state) => state.userBalance);
  const allowBettingFlag = useSelector((state) => state.allowBetting);
  const rolledDiceFace = useSelector((state) => state.rolledDiceFace);

  const dispatch = useDispatch();

  useEffect(() => {
    startBetting();
    return () => {
      clearInterval(gameTimer.current);
    };
  }, []);

  useEffect(() => {
    //console.log("timer " + gameTimingCounter);

    if (gameTimingCounter === 10) stopBettingAndRollDice();
  }, [gameTimingCounter]);

  const startBetting = () => {
    if (userBalance === 0) {
      alert("You have no amount to start betting");
      return;
    }

    dispatch(allowBetting());
    gameTimer.current = setInterval(() => {
      setGameTimingCounter((counter) => counter + 1);
    }, 1000);
  };

  const stopBettingAndRollDice = () => {
    if (gameTimer.current) clearInterval(gameTimer.current);

    dispatch(stopBetting());
    setIsDiceRolling(true);
    setGameTimingCounter(0);
    setTimeout(() => {
      const rolledDice = Math.ceil((Math.random() * 6) | 0);
      dispatch(updateRolledDiceFace(DiceFaces[rolledDice]));
      setIsDiceRolling(false);
      const winingAmount = betAmounts[DiceFaces[rolledDice]] * 2;
      updateUserBalance(winingAmount);
    }, [2000]);

    setTimeout(() => {
      restartGame();
    }, [7000]);
  };

  const updateUserBalance = (winingAmount) => {
    setTimeout(() => {
      dispatch(addBalance(winingAmount));
    }, [5000]);
  };

  const restartGame = () => {
    dispatch(clearBets());
    dispatch(updateRolledDiceFace(null));
    startBetting();
  };

  const DisplayRolledDice = useCallback(() => {
    if (allowBettingFlag)
      return (
        <PlaceBetText>
          Place your bets... Game starts in {10 - gameTimingCounter}s
        </PlaceBetText>
      );

    if (isDiceRolling) return <RollingDice src="/images/rollingDice.gif" />;

    if (rolledDiceFace)
      return <RolledDice src={`/images/${DiceImages[rolledDiceFace]}`} />;

    return null;
  }, [isDiceRolling, rolledDiceFace, allowBettingFlag, gameTimingCounter]);

  return (
    <GameProcessContainer>
      <RoledDiceContainer>
        <DisplayRolledDice />
      </RoledDiceContainer>
      {rolledDiceFace && (
        <BetResult won={betAmounts[rolledDiceFace] * 2 !== 0}>
          {betAmounts[rolledDiceFace] * 2 !== 0
            ? `You have won $${betAmounts[rolledDiceFace] * 2}`
            : "You lost the bets!"}
        </BetResult>
      )}
    </GameProcessContainer>
  );
}
