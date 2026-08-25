"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import ExpiredSessionModal from "../ExpiredSessionModal";
import useRefreshToken from "@/features/auth/hooks/useRefreshToken";
import useAuthStore from "@/store/AuthStore";
import useLogout from "@/features/auth/hooks/useLogout";

interface AppRefreshTokenProps {
  children?: ReactNode;
}

const AppRefreshToken: FC<AppRefreshTokenProps> = ({ children }) => {
  const t = useTranslations("auth");

  const [auth] = useAuthStore((state) => [state.auth]);

  const { isExpired, mutate: onRefreshToken } = useRefreshToken();

  const { isLoading, mutate: onLogout } = useLogout();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const { isAuth, expired } = auth;

  // Refresh token when first access page
  useEffect(() => {
    if (isAuth) onRefreshToken();
  }, []);

  // Refresh token interval
  useEffect(() => {
    if (!isAuth || !expired) return;

    const expiredTime = expired;

    const currentTime = Date.now();

    const delay = expiredTime - currentTime - 10000;

    if (delay > 0) {
      const timer = setInterval(() => {
        onRefreshToken();
      }, delay);

      return () => clearInterval(timer);
    }
  }, [expired, isAuth, onRefreshToken]);

  useEffect(() => {
    if (isExpired) setOpenModal(true);
  }, [isExpired]);

  const handleLogout = () => {
    onLogout();
    setOpenModal(false);
  };

  return (
    <>
      {children}
      <ExpiredSessionModal open={openModal} isLoading={isLoading} note={t("note")} onOk={handleLogout} />
    </>
  );
};

export default AppRefreshToken;
