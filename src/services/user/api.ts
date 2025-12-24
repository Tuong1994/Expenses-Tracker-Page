"use server"

import { ApiQuery, Paging } from "../type";
import { User } from "./type";
import { cookies } from "next/headers";
import { getApiQuery } from "../helper";
import userApiPaths from "./path";
import Fetch from "..";

export const getUsers = async (query: ApiQuery) => {
  const response = await Fetch.Get<Paging<User>>(userApiPaths.getList + getApiQuery(query), "getUsers");
  return response;
};

export const getUser = async (query: ApiQuery) => {
  const response = await Fetch.Get<User>(userApiPaths.getDetail + getApiQuery(query), "getUser", {
    headers: {
      Cookie: (await cookies()).toString(),
    },
  });
  return response;
};

export const createUser = async (data: FormData) => {
  const response = await Fetch.Post<FormData, User>(userApiPaths.create, data, "createUser");
  return response;
};

export const updateUser = async (query: ApiQuery, data: FormData) => {
  const response = await Fetch.Put<FormData, any>(userApiPaths.update + getApiQuery(query), data, "updateUser");
  return response;
};

export const removeUsers = async (query: ApiQuery) => {
  const response = await Fetch.Delete<any, any>(userApiPaths.remove + getApiQuery(query), "removeUsers");
  return response;
};
