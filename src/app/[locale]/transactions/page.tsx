import { NextPage } from "next";
import { getTranslations } from "next-intl/server";
import PageTitle from "@/components/Page/PageTitle";
import TransactionsForm from "@/features/transactions/AddForm";
import TransactionsList from "@/features/transactions/List";

const TransactionsPage: NextPage = async () => {
  const t = await getTranslations();

  return (
    <>
      <PageTitle title={t("common.menu.transactions")} rightItem={<TransactionsForm />} />
      <TransactionsList />
    </>
  );
};

export default TransactionsPage;
