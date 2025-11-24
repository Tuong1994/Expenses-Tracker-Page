import { NextPage } from "next";
import { getTranslations } from "next-intl/server";
import PageTitle from "@/components/Page/PageTitle";
import Summary from "@/features/dashboard/Summary";
import DateFilter from "@/features/dashboard/DateFilter";
import TotalExpenses from "@/features/dashboard/TotalExpenses";
import AccountBalance from "@/features/dashboard/AccountBalance";
import withLocale from "@/libs/withLocale";
import RecentTransactions from "@/features/dashboard/RecentTrasactions";

const HomePage: NextPage = async () => {
  const t = await getTranslations();

  return (
    <>
      <PageTitle
        title={t("common.menu.dashboard")}
        rightItem={<DateFilter className="!sm:w-full !md:w-full !lg:w-2xl !xl:w-3xl" />}
      />
      <Summary />
      <TotalExpenses />
      <AccountBalance />
      <RecentTransactions />
    </>
  );
};

export default withLocale(HomePage);
