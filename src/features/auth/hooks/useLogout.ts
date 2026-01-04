"use client";

import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ApiQuery } from "@/services/type";
import { logout } from "@/services/auth/api";
import { apiIsAbort, HttpStatus } from "@/services/helpers";
import { routePaths } from "@/common/constant/routers";
import { useMutation } from "react-query";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const useLogout = () => {
  const t = useTranslations("common.message");

  const messageApi = useMessage();

  const router = useRouter();

  const onLogout = async (query: ApiQuery) => {
    const response = await logout(query);
    return response;
  };

  const mutations = useMutation(onLogout, {
    onSuccess: (response) => {
      if (!response.success) {
        if (apiIsAbort(response)) return;
        const status = response.error?.status;
        let message = t("error.api");
        if (status === HttpStatus.FORBIDDEN) message = t("error.logout");
        return messageApi.error(message);
      }

      messageApi.success(t("success.logout"));
      router.replace(routePaths.SIGN_IN);
      router.refresh();
    },
    onError: () => messageApi.error("error.api"),
  });

  return mutations;
};

export default useLogout;
