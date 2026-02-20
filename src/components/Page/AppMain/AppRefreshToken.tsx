"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import ExpiredSessionModal from "./ExpiredSessionModal";
import useRefreshToken from "@/features/auth/hooks/useRefreshToken";
import useAuthStore from "@/store/AuthStore";
import useLogout from "@/features/auth/hooks/useLogout";

interface AppRefreshTokenProps {
  children?: ReactNode;
}

const AppRefreshToken: FC<AppRefreshTokenProps> = ({ children }) => {
  const [auth] = useAuthStore((state) => [state.auth]);

  const { isExpired, mutate: onRefreshToken } = useRefreshToken();

  const { isLoading, mutate: onLogout } = useLogout();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const { isAuth, expired } = auth;

  useEffect(() => {
    // Nếu không có auth hoặc không phải trạng thái isAuth thì dừng
    if (!isAuth || !expired) return;

    const expiredTime = expired;
    const currentTime = Date.now();

    // Tính toán thời gian còn lại (trừ đi 5-10s để refresh trước khi thực sự hết hạn)
    const delay = expiredTime - currentTime - 10000;

    // Nếu token còn hạn, đặt lịch refresh
    if (delay > 0) {
      const timer = setInterval(() => {
        onRefreshToken();
      }, delay);

      // Cleanup: Xóa timer nếu component unmount hoặc token thay đổi sớm
      return () => clearInterval(timer);
    } else {
      // Nếu đã hết hạn hoặc sắp hết hạn ngay lập tức
      onRefreshToken();
    }

    // Quan trọng: Thêm expired và onRefreshToken vào dependency
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
      <ExpiredSessionModal open={openModal} okButtonProps={{ loading: isLoading }} onOk={handleLogout} />
    </>
  );
};

export default AppRefreshToken;
