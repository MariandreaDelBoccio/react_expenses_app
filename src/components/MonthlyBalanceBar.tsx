// components/MonthlyBalanceBar.tsx
import styled from "styled-components";
import theme from "../theme";
import formatCurrency from "../functions/currencyConvertion";

const Bar = styled.div`
  background-color: ${theme.azulClaro}; /* o el que prefieras */
  font-size: 1.25rem;
  letter-spacing: 1px;
  font-weight: 500;
  text-transform: uppercase;
  padding: 0.62rem 2.25rem;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 31.25rem) {
    flex-direction: column;
    font-size: 14px;
  }
`;

type Props = {
  totalIncome: number;
  totalBudgetExpenses: number;
  totalManualExpenses: number;
};

export default function MonthlyBalanceBar({
  totalIncome,
  totalBudgetExpenses,
  totalManualExpenses,
}: Props) {
  const available = totalIncome - totalBudgetExpenses - totalManualExpenses;

  return (
    <Bar>
      <p>Monthly balance:</p>
      <p>{formatCurrency(available)}</p>
    </Bar>
  );
}
