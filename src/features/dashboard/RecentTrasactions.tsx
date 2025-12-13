"use client";

import { FC } from "react";
import { Card, Typography, Table, Badge } from "@/components/UI";
import { Columns, TableColor } from "@/components/UI/Table/type";
import { Transaction } from "@/services/transactions/type";
import { ApiResponse } from "@/services/type";
import { useTranslations } from "next-intl";
import CategoryType from "@/components/Page/Transaction/CategoryType";
import PaymentMode from "@/components/Page/Transaction/PaymentMode";
import Amount from "@/components/Page/Transaction/Amount";
import Cashflow from "@/components/Page/Transaction/Cashflow";
import useLayout from "@/components/UI/Layout/useLayout";
import moment from "moment";

const { Paragraph } = Typography;

interface RecentTransactionsProps {
  transactions: ApiResponse<Transaction[]> | null;
}

const RecentTransactions: FC<RecentTransactionsProps> = ({ transactions }) => {
  const t = useTranslations();

  const { layoutValue } = useLayout();

  const { layoutColor } = layoutValue;

  const isError = !transactions || transactions === null || !transactions.success;

  if (isError) {
    return (
      <Card>
        <Paragraph italic variant="secondary">
          {t("dashboard.error.recentTransactions")}
        </Paragraph>
      </Card>
    );
  }

  const dataSource: Transaction[] =
    transactions.data && Array.isArray(transactions.data) ? transactions.data : [];

  console.log(dataSource)

  const columns: Columns<Transaction> = [
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
      render: (category) => <CategoryType category={category} />,
    },
    {
      id: "paymentMode",
      dataIndex: "paymentMode",
      title: t("common.table.head.paymentMode"),
      render: (paymentMode) => <PaymentMode paymentMode={paymentMode} />,
    },
    {
      id: "cashflow",
      dataIndex: "cashflow",
      title: t("common.table.head.cashflow"),
      render: (cashflow) => <Cashflow cashflow={cashflow} />,
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
      render: (amount, transaction) => <Amount amount={amount} cashflow={transaction.cashflow} />,
    },
  ];

  return (
    <Card>
      <Paragraph size={16} rootClassName="mb-5!">
        {t("dashboard.recentTransactions.title")}
      </Paragraph>
      <Table<Transaction> color={layoutColor as TableColor} dataSource={dataSource} columns={columns} />
    </Card>
  );
};

export default RecentTransactions;
