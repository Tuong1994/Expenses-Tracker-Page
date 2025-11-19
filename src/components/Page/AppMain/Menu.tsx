"use client";

import { FC } from "react";
import { FaChartLine, FaDollarSign } from "react-icons/fa";
import { MenuItems } from "@/components/UI/Layout/Menu/type";
import { Layout, Typography } from "@/components/UI";
import { Link } from "@/i18n/navigation";
import { routePaths } from "@/common/constant/routers";
import { useTranslations } from "next-intl";

const { Menu } = Layout;

const { Paragraph } = Typography;

interface SideMenuProps {}

const SideMenu: FC<SideMenuProps> = () => {
  const t = useTranslations("common.menu");

  const items: MenuItems = [
    {
      id: "dashboard",
      label: (
        <Link href={routePaths.DASHBOARD}>
          <Paragraph size={15}>{t("dashboard")}</Paragraph>
        </Link>
      ),
      icon: <FaChartLine size={18} />,
    },
    {
      id: "transactions",
      label: (
        <Link href={routePaths.TRANSACTIONS}>
          <Paragraph size={15}>{t("transactions")}</Paragraph>
        </Link>
      ),
      icon: <FaDollarSign size={18} />,
    },
  ];

  return <Menu type="vertical" items={items} />;
};

export default SideMenu;
