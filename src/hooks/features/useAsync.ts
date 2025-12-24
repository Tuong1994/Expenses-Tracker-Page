"use client";

import { ApiResponse } from "@/services/type";
import { DependencyList, useCallback, useState } from "react";

const useAsync = <T>(
  func: (...params: any) => Promise<ApiResponse<T>>,
  dependencies: DependencyList = []
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const call = useCallback(
    async (...params: any) => {
      setIsLoading(true);
      setIsSuccess(false);
      setIsError(false);
      const response = (await func(...params)) as ApiResponse<T>;
      if (response.success) setIsSuccess(true);
      else setIsError(true);
      setIsLoading(false);
      return response;
    },
    [...dependencies]
  );

  return { isLoading, isSuccess, isError, call };
};

export default useAsync;
