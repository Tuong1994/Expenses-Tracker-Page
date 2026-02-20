"use client";

import { useTranslations } from "next-intl";
import { AuthInfo, AuthSignIn, AuthSignUp } from "@/services/auth/type";
import { apiIsAbort, HttpStatus } from "@/services/helpers";
import { signUp } from "@/services/auth/api";
import { useMutation } from "react-query";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import useSignIn from "./useLogin";

const useSignUp = () => {
  const t = useTranslations("common.message");

  const messageApi = useMessage();

  let signInData: AuthSignIn = { email: "", password: "" };

  const onSignUp = async (formData: AuthSignUp) => {
    signInData = { email: formData.email, password: formData.password };
    const response = await signUp(formData);
    return response;
  };

  const { mutate: onSignIn } = useSignIn();

  const mutations = useMutation(onSignUp, {
    onSuccess: (response) => {
      if (!response.success) {
        if (apiIsAbort<AuthInfo>(response)) return;
        let message = t("error.api");
        const status = response.error?.status;
        if (status === HttpStatus.FORBIDDEN) message = t("error.emailExist");
        return messageApi.error(message);
      }
      messageApi.success(t("success.signUp"));
      onSignIn(signInData)
    },
    onError: () => messageApi.error(t("error.api")),
  });

  return mutations;
};

export default useSignUp;
