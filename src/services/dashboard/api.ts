"use server";

import FetchServer from "../fetch.server";
import { getApiQuery } from "../helper";
import { Transaction } from "../transactions/type";
import { ApiQuery } from "../type";
import { statisticApiPaths } from "./path";
import { StatisticBalance, StatisticReqBody, StatisticSummary, StatisticTotalExpense } from "./type";

export const getSummary = async (statistic: StatisticReqBody) => {
  const response = await FetchServer.Post<StatisticReqBody, StatisticSummary>(
    statisticApiPaths.summary,
    statistic,
    "getSummary"
  );
  return response;
};

export const getTotalExpenses = async (query: ApiQuery, statistic: StatisticReqBody) => {
  const response = await FetchServer.Post<StatisticReqBody, StatisticTotalExpense[]>(
    statisticApiPaths.totalExpenses + getApiQuery(query),
    statistic,
    "getTotalExpenses"
  );
  return response;
};

export const getBalances = async (statistic: StatisticReqBody) => {
  const response = await FetchServer.Post<StatisticReqBody, StatisticBalance>(
    statisticApiPaths.balances,
    statistic,
    "getBalances"
  );
  return response;
};

export const getRecentTransactions = async (query: ApiQuery) => {
  const response = await FetchServer.Get<Transaction[]>(
    statisticApiPaths.recentTransactions + getApiQuery(query),
    "getRecentTransactions"
  );
  return response;
};
