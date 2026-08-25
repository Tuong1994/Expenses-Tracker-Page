"use client";

import useMessage from "@/components/UI/ToastMessage/useMessage";
import { apiIsAbort } from "@/services/helpers";
import { ApiQuery } from "@/services/type";
import { updateUser } from "@/services/user/api";
import { useTranslations } from "next-intl";
import { useMutation } from "react-query";

const useUpdateUser = () => {
  const t = useTranslations("common.message");

  const messageApi = useMessage();

  const onUpdateUser = async (args: { query: ApiQuery; formData: FormData }) => {
    const { query, formData } = args;
    const response = await updateUser(query, formData);
    return response;
  };

  const mutations = useMutation(onUpdateUser, {
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

export default useUpdateUser;
