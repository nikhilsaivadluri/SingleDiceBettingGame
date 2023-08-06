import { useState, useRef, useEffect, useCallback } from "react";
import BetItemPlacer from "../BetItemPlacer";
import { DiceImages, DiceFaces } from "../../Config/Constants";
import {
  BetResult,
  BetItemPlacerContainer,
  Header,
  PlaceBetText,
  GameProcessContainer,
  GameTitleContainer,
  PageContainer,
  UserBalanceContainer,
  RoledDiceContainer,
  RolledDice,
  RollingDice,
  TimerCount,
} from "./styledComponents";

const IntitalBetAmounts = {
  diceFaceOne: 0,
  diceFaceTwo: 0,
  diceFaceThree: 0,
  diceFaceFour: 0,
  diceFaceFive: 0,
  diceFaceSix: 0,
};

export default function BetTable() {
  const [betAmounts, setBetAmounts] = useState(IntitalBetAmounts);
  const [userBalance, setUserBalance] = useState(100);
  const [rolledDiceValue, setRolledDiceValue] = useState(null);
  const [allowBetting, setAllowBetting] = useState(true);
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
    console.log("timer " + gameTimingCounter);

    if (gameTimingCounter === 10) stopBettingAndRollDice();
  }, [gameTimingCounter]);

  const increaseBets = (faceId) => {
    if (userBalance > 0) {
      setUserBalance((balance) => balance - 1);
      setBetAmounts({
        ...betAmounts,
        [faceId]: betAmounts[faceId] + 1,
      });
    } else {
      alert("No balance to place bet");
    }
  };

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
    setBetAmounts(IntitalBetAmounts);
    setRolledDiceValue(null);
    startBetting();
  };

  const DisplayRolledDice = useCallback(() => {
    if (allowBetting)
      return<PlaceBetText>Place your bets... Game starts in {10 - gameTimingCounter}s</PlaceBetText>;

    if (isDiceRolling) return <RollingDice src="/images/rollingDice.gif" />;

    if (rolledDiceValue)
      return <RolledDice src={`/images/${DiceImages[rolledDiceValue]}`} />;

    return null;
  }, [isDiceRolling, rolledDiceValue, allowBetting, gameTimingCounter]);

  return (
    <PageContainer>
      <Header>
        <GameTitleContainer>
          <span>Single dice betting game</span>
        </GameTitleContainer>

        <UserBalanceContainer>
          <span>Balance: ${userBalance}</span>
        </UserBalanceContainer>
      </Header>
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
      <BetItemPlacerContainer>
        {DiceFaces.map((faceId, index) => {
          return (
            <BetItemPlacer
              key={`betItem-${faceId}`}
              diceNumber={index + 1}
              diceId={faceId}
              allowBetting={allowBetting}
              betAmount={betAmounts[faceId]}
              isRolledDice={rolledDiceValue === faceId}
              increaseBet={increaseBets}
            />
          );
        })}
      </BetItemPlacerContainer>
    </PageContainer>
  );
}
