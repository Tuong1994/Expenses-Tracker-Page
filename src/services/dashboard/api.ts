"use server";

import Fetch from "..";
import { getApiQuery } from "../helper";
import { Transaction } from "../transactions/type";
import { ApiQuery } from "../type";
import { statisticApiPaths } from "./path";
import { StatisticBalance, StatisticReqBody, StatisticSummary, StatisticTotalExpense } from "./type";

export const getSummary = async (statistic: StatisticReqBody) => {
  const response = await Fetch.Post<StatisticReqBody, StatisticSummary>(
    statisticApiPaths.summary,
    statistic,
    "getSummary"
  );
  return response;
};

export const getTotalExpenses = async (query: ApiQuery, statistic: StatisticReqBody) => {
  const response = await Fetch.Post<StatisticReqBody, StatisticTotalExpense[]>(
    statisticApiPaths.totalExpenses + getApiQuery(query),
    statistic,
    "getTotalExpenses"
  );
  return response;
};

export const getBalances = async (statistic: StatisticReqBody) => {
  const response = await Fetch.Post<StatisticReqBody, StatisticBalance>(
    statisticApiPaths.balances,
    statistic,
    "getBalances"
  );
  return response;
};

export const getRecentTransactions = async (query: ApiQuery) => {
  const response = await Fetch.Get<Transaction[]>(
    statisticApiPaths.recentTransactions + getApiQuery(query),
    "getRecentTransactions"
  );
  return response;
};
