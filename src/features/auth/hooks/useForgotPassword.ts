"use client";

import { useMutation } from "react-query";
import { useTranslations } from "next-intl";
import { AuthForgotPassword } from "@/services/auth/type";
import { ApiQuery } from "@/services/type";
import { forgotPassword } from "@/services/auth/api";
import { apiIsAbort, HttpStatus } from "@/services/helpers";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const useForgotPassword = () => {
  const t = useTranslations("common.message");

  const messageApi = useMessage();

  const onForgotPassword = async (args: { query: ApiQuery; formData: AuthForgotPassword }) => {
    const { query, formData } = args;
    const response = await forgotPassword(query, formData);
    return response;
  };

  const mutations = useMutation(onForgotPassword, {
    onSuccess: (response) => {
      if (!response.success) {
        if (apiIsAbort(response)) return;
        let message = t("error.api");
        const status = response.error?.status;
        if (status === HttpStatus.FORBIDDEN) message = t("error.authEmail");
        return messageApi.error(message);
      }
      messageApi.success(t("success.forgotPassword"));
    },
    onError: () => messageApi.error(t("error.api")),
  });

  return mutations
};

export default useForgotPassword;
