"use server";

import Fetch from "..";
import { getApiQuery } from "../helper";
import { ApiQuery, Paging } from "../type";
import { transactionApiPaths } from "./path";
import { Transaction } from "./type";

export const getTransactions = async (query: ApiQuery) => {
  const response = await Fetch.Get<Paging<Transaction>>(
    transactionApiPaths.list + getApiQuery(query),
    "getTransactions"
  );
  return response;
};

export const getTrasaction = async (query: ApiQuery) => {
  const response = await Fetch.Get<Transaction>(
    transactionApiPaths.detail + getApiQuery(query),
    "getTransaction"
  );
  return response;
};

export const createTransaction = async (data: Transaction) => {
  const response = await Fetch.Post<Transaction, Transaction>(
    transactionApiPaths.create,
    data,
    "createTransaction"
  );
  return response;
};

export const updateTransaction = async (query: ApiQuery, data: Transaction) => {
  const response = await Fetch.Put<Transaction, any>(
    transactionApiPaths.update + getApiQuery(query),
    data,
    "updateTransaction"
  );
  return response;
};

export const removeTransactions = async (query: ApiQuery) => {
  const response = await Fetch.Delete<any, any>(
    transactionApiPaths.remove + getApiQuery(query),
    "removeTransactions"
  );
  return response;
};
