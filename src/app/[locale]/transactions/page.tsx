import { NextPage } from "next";
import { getTranslations } from "next-intl/server";
import { getTransactions } from "@/services/transactions/api";
import { getUser } from "@/services/user/api";
import { ELang } from "@/common/enum";
import { ApiQuery } from "@/services/type";
import { getApiQuery } from "@/services/helper";
import { redirect } from "@/i18n/navigation";
import { defaultEndDate, defaultStartDate } from "@/data/transaction";
import { ECashflow, EPaymentMode } from "@/services/transactions/enum";
import { getCategories } from "@/services/category/api";
import PageTitle from "@/components/Page/PageTitle";
import TransactionsForm from "@/features/transactions/components/AddForm";
import TransactionsList from "@/features/transactions/components/List";
import withLocale from "@/libs/withLocale";
import utils from "@/utils";

interface TransactionsPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
  locale: string;
}

const TransactionsPage: NextPage<TransactionsPageProps> = async ({ searchParams, locale }) => {
  const t = await getTranslations();

  const params = await searchParams;

  const transactionQuery: ApiQuery = {
    langCode: locale as ELang,
    page: Number(params.page ?? 1),
    limit: Number(params.limit ?? 10),
    min: Number(params.min ?? 1),
    max: Number(params.max ?? 15000000),
    cashflow: params.cashflow ?? ECashflow.ALL,
    paymentMode: params.paymentMode ?? EPaymentMode.ALL,
    startDate: params.startDate ?? utils.formatDateValue(defaultStartDate),
    endDate: params.endDate ?? utils.formatDateValue(defaultEndDate),
    categoryId: params.categoryId ?? "",
  };

  const categoryQuery: ApiQuery = {
    langCode: locale as ELang,
  };

  const userQuery: ApiQuery = {
    langCode: locale as ELang,
  };

  const [transactionsResult, categoriesResult, userResult] = await Promise.allSettled([
    getTransactions(transactionQuery),
    getCategories(categoryQuery),
    getUser(userQuery),
  ]);

  if (!params.page || !params.limit) {
    delete transactionQuery.langCode;
    return redirect({ href: getApiQuery(transactionQuery), locale });
  }

  console.log("Transaction", transactionsResult);

  return (
    <>
      <PageTitle
        title={t("common.menu.transactions")}
        rightItem={
          <TransactionsForm
            user={userResult.status === "fulfilled" ? userResult.value : null}
            categories={categoriesResult.status === "fulfilled" ? categoriesResult.value : null}
          />
        }
      />
      <TransactionsList
        query={transactionQuery}
        transactions={transactionsResult.status === "fulfilled" ? transactionsResult.value : null}
        categories={categoriesResult.status === "fulfilled" ? categoriesResult.value : null}
      />
    </>
  );
};

export default withLocale(TransactionsPage);
