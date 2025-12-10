import { NextPage } from "next";
import { getTranslations } from "next-intl/server";
import { getSummary } from "@/services/dashboard/api";
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

interface DashboardPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
  locale: string;
}

const DashboardPage: NextPage<DashboardPageProps> = async ({ searchParams, locale }) => {
  const params = await searchParams;

  const startDate = params.startDate ?? utils.formatDateValue(new Date("2025-01-01"));

  const endDate = params.endDate ?? utils.formatDateValue(new Date("2025-12-01"));

  const t = await getTranslations();

  const summary = await getSummary({ startDate, endDate });

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
        <Summary summary={summary} />
      </Suspense>
      <TotalExpenses />
      <AccountBalance />
      <RecentTransactions />
    </>
  );
};

export default withLocale(DashboardPage);
