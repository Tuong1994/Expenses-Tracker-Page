import Fetch from "..";
import { getApiQuery } from "../helper";
import { ApiQuery, Paging } from "../type";
import { transactionPaths } from "./path";
import { Transaction } from "./type";

export const getTransactions = async (query: ApiQuery) => {
  const response = await Fetch.Get<Paging<Transaction>>(transactionPaths.list + getApiQuery(query));
  return response;
};

export const getTrasaction = async (query: ApiQuery) => {
  const response = await Fetch.Get<Transaction>(transactionPaths.detail + getApiQuery(query));
  return response;
};

export const createTransaction = async (transaction: Transaction) => {
  const response = await Fetch.Post<Transaction, Transaction>(transactionPaths.create, transaction);
  return response;
};

export const updateTransaction = async (query: ApiQuery, transaction: Transaction) => {
  const response = await Fetch.Put<Transaction, any>(
    transactionPaths.update + getApiQuery(query),
    transaction
  );
  return response;
};

export const removeTransactions = async (query: ApiQuery) => {
  const response = await Fetch.Delete<any, any>(transactionPaths.remove + getApiQuery(query));
  return response;
};
