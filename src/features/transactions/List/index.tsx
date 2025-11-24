"use client";

import { FC, useState } from "react";
import { Columns, TableColor } from "@/components/UI/Table/type";
import { Transaction } from "@/services/transactions/type";
import { Flex, Typography, Table, Card, Button, Space, Drawer } from "@/components/UI";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { useTranslations } from "next-intl";
import { useViewpoint } from "@/hooks";
import TransactionsListFilter from "./Filter";
import useLayout from "@/components/UI/Layout/useLayout";
import moment from "moment";
import utils from "@/utils";

const { FlexRow, FlexCol } = Flex;

const { Paragraph } = Typography;

interface TransactionsListProps {}

const TransactionsList: FC<TransactionsListProps> = () => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const t = useTranslations();

  const { isPhone, isTablet } = useViewpoint();

  const { layoutValue } = useLayout();

  const { layoutColor } = layoutValue;

  const isMobile = isPhone || isTablet;

  const dataSource: Transaction[] = [
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

  const filterHead = <Paragraph size={16}>
    {t('transactions.filter.title')}
  </Paragraph>

  const handleTriggerDrawer = () => setOpenFilter(!openFilter);

  return (
    <>
      <FlexRow justify="between">
        <FlexCol xs={24} span={18}>
          {isMobile && (
            <Space justify="end">
              <Button color={layoutColor} rootClassName="mb-5!" onClick={handleTriggerDrawer}>
                <HiAdjustmentsHorizontal size={20} />
              </Button>
            </Space>
          )}
          <Table<Transaction>
            hasRowSelection
            hasPagination
            columns={columns}
            dataSource={dataSource}
            color={layoutColor as TableColor}
          />
        </FlexCol>
        <FlexCol xs={0} span={6}>
          <Card head={filterHead}>
            <TransactionsListFilter />
          </Card>
        </FlexCol>
      </FlexRow>
      <Drawer head={filterHead} open={openFilter} onClose={handleTriggerDrawer}>
        <TransactionsListFilter />
      </Drawer>
    </>
  );
};

export default TransactionsList;
