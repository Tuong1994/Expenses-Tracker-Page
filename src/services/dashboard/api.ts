"use server";

import Fetch from "..";
import { getApiQuery } from "../helper";
import { Transaction } from "../transactions/type";
import { ApiQuery } from "../type";
import { statisticPaths } from "./path";
import { StatisticBalance, StatisticReqBody, StatisticSummary, StatisticTotalExpense } from "./type";

export const getSummary = async (statistic: StatisticReqBody) => {
  const response = await Fetch.Post<StatisticReqBody, StatisticSummary>(statisticPaths.summary, statistic);
  return response;
};

export const getTotalExpenses = async (query: ApiQuery, statistic: StatisticReqBody) => {
  const response = await Fetch.Post<StatisticReqBody, StatisticTotalExpense[]>(
    statisticPaths.totalExpenses + getApiQuery(query),
    statistic
  );
  return response;
};

export const getBalances = async (statistic: StatisticReqBody) => {
  const response = await Fetch.Post<StatisticReqBody, StatisticBalance>(statisticPaths.balances, statistic);
  return response;
};

export const getRecentTransactions = async (query: ApiQuery) => {
  const response = await Fetch.Get<Transaction[]>(
    statisticPaths.recentTransactions + getApiQuery(query)
  );
  return response;
};
