"use client";

import { signIn } from "@/services/auth/api";
import { AuthSignIn } from "@/services/auth/type";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { routePaths } from "@/common/constant/routers";
import { HttpStatus } from "@/services/helper";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import useAsync from "@/hooks/features/useAsync";

const useSignIn = () => {
  const t = useTranslations("common.message");

  const messageApi = useMessage();

  const router = useRouter();

  const { isLoading, isSuccess, isError, call } = useAsync(signIn);

  const onSignIn = async (formData: AuthSignIn) => {
    const response = await call(formData);

    if (!response.success) {
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
  };

  return { isLoading, isSuccess, isError, onSignIn };
};

export default useSignIn;
