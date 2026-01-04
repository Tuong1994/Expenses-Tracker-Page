"use client";

import { ApiQuery } from "@/services/type";
import { apiIsAbort } from "@/services/helpers";
import { removeTransactions } from "@/services/transactions/api";
import { useTranslations } from "next-intl";
import { useMutation } from "react-query";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const useRemoveTransactions = () => {
  const t = useTranslations("common.message");

  const messageApi = useMessage();

  const onRemoveTransactions = async (query: ApiQuery) => {
    const response = await removeTransactions(query);
    return response;
  };

  const mutations = useMutation(onRemoveTransactions, {
    onSuccess: (response) => {
      if (!response.success) {
        if (apiIsAbort(response)) return;
        return messageApi.error(t("error.remove"));
      }
      return messageApi.success(t("success.remove"));
    },
    onError: () => messageApi.error("error.api"),
  });

  return mutations;
};

export default useRemoveTransactions;
