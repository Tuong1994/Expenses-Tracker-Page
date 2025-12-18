"use server";

import Fetch from "..";
import { getApiQuery } from "../helper";
import { ApiQuery, List, Paging } from "../type";
import { categoryApiPaths } from "./path";
import { Category, CategoryReqBody } from "./type";

export const getCategories = async (query: ApiQuery) => {
  const response = await Fetch.Get<List<Category>>(categoryApiPaths.list + getApiQuery(query));
  return response;
};

export const getCategoriesPaging = async (query: ApiQuery) => {
  const response = await Fetch.Get<Paging<Category>>(categoryApiPaths.listPaging + getApiQuery(query));
  return response;
};

export const getCategory = async (query: ApiQuery) => {
  const response = await Fetch.Get<Category>(categoryApiPaths.detail + getApiQuery(query));
  return response;
};

export const createCategory = async (data: CategoryReqBody) => {
  const response = await Fetch.Post<CategoryReqBody, Category>(categoryApiPaths.create, data);
  return response;
};

export const updateCategory = async (query: ApiQuery, data: CategoryReqBody) => {
  const response = await Fetch.Put<CategoryReqBody, any>(categoryApiPaths.update + getApiQuery(query), data);
  return response;
};

export const removeCategories = async (query: ApiQuery) => {
  const response = await Fetch.Delete<any, any>(categoryApiPaths.remove + getApiQuery(query));
  return response;
};
