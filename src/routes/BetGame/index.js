import { useSelector } from 'react-redux';
import BetProcess from "../../components/BetProcess";
import BetTable from "../../components/BetTable";
import {
  GameTitleContainer,
  Header,
  PageContainer,
  UserBalanceContainer,
} from "./styledComponents";


export default function BetGame() {

  const userBalance = useSelector((state) => state.userBalance);
  
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
      <BetProcess />
      <BetTable/>
    </PageContainer>
  );
}
