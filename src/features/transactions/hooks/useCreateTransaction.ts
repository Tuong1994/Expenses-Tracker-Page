"use client";

import { useTranslations } from "next-intl";
import { Transaction } from "@/services/transactions/type";
import { createTransaction } from "@/services/transactions/api";
import { apiIsAbort } from "@/services/helpers";
import { useMutation } from "react-query";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const useCreateTransaction = () => {
  const t = useTranslations("common.message");

  const messageApi = useMessage();

  const onCreateTransaction = async (formData: Transaction) => {
    const response = await createTransaction(formData);
    return response;
  };

  const mutations = useMutation(onCreateTransaction, {
    onSuccess: (response) => {
      if (!response.success) {
        if (apiIsAbort<Transaction>(response)) return;
        return messageApi.error(t("error.create"));
      }

      messageApi.success(t("success.create"));
    },
    onError: () => messageApi.error("error.api"),
  });

  return mutations;
};

export default useCreateTransaction;
