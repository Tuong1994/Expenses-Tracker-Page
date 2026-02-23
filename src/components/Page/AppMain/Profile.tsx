"use client";

import { FC, useEffect, useState } from "react";
import { Avatar, Image, Typography, Loading, Button, Space } from "@/components/UI";
import { FaPowerOff, FaWallet } from "react-icons/fa";
import { ApiResponse } from "@/services/type";
import { User } from "@/services/user/type";
import useLayout from "@/components/UI/Layout/useLayout";
import useLogout from "@/features/auth/hooks/useLogout";
import localStorageKey from "@/common/constant/storage";
import utils from "@/utils";

const { Paragraph } = Typography;

const { Skeleton } = Loading;

interface SideProfileProps {
  user: ApiResponse<User> | null;
}

const SideProfile: FC<SideProfileProps> = ({ user }) => {
  const { layoutValue } = useLayout();

  const { isLoading, mutate: onLogout } = useLogout();

  const [balances, setBalances] = useState<number | null>(null);

  const isError = !user || user === null || !user.success;

  const getBalances = () => {
    if (typeof window === "undefined") return setBalances(0);
    const stored = localStorage.getItem(localStorageKey.BALANCES);
    if (!stored) return setBalances(0);
    try {
      setBalances(JSON.parse(stored));
    } catch (error) {
      setBalances(0);
    }
  };

  useEffect(() => getBalances(), []);

  const handleLogout = () => onLogout();

  const logoutButton = (
    <Button ghost color={layoutValue.layoutColor} loading={isLoading} onClick={handleLogout}>
      <FaPowerOff size={18} />
    </Button>
  );

  if (isError) return logoutButton;

  const { data: info } = user;

  return (
    <div className="flex flex-col items-center">
      <Avatar size={80}>
        <Image src={info.image?.path} />
      </Avatar>
      <Space aligns="middle">
        <Paragraph rootClassName="my-5!" size={15}>
          {info.fullName}
        </Paragraph>
        {logoutButton}
      </Space>
      {balances === null ? (
        <Skeleton type="paragraph" options={{ lines: 1 }} />
      ) : (
        <Space aligns="middle">
          <FaWallet className="text-blue-500" size={20} />
          <Paragraph size={16} rootClassName="text-blue-500!">
            {utils.formatCurrency(balances)}
          </Paragraph>
        </Space>
      )}
    </div>
  );
};

export default SideProfile;
