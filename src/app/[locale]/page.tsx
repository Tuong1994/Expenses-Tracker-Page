import { NextPage } from "next";
import { getTranslations } from "next-intl/server";
import { getBalances, getRecentTransactions, getSummary, getTotalExpenses } from "@/services/dashboard/api";
import { redirect } from "@/i18n/navigation";
import PageTitle from "@/components/Page/PageTitle";
import Summary from "@/features/dashboard/Summary";
import DateFilter from "@/features/dashboard/DateFilter";
import TotalExpenses from "@/features/dashboard/TotalExpenses";
import AccountBalance from "@/features/dashboard/AccountBalance";
import RecentTransactions from "@/features/dashboard/RecentTrasactions";
import withLocale from "@/libs/withLocale";
import utils from "@/utils";
import { Suspense } from "react";
import { ELang } from "@/common/enum";

interface DashboardPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
  locale: string;
}

const DashboardPage: NextPage<DashboardPageProps> = async ({ searchParams, locale }) => {
  const params = await searchParams;

  const t = await getTranslations();

  const startDate = params.startDate ?? utils.formatDateValue(new Date("2025-01-01"));

  const endDate = params.endDate ?? utils.formatDateValue(new Date("2025-12-01"));

  const reqBody = { startDate, endDate };

  const apiQuery = { langCode: locale as ELang };

  const [summaryResult, totalExpensesResult, balanceResult, transactionsResult] = await Promise.allSettled([
    getSummary(reqBody),
    getTotalExpenses(apiQuery, reqBody),
    getBalances(reqBody),
    getRecentTransactions(apiQuery),
  ]);

  if (!params.startDate || !params.endDate) {
    return redirect({ href: `?startDate=${startDate}&endDate=${endDate}`, locale });
  }

  return (
    <>
      <PageTitle
        title={t("common.menu.dashboard")}
        rightItem={<DateFilter className="!sm:w-full !md:w-full !lg:w-2xl !xl:w-3xl" />}
      />
      <Suspense fallback={"Loading...."}>
        <Summary summary={summaryResult.status === "fulfilled" ? summaryResult.value : null} />
      </Suspense>
      <TotalExpenses
        totalExpenses={totalExpensesResult.status === "fulfilled" ? totalExpensesResult.value : null}
      />
      <AccountBalance balance={balanceResult.status === "fulfilled" ? balanceResult.value : null} />
      <RecentTransactions
        transactions={transactionsResult.status === "fulfilled" ? transactionsResult.value : null}
      />
    </>
  );
};

export default withLocale(DashboardPage);
