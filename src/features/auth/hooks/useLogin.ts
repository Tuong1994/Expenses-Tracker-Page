"use client";

import { signIn } from "@/services/auth/api";
import { AuthSignIn } from "@/services/auth/type";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { HttpStatus } from "@/services";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import useAsync from "@/hooks/features/useAsync";

const useSignIn = () => {
  const t = useTranslations("common.message");

  const router = useRouter();

  const messageApi = useMessage();

  const { loading, call } = useAsync(signIn);

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
    // router.replace("/dashboard");
  };

  return { loading, onSignIn };
};

export default useSignIn;
