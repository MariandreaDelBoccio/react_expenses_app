import React, { createContext, useContext, useState, useEffect } from 'react';
import  useGetMonthlyExpense  from '../hooks/useGetMonthlyExpense';
import  useGetMonthlyIncome  from '../hooks/useGetMonthlyIncome'; 

interface BalanceContextType {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
}

const BalanceContext = createContext<BalanceContextType>({
  balance: 0,
  totalIncome: 0,
  totalExpenses: 0
});

export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error('useBalance must be used within a BalanceProvider');
  }
  return context;
};

const BalanceProvider = ({ children }: { children: React.ReactNode }) => {
  const [balance, setBalance] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  
  const expenses = useGetMonthlyExpense();
  const incomes = useGetMonthlyIncome(); // Necesitarás crear este hook

  useEffect(() => {
    const expensesTotal = expenses.reduce((acc, expense) => acc + parseFloat(expense.quantity), 0);
    setTotalExpenses(expensesTotal);
  }, [expenses]);

  useEffect(() => {
    const incomeTotal = incomes.reduce((acc, income) => acc + income.amount, 0);
    setTotalIncome(incomeTotal);
  }, [incomes]);

  useEffect(() => {
    setBalance(totalIncome - totalExpenses);
  }, [totalIncome, totalExpenses]);

  return (
    <BalanceContext.Provider value={{ balance, totalIncome, totalExpenses }}>
      {children}
    </BalanceContext.Provider>
  );
};

export { BalanceProvider, BalanceContext };