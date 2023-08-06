import styled from "styled-components";
import Button from '@mui/material/Button';

export const BetItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  height: 250px;
  width: 200px;
  border-radius: 25px;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${props =>props.isRolledDice?'#00e64d':'#FFFFFF'};
  margin: 16px;
`;

export const DiceImage = styled.img`
  height: 100px;
  width: 100px;
`;

export const IncreaseBetButton = styled(Button)`
  padding: 6px 16px;
  border-radius: 4px;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  color: #fff;
  border: none;
  text-wrap: wrap;
`;

export const BetAmountHeading = styled.span`
  font-size: 16px;
  font-style: italic;
  font-weight: 500;
`;

export const BetAmountValue = styled.span`
  font-size: 16px;
  font-style: italic;
  font-weight: 700;
`;
