import styled from "styled-components";

export const RoledDiceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RollingDice = styled.img`
  height: 100px;
  width: 100px;
`;

export const RolledDice = styled.img`
  height: 100px;
  width: 100px;
`;

export const TimerCount = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

export const BetResult = styled.span`
  font-size: 30px;
  font-weight: 600;
  margin: 40px;
  color: ${(props) => (props.won ? "#33ff77" : "red")};
`;

export const GameProcessContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

export const PlaceBetText = styled.span`
  font-size: 30px;
  font-weight: 600;
`;