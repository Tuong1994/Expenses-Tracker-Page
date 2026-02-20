"use client";

import { FC } from "react";
import { Avatar, Image, Typography, Badge, Button } from "@/components/UI";
import { FaWallet } from "react-icons/fa";
import { ApiResponse } from "@/services/type";
import { User } from "@/services/user/type";
import useLayout from "@/components/UI/Layout/useLayout";
import useLogout from "@/features/auth/hooks/useLogout";
import useRefreshToken from "@/features/auth/hooks/useRefreshToken";

const { Paragraph } = Typography;

interface SideProfileProps {
  user: ApiResponse<User> | null;
}

const SideProfile: FC<SideProfileProps> = ({ user }) => {
  const { layoutValue } = useLayout();

  const { isLoading, mutate: onLogout } = useLogout();

  const { isLoading: refreshLoading, mutate: onRefreshToken } = useRefreshToken();

  const isError = !user || user === null || !user.success;

  const handleLogout = () => onLogout();

  const handleRefresh = () => onRefreshToken();

  if (isError)
    return (
      <Button loading={isLoading} onClick={handleLogout}>
        Logout
      </Button>
    );

  const { data: info } = user;

  return (
    <div className="flex flex-col items-center">
      <Avatar size={80}>
        <Image />
      </Avatar>
      <Paragraph rootClassName="my-5!" size={15}>
        {info.fullName}
      </Paragraph>
      <Badge ghost shape="square" color={layoutValue.layoutColor}>
        <FaWallet className="mr-3!" />
        <Paragraph>$11.000.000</Paragraph>
      </Badge>
      <Button loading={isLoading} onClick={handleLogout}>
        Logout
      </Button>
      <Button loading={refreshLoading} onClick={handleRefresh}>
        Refresh Token
      </Button>
    </div>
  );
};

export default SideProfile;
