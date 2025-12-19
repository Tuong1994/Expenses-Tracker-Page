"use client";

import { FC, useState } from "react";
import { Columns, TableColor } from "@/components/UI/Table/type";
import { Transaction } from "@/services/transactions/type";
import { Flex, Typography, Table, Card, Button, Space, Drawer } from "@/components/UI";
import { ApiQuery, ApiResponse, List, Paging } from "@/services/type";
import { Category } from "@/services/category/type";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { useTranslations } from "next-intl";
import { useViewpoint } from "@/hooks";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { getApiQuery } from "@/services/helper";
import TransactionsListFilter from "./Filter";
import CategoryType from "@/components/Page/Transaction/CategoryType";
import PaymentMode from "@/components/Page/Transaction/PaymentMode";
import Cashflow from "@/components/Page/Transaction/Cashflow";
import Amount from "@/components/Page/Transaction/Amount";
import ErrorMessage from "@/components/Page/ErrorMessage";
import useLayout from "@/components/UI/Layout/useLayout";
import moment from "moment";

const { FlexRow, FlexCol } = Flex;

const { Paragraph } = Typography;

interface TransactionsListProps {
  query: ApiQuery;
  transactions: ApiResponse<Paging<Transaction>> | null;
  categories: ApiResponse<List<Category>> | null;
}

const TransactionsList: FC<TransactionsListProps> = ({ query, transactions, categories }) => {
  const t = useTranslations();

  const router = useRouter();

  const searchParams = useSearchParams();

  const pageParam = searchParams.get("page");

  const { isPhone, isTablet } = useViewpoint();

  const { layoutValue } = useLayout();

  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const { layoutColor } = layoutValue;

  const isMobile = isPhone || isTablet;

  const currentPage = pageParam ? Number(pageParam) : 1;

  const isError = !transactions || transactions === null || !transactions.success;

  if (isError) return <ErrorMessage>{t("transactions.error")}</ErrorMessage>;

  const dataSource: Transaction[] =
    transactions.data && Array.isArray(transactions.data.items) ? transactions.data.items : [];

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

  const filterHead = <Paragraph size={16}>{t("transactions.filter.title")}</Paragraph>;

  const handleTriggerDrawer = () => setOpenFilter(!openFilter);

  const handleChangePage = (page: number) => {
    let queries: Record<string, string | number> = {};
    for (let [key, value] of searchParams.entries()) {
      if (key === "page") queries = { ...queries, [key]: page };
      else if (key === "limit") queries = { ...queries, [key]: Number(value) };
      else queries = { ...queries, [key]: value };
    }
    router.push(getApiQuery(queries));
  };

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
            paginationProps={{
              page: currentPage,
              total: transactions.data.totalItems ?? 10,
            }}
            onChangePage={handleChangePage}
          />
        </FlexCol>
        <FlexCol xs={0} span={6}>
          <Card head={filterHead}>
            <TransactionsListFilter query={query} categories={categories} />
          </Card>
        </FlexCol>
      </FlexRow>
      <Drawer head={filterHead} open={openFilter} onClose={handleTriggerDrawer}>
        <TransactionsListFilter query={query} categories={categories} />
      </Drawer>
    </>
  );
};

export default TransactionsList;
