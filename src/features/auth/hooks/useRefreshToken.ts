"use client";

import { refresh } from "@/services/auth/api";
import { useTranslations } from "next-intl";
import { useMutation } from "react-query";
import { apiIsAbort } from "@/services/helpers";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import useAuthStore from "@/store/AuthStore";
import localStorageKey from "@/common/constant/storage";
import { useState } from "react";

const useRefreshToken = () => {
  const t = useTranslations("common.message");

  const messageApi = useMessage();

  const [auth, setAuth] = useAuthStore((state) => [state.auth, state.setAuth]);

  const [isExpired, setIsExpired] = useState<boolean>(false);

  const onRefreshToken = async () => {
    const response = await refresh();
    return response;
  };

  const mutations = useMutation(onRefreshToken, {
    retry: false,
    onSuccess: (response) => {
      setIsExpired(false);
      if (!response.success) {
        if (apiIsAbort(response)) return;
        setIsExpired(true);
      }
      messageApi.success("Your token has been refreshed");
      const authPayload = { ...auth, expired: response.data?.expired };
      setAuth(authPayload);
      localStorage.setItem(localStorageKey.AUTH, JSON.stringify(authPayload));
    },
    onError: () => messageApi.error(t("error.api")),
  });

  return { ...mutations, isExpired };
};

export default useRefreshToken;
