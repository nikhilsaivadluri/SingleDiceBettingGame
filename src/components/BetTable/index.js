import { DiceFaces } from "../../Config/Constants";
import BetItemPlacer from "../BetItemPlacer";
import {
  BetItemPlacerContainer,
} from "./styledComponents";

export default function BetTable() {
  
  return (
    <BetItemPlacerContainer>
      {DiceFaces.map((faceId, index) => {
        return (
          <BetItemPlacer
            key={`betItem-${faceId}`}
            diceNumber={index + 1}
            diceId={faceId}
          />
        );
      })}
    </BetItemPlacerContainer>
  );
}
