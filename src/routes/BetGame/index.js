import { useState } from "react";
import BetTable from "../../components/BetTable";
import {
  GameTitleContainer,
  Header,
  PageContainer,
  UserBalanceContainer,
} from "./styledComponents";
import BetProcess from "../../components/BetProcess";

const IntitalBetAmounts = {
  diceFaceOne: 0,
  diceFaceTwo: 0,
  diceFaceThree: 0,
  diceFaceFour: 0,
  diceFaceFive: 0,
  diceFaceSix: 0,
};

export default function BetGame() {
  const [userBalance, setUserBalance] = useState(100);
  const [rolledDiceValue, setRolledDiceValue] = useState(null);
  const [allowBetting, setAllowBetting] = useState(true);

  const [betAmounts, setBetAmounts] = useState(IntitalBetAmounts);

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

  const clearBets =()=>{
    setBetAmounts(IntitalBetAmounts);
  }

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
      <BetProcess
        betAmounts={betAmounts}
        clearBets={clearBets}
        allowBetting={allowBetting}
        setUserBalance={setUserBalance}
        rolledDiceValue={rolledDiceValue}
        setRolledDiceValue={setRolledDiceValue}
        userBalance={userBalance}
        setAllowBetting={setAllowBetting}
      />

      <BetTable
        betAmounts={betAmounts}
        increaseBets={increaseBets}
        rolledDiceValue={rolledDiceValue}
        allowBetting={allowBetting}
      />
    </PageContainer>
  );
}
