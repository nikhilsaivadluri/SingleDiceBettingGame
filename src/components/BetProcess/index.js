import { useCallback, useEffect, useRef, useState } from "react";
import {
  BetResult,
  GameProcessContainer,
  PlaceBetText,
  RoledDiceContainer,
  RolledDice,
  RollingDice,
} from "./styledComponents";
import { DiceImages, DiceFaces } from "../../Config/Constants";

export default function BetProcess({
  clearBets,
  allowBetting,
  betAmounts,
  setUserBalance,
  rolledDiceValue,
  setRolledDiceValue,
  userBalance,
  setAllowBetting,
}) {
  const [isDiceRolling, setIsDiceRolling] = useState(false);
  const [gameTimingCounter, setGameTimingCounter] = useState(0);
  const gameTimer = useRef(null);

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

    setAllowBetting(true);
    gameTimer.current = setInterval(() => {
      setGameTimingCounter((counter) => counter + 1);
    }, 1000);
  };

  const stopBettingAndRollDice = () => {
    if (gameTimer.current) clearInterval(gameTimer.current);

    setAllowBetting(false);
    setIsDiceRolling(true);
    setGameTimingCounter(0);
    setTimeout(() => {
      const rolledDice = Math.ceil((Math.random() * 6) | 0);
      setRolledDiceValue(DiceFaces[rolledDice]);
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
      setUserBalance((balance) => balance + winingAmount);
    }, [5000]);
  };

  const restartGame = () => {
    clearBets();
    setRolledDiceValue(null);
    startBetting();
  };

  const DisplayRolledDice = useCallback(() => {
    if (allowBetting)
      return (
        <PlaceBetText>
          Place your bets... Game starts in {10 - gameTimingCounter}s
        </PlaceBetText>
      );

    if (isDiceRolling) return <RollingDice src="/images/rollingDice.gif" />;

    if (rolledDiceValue)
      return <RolledDice src={`/images/${DiceImages[rolledDiceValue]}`} />;

    return null;
  }, [isDiceRolling, rolledDiceValue, allowBetting, gameTimingCounter]);

  return (
    <GameProcessContainer>
      <RoledDiceContainer>
        <DisplayRolledDice />
      </RoledDiceContainer>
      {rolledDiceValue && (
        <BetResult won={betAmounts[rolledDiceValue] * 2 !== 0}>
          {betAmounts[rolledDiceValue] * 2 !== 0
            ? `You have won $${betAmounts[rolledDiceValue] * 2}`
            : "You lost the bets!"}
        </BetResult>
      )}
    </GameProcessContainer>
  );
}
