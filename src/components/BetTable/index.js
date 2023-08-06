import BetItemPlacer from "../BetItemPlacer";
import {  DiceFaces } from "../../Config/Constants";
import {
  BetItemPlacerContainer,
} from "./styledComponents";

export default function BetTable({
  betAmounts,
  increaseBets,
  rolledDiceValue,
  allowBetting,
}) {
  
  return (
    <BetItemPlacerContainer>
      {DiceFaces.map((faceId, index) => {
        return (
          <BetItemPlacer
            key={`betItem-${faceId}`}
            diceNumber={index + 1}
            diceId={faceId}
            allowBetting={allowBetting}
            betAmount={betAmounts?.[faceId] ?? 0}
            isRolledDice={rolledDiceValue === faceId}
            increaseBet={increaseBets}
          />
        );
      })}
    </BetItemPlacerContainer>
  );
}
