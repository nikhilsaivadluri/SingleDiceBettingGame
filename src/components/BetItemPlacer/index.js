import { useDispatch, useSelector } from 'react-redux';
import { DiceImages } from "../../Config/Constants";
import { increaseBet } from "../../actions";
import {
  BetAmountHeading,
  BetAmountValue,
  BetItemContainer,
  DiceImage,
  IncreaseBetButton
} from "./styleComponents";
export default function BetItemPlacer({
  diceNumber,
  diceId,
}) {
  const betAmount = useSelector((state) => state.betAmounts[diceId]);
  const userBalance = useSelector((state) => state.userBalance);
  const rolledDiceFace = useSelector((state) => state.rolledDiceFace);
  const allowBetting = useSelector((state) => state.allowBetting);
  const dispatch = useDispatch();

  if (!diceNumber) return null;

  const increaseBetClick = () => {
    if (userBalance > 0) {
      dispatch(increaseBet(diceId));
    } else {
      alert("No balance to place bet");
    }
  };
  
  return (
    <BetItemContainer isRolledDice={rolledDiceFace===diceId} >
      <BetAmountHeading>Bet Amount</BetAmountHeading>
      <BetAmountValue>${betAmount}</BetAmountValue>
      <DiceImage src={`/images/${DiceImages[diceId]}`} alt={diceId} />
      <IncreaseBetButton 
         color="success"
         variant="contained"
         disabled={!allowBetting}
         onClick={increaseBetClick}>
        Increase bet $1
      </IncreaseBetButton>
    </BetItemContainer>
  );
}
