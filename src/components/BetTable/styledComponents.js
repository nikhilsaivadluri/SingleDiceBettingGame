import styled from "styled-components";

export const BetItemPlacerContainer = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-evenly;
  flex-wrap: wrap;
  border: 1px solid #FFFFFF;
  border-radius: 60px;
  padding: 80px;
`;

export const UserBalanceContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 26px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  width: 100%;
  margin: 24px;
`;

export const GameTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 600;
  width: 70%;
  color: cyan;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background: forestgreen;
  min-height: 851px;
`;

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
  color: ${(props) => (props.won ? "#2e7d32" : "red")};
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
