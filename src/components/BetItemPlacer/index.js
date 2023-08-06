
import {
  BetAmountHeading,
  BetAmountValue,
  BetItemContainer,
  DiceImage,
  IncreaseBetButton
} from "./styleComponents";
import { DiceImages } from "../../Config/Constants";
export default function BetItemPlacer({
  diceNumber,
  diceId,
  betAmount,
  increaseBet,
  allowBetting,
  isRolledDice
}) {
  if (!diceNumber) return null;

  return (
    <BetItemContainer isRolledDice={isRolledDice} >
      <BetAmountHeading>Bet Amount</BetAmountHeading>
      <BetAmountValue>${betAmount}</BetAmountValue>
      <DiceImage src={`/images/${DiceImages[diceId]}`} alt={diceId} />
      <IncreaseBetButton 
         color="success"
         variant="contained"
         disabled={!allowBetting}
         onClick={() => increaseBet(diceId)}>
        Increase bet $1
      </IncreaseBetButton>
    </BetItemContainer>
  );
}
