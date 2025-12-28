"use server";

import { getApiQuery } from "../helpers";
import { ApiQuery, Paging } from "../type";
import { transactionApiPaths } from "./path";
import { Transaction } from "./type";
import { revalidateTag } from "next/cache";
import FetchServer from "../fetch.server";

export const getTransactions = async (query: ApiQuery) => {
  const response = await FetchServer.Get<Paging<Transaction>>(
    transactionApiPaths.list + getApiQuery(query),
    "getTransactions",
    { next: { tags: ["transactions"] } }
  );
  return response;
};

export const getTrasaction = async (query: ApiQuery) => {
  const response = await FetchServer.Get<Transaction>(
    transactionApiPaths.detail + getApiQuery(query),
    "getTransaction"
  );
  return response;
};

export const createTransaction = async (data: Transaction) => {
  const response = await FetchServer.Post<Transaction, Transaction>(
    transactionApiPaths.create,
    data,
    "createTransaction"
  );
  if (response.success) revalidateTag("transactions");
  return response;
};

export const updateTransaction = async (query: ApiQuery, data: Transaction) => {
  const response = await FetchServer.Put<Transaction, any>(
    transactionApiPaths.update + getApiQuery(query),
    data,
    "updateTransaction"
  );
  if (response.success) revalidateTag("transactions");
  return response;
};

export const removeTransactions = async (query: ApiQuery) => {
  const response = await FetchServer.Delete<any, any>(
    transactionApiPaths.remove + getApiQuery(query),
    null,
    "removeTransactions"
  );
  if (response.success) revalidateTag("transactions");
  return response;
};
