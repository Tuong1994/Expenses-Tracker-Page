"use client";

import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ApiQuery } from "@/services/type";
import { logout } from "@/services/auth/api";
import { HttpStatus } from "@/services";
import { routePaths } from "@/common/constant/routers";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import useAsync from "@/hooks/features/useAsync";

const useLogout = () => {
  const t = useTranslations("common.message");

  const messageApi = useMessage();

  const router = useRouter();

  const { isLoading, isSuccess, isError, call } = useAsync(logout);

  const onLogout = async (query: ApiQuery) => {
    const response = await call(query);

    if (!response.success) {
      const status = response.error?.status;
      let message = t("error.api");
      if (status === HttpStatus.FORBIDDEN) message = t("error.logout");
      return messageApi.error(message);
    }

    messageApi.success(t("success.logout"));
    router.replace(routePaths.SIGN_IN);
    router.refresh();
  };

  return { isLoading, isSuccess, isError, onLogout };
};

export default useLogout;
