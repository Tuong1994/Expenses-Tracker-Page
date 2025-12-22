"use client";

import { ApiResponse } from "@/services/type";
import { DependencyList, useCallback, useState } from "react";

const useAsync = <T>(
  func: (...params: any) => Promise<ApiResponse<T>>,
  dependencies: DependencyList = []
) => {
  const [loading, setLoading] = useState<boolean>(false);

  const call = useCallback(
    async (...params: any) => {
      setLoading(true);
      const response = (await func(...params)) as ApiResponse<T>;
      setLoading(false);
      return response;
    },
    [dependencies]
  );

  return { loading, call };
};

export default useAsync