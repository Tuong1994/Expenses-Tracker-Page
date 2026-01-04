"use client";

import { defaultResponse } from "@/services/helpers";
import { ApiResponse } from "@/services/type";
import { DependencyList, useCallback, useEffect, useRef, useState } from "react";

type UseAsyncReturn<T> = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: T | null;
  error: any | null;
  call: (...params: any[]) => Promise<ApiResponse<T>>;
};

const useAsync = <T>(
  func: (...params: any) => Promise<ApiResponse<T>>,
  dependencies: DependencyList = []
): UseAsyncReturn<T> => {
  const [apiStatus, setApiStatus] = useState<Omit<UseAsyncReturn<T>, "data" | "error" | "call">>({
    isLoading: false,
    isSuccess: false,
    isError: false,
  });
  const [apiResult, setApiResult] = useState<Pick<UseAsyncReturn<T>, "data" | "error">>({
    data: null,
    error: null,
  });

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (apiResult.error !== null)
      return setApiStatus((prev) => ({ ...prev, isSuccess: false, isError: true }));
    if (apiResult.data !== null)
      return setApiStatus((prev) => ({ ...prev, isSuccess: true, isError: false }));
  }, [apiResult.data, apiResult.error]);

  const call = useCallback(
    async (...params: any) => {
      if (!isMounted.current) return defaultResponse<T>();

      setApiStatus((prev) => ({ ...prev, isLoading: true, isSuccess: false, isError: false }));
      setApiResult({ data: null, error: null });

      const response = (await func(...params)) as ApiResponse<T>;

      if (!isMounted.current) return response;

      setApiStatus((prev) => ({ ...prev, isLoading: false }));
      setApiResult({
        data: response.success ? response.data : null,
        error: response.success ? null : response.error,
      });

      return response;
    },
    [...dependencies]
  );

  return { ...apiStatus, ...apiResult, call };
};

export default useAsync;
