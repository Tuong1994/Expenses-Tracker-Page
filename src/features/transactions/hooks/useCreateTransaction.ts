"use client";

import { useTranslations } from "next-intl";
import { Transaction } from "@/services/transactions/type";
import { createTransaction } from "@/services/transactions/api";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import useAsync from "@/hooks/features/useAsync";

const useCreateTransaction = () => {
  const t = useTranslations("common.message");

  const messageApi = useMessage();

  const { isLoading, isSuccess, isError, call } = useAsync(createTransaction);

  const onCreateTransaction = async (formData: Transaction) => {
    const response = await call(formData);

    if (!response.success) {
      messageApi.error("error.create");
    }

    messageApi.success("success.create");
  };

  return { isLoading, isSuccess, isError, onCreateTransaction };
};

export default useCreateTransaction;
