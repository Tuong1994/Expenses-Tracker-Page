import { ECategoryType } from "../category/enum";

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
  type: ECategoryType;
  name: string;
  amount: number;
  percent: number;
};

export type StatisticBalance = {
  balances: Pick<MonthlyTotal, "month" | "amount">[];
  icomesExpenses: Pick<MonthlyTotal, "month" | "income" | "expense">[];
};

export type StatisticReqBody = {
  startDate: string;
  endDate: string;
};
