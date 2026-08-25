"use client";

import { FC } from "react";
import { Avatar, Image, Typography, Loading, Button, Space, Tooltip } from "@/components/UI";
import { FaPowerOff, FaWallet } from "react-icons/fa";
import { ApiResponse } from "@/services/type";
import { User } from "@/services/user/type";
import { PiPen } from "react-icons/pi";
import { Link, usePathname } from "@/i18n/navigation";
import { routePaths } from "@/common/constant/routers";
import { useTranslations } from "next-intl";
import useLayout from "@/components/UI/Layout/useLayout";
import useLogout from "@/features/auth/hooks/useLogout";
import useDashboardStore from "@/store/DashboardStore";
import utils from "@/utils";

const { Paragraph } = Typography;

const { Skeleton } = Loading;

interface SideProfileProps {
  user: ApiResponse<User> | null;
}

const SideProfile: FC<SideProfileProps> = ({ user }) => {
  const t = useTranslations();

  const balances = useDashboardStore(state => state.balances)

  const pathname = usePathname();

  const { layoutValue } = useLayout();

  const { isLoading, mutate: onLogout } = useLogout();

  const isError = !user || user === null || !user.success;

  const handleLogout = () => onLogout();

  const logoutButton = (
    <Tooltip label={t("auth.logout")}>
      <Button ghost color={layoutValue.layoutColor} loading={isLoading} onClick={handleLogout}>
        <FaPowerOff />
      </Button>
    </Tooltip>
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
        {pathname !== routePaths.USER && (
          <Tooltip label={t("common.actions.edit")}>
            <Link href={routePaths.USER}>
              <Button ghost color={layoutValue.layoutColor}>
                <PiPen />
              </Button>
            </Link>
          </Tooltip>
        )}
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
