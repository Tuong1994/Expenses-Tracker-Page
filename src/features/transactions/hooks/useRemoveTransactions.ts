"use client";

import { ApiQuery } from "@/services/type";
import { apiIsAbort } from "@/services/helpers";
import { removeTransactions } from "@/services/transactions/api";
import { useTranslations } from "next-intl";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import useAsync from "@/hooks/features/useAsync";

const useRemoveTransactions = () => {
  const t = useTranslations("common.message");

  const messageApi = useMessage();

  const { isLoading, isSuccess, isError, call } = useAsync(removeTransactions);

  const onRemoveTransactions = async (query: ApiQuery) => {
    const response = await call(query);

    if (!response.success) {
      if (apiIsAbort(response)) return;
      return messageApi.error(t("error.remove"));
    }

    return messageApi.success(t("success.remove"));
  };

  return { isLoading, isSuccess, isError, onRemoveTransactions };
};

export default useRemoveTransactions;
