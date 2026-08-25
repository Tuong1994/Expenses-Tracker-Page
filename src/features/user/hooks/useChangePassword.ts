"use client";

import useMessage from "@/components/UI/ToastMessage/useMessage";
import { changePassword } from "@/services/auth/api";
import { AuthChangePassword } from "@/services/auth/type";
import { apiIsAbort } from "@/services/helpers";
import { useTranslations } from "next-intl";
import { useMutation } from "react-query";

const useChangePassword = () => {
  const t = useTranslations("common.message");

  const messageApi = useMessage();

  const onChangePassword = async (formData: AuthChangePassword) => {
    const response = await changePassword(formData);
    return response;
  };

  const mutations = useMutation(onChangePassword, {
    onSuccess: (response) => {
      if (!response.success) {
        if (apiIsAbort(response)) return;
        return messageApi.error(t("error.update"));
      }
      messageApi.success(t("success.update"));
    },
    onError: () => messageApi.error(t("error.api")),
  });

  return mutations;
};

export default useChangePassword;
