import { NextPage } from "next";
import { getTranslations } from "next-intl/server";
import PageTitle from "@/components/Page/PageTitle";
import Summary from "@/features/dashboard/Summary";
import DateFilter from "@/features/dashboard/DateFilter";
import withLocale from "@/libs/withLocale";

const HomePage: NextPage = async () => {
  const t = await getTranslations();

  return (
    <>
      <PageTitle title={t("common.menu.dashboard")} rightItem={<DateFilter />} />
      <Summary />
    </>
  );
};

export default withLocale(HomePage);
