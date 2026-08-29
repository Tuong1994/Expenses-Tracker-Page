"use server";

import FetchServer from "../fetch.server";
import { HttpStatus } from "../helpers";
import { globalPaths } from "./path";

export const checkConnection = async () => {
  let isConnected = true;
  const response = await FetchServer.Get<any>(globalPaths.connection);
  if (!response.success) isConnected = false;
  else if (response.error?.status === HttpStatus.GATEWAY_TIME_OUT) isConnected = false;
  return isConnected;
};
