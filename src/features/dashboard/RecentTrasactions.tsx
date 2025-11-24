"use client";

import { FC } from "react";
import { Card, Typography, Table } from "@/components/UI";
import { useTranslations } from "next-intl";
import { Columns, TableColor } from "@/components/UI/Table/type";
import useLayout from "@/components/UI/Layout/useLayout";
import moment from "moment";
import utils from "@/utils";

const { Paragraph } = Typography;

interface RecentTransactionsProps {}

type TableData = {
  id: string;
  category: string;
  paymentMode: string;
  description: string;
  amount: number;
  createdAt: Date;
};

const RecentTransactions: FC<RecentTransactionsProps> = () => {
  const t = useTranslations();

  const { layoutValue } = useLayout();

  const dataSource: TableData[] = [
    {
      id: "1",
      category: "food",
      paymentMode: "credit",
      description: "Burger",
      amount: 40000,
      createdAt: new Date(),
    },
    {
      id: "2",
      category: "clothing",
      paymentMode: "credit",
      description: "White T-shirt",
      amount: 120000,
      createdAt: new Date(),
    },
    {
      id: "3",
      category: "bills",
      paymentMode: "credit",
      description: "Electric, Water, Gas",
      amount: 1750000,
      createdAt: new Date(),
    },
    {
      id: "4",
      category: "others",
      paymentMode: "credit",
      description: "Mobile fee",
      amount: 50000,
      createdAt: new Date(),
    },
  ];

  const columns: Columns<TableData> = [
    {
      id: "date",
      dataIndex: "createdAt",
      title: t("common.table.head.date"),
      render: (date) => <>{moment(date).format("DD/MM/YYYY")}</>,
    },
    {
      id: "category",
      dataIndex: "category",
      title: t("common.table.head.category"),
      render: (category) => <>{category}</>,
    },
    {
      id: "paymentMode",
      dataIndex: "paymentMode",
      title: t("common.table.head.paymentMode"),
    },
    {
      id: "description",
      dataIndex: "description",
      title: t("common.table.head.description"),
    },
    {
      id: "amount",
      dataIndex: "amount",
      title: t("common.table.head.amount"),
      render: (amount) => <>{utils.formatCurrency(amount)}</>,
    },
  ];

  return (
    <Card>
      <Paragraph size={16} rootClassName="mb-5!">
        {t("dashboard.recentTransactions.title")}
      </Paragraph>
      <Table<TableData>
        color={layoutValue.layoutColor as TableColor}
        dataSource={dataSource}
        columns={columns}
      />
    </Card>
  );
};

export default RecentTransactions;
