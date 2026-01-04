"use client";

import { signIn } from "@/services/auth/api";
import { Auth, AuthSignIn } from "@/services/auth/type";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { routePaths } from "@/common/constant/routers";
import { apiIsAbort, HttpStatus } from "@/services/helpers";
import { useMutation } from "react-query";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const useSignIn = () => {
  const t = useTranslations("common.message");

  const messageApi = useMessage();

  const router = useRouter();

  const onSignIn = async (formData: AuthSignIn) => {
    const response = await signIn(formData);
    return response;
  };

  const mutations = useMutation(onSignIn, {
    onSuccess: (response) => {
      if (!response.success) {
        if (apiIsAbort<Auth>(response)) return;
        const status = response.error?.status;
        let message = t("error.api");
        if (status === HttpStatus.NOT_FOUND) message = t("error.authEmail");
        if (status === HttpStatus.FORBIDDEN) message = t("error.authPassword");
        if (status === HttpStatus.UNAUTHORIZED) message = t("error.unauthorized");
        return messageApi.error(message);
      }
      messageApi.success(t("success.signIn"));
      router.replace(routePaths.DASHBOARD);
      router.refresh();
    },
    onError: () => messageApi.error("error.api"),
  });

  return mutations;
};

export default useSignIn;
