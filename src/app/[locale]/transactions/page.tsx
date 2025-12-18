import { NextPage } from "next";
import { getTranslations } from "next-intl/server";
import { getTransactions } from "@/services/transactions/api";
import { ELang } from "@/common/enum";
import { ApiQuery } from "@/services/type";
import { getApiQuery } from "@/services/helper";
import { redirect } from "@/i18n/navigation";
import { defaultEndDate, defaultStartDate } from "@/data/transaction";
import { ECashflow, EPaymentMode } from "@/services/transactions/enum";
import PageTitle from "@/components/Page/PageTitle";
import TransactionsForm from "@/features/transactions/AddForm";
import TransactionsList from "@/features/transactions/List";
import withLocale from "@/libs/withLocale";
import utils from "@/utils";

interface TransactionsPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
  locale: string;
}

const TransactionsPage: NextPage<TransactionsPageProps> = async ({ searchParams, locale }) => {
  const t = await getTranslations();

  const params = await searchParams;

  const query: ApiQuery = {
    langCode: locale as ELang,
    page: Number(params.page ?? 1),
    limit: Number(params.limit ?? 10),
    min: Number(params.min ?? 1),
    max: Number(params.max ?? 15000000),
    cashflow: params.cashflow ?? ECashflow.ALL,
    paymentMode: params.paymentMode ?? EPaymentMode.ALL,
    startDate: params.startDate ?? utils.formatDateValue(defaultStartDate),
    endDate: params.endDate ?? utils.formatDateValue(defaultEndDate),
  };

  const transactions = await getTransactions(query);

  if (!params.page || !params.limit) {
    delete query.langCode;
    return redirect({ href: getApiQuery(query), locale });
  }

  return (
    <>
      <PageTitle title={t("common.menu.transactions")} rightItem={<TransactionsForm />} />
      <TransactionsList query={query} transactions={transactions} />
    </>
  );
};

export default withLocale(TransactionsPage);
