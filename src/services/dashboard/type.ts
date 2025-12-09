import { Category } from "../category/type";

type MonthlyTotal = {
  month: string;
  amount: number;
  income: number;
  expense: number;
};

export type StatisticSummary = {
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
  totalTransactions: number;
};

export type StatisticTotalExpense = {
  id: string;
  amount: number;
  percent: number;
  category: Pick<Category, "name" | "type">;
};

export type StatisticBalance = {
  balances: Pick<MonthlyTotal, "month" | "amount">[];
  icomesExpenses: Pick<MonthlyTotal, "month" | "income" | "expense">[];
};

export type StatisticReqBody = {
  startDate: string;
  endDate: string;
};
