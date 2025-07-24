import styled from 'styled-components';
import { useBalance } from '../context/BalanceContext';
import formatCurrency from '../functions/currencyConvertion';
import theme from '../theme';

const BalanceBarStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${() => theme.azulClaro || '#007bff'};
  color: white;
  font-weight: bold;
  border-radius: 8px;
  margin-bottom: 1rem;
  
  p {
    margin: 0;
    font-size: 1.1rem;
  }
  
  .balance-amount {
    font-size: 1.3rem;
  }
`;

const BalanceBarPositive = styled(BalanceBarStyled)`
  background-color: #28a745; /* Verde para balance positivo */
`;

const BalanceBarNegative = styled(BalanceBarStyled)`
  background-color: #dc3545; /* Rojo para balance negativo */
`;

const BalanceBar = () => {
  const { balance } = useBalance();
  
  const BarComponent = balance >= 0 ? BalanceBarPositive : BalanceBarNegative;
  
  return (
    <BarComponent>
      <p>Available balance:</p>
      <p className="balance-amount">{formatCurrency(balance)}</p>
    </BarComponent>
  );
};

export default BalanceBar;