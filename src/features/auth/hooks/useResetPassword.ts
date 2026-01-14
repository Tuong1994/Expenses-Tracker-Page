"use client";

import { AuthResetPassword } from "@/services/auth/type";
import { useTranslations } from "next-intl";
import { useMutation } from "react-query";
import { resetPassword } from "@/services/auth/api";
import { apiIsAbort, HttpStatus } from "@/services/helpers";
import { routePaths } from "@/common/constant/routers";
import { useRouter } from "@/i18n/navigation";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const useResetPassword = () => {
  const t = useTranslations("common.message");

  const messageApi = useMessage();

  const router = useRouter();

  const onResetPassword = async (formData: AuthResetPassword) => {
    const response = await resetPassword(formData);
    return response;
  };

  const mutations = useMutation(onResetPassword, {
    onSuccess: (response) => {
      if (!response.success) {
        if (apiIsAbort(response)) return;
        let message = t("error.api");
        const status = response.error?.status;
        if (status === HttpStatus.BAD_REQUEST) message = t("error.resetPassword");
        return messageApi.error(message);
      }
      messageApi.success(t("success.resetPassword"));
      router.replace(routePaths.SIGN_IN);
      router.refresh();
    },
    onError: () => messageApi.error(t("error.api")),
  });

  return mutations;
};

export default useResetPassword;
