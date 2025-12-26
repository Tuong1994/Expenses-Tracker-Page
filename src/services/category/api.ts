"use server";

import FetchServer from "../fetch.server";
import { getApiQuery } from "../helper";
import { ApiQuery, List, Paging } from "../type";
import { categoryApiPaths } from "./path";
import { Category, CategoryReqBody } from "./type";

export const getCategories = async (query: ApiQuery) => {
  const response = await FetchServer.Get<List<Category>>(
    categoryApiPaths.list + getApiQuery(query),
    "getCategories"
  );
  return response;
};

export const getCategoriesPaging = async (query: ApiQuery) => {
  const response = await FetchServer.Get<Paging<Category>>(
    categoryApiPaths.listPaging + getApiQuery(query),
    "getCategoriesPaging"
  );
  return response;
};

export const getCategory = async (query: ApiQuery) => {
  const response = await FetchServer.Get<Category>(
    categoryApiPaths.detail + getApiQuery(query),
    "getCategory"
  );
  return response;
};

export const createCategory = async (data: CategoryReqBody) => {
  const response = await FetchServer.Post<CategoryReqBody, Category>(
    categoryApiPaths.create,
    data,
    "createCategory"
  );
  return response;
};

export const updateCategory = async (query: ApiQuery, data: CategoryReqBody) => {
  const response = await FetchServer.Put<CategoryReqBody, any>(
    categoryApiPaths.update + getApiQuery(query),
    data,
    "updateCategory"
  );
  return response;
};

export const removeCategories = async (query: ApiQuery) => {
  const response = await FetchServer.Delete<any, any>(
    categoryApiPaths.remove + getApiQuery(query),
    "removeCategories"
  );
  return response;
};
