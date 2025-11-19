import { NextPage } from "next";
import { Space } from "@/components/UI";
import { DatePicker } from "@/components/Control";
import { getTranslations } from "next-intl/server";
import PageTitle from "@/components/Page/PageTitle";
import Summary from "@/features/dashboard/Summary";
import withLocale from "@/libs/withLocale";

const HomePage: NextPage = async () => {
  const t = await getTranslations();

  const rightItem = (
    <Space>
      <DatePicker placement="right" rootStyle={{ width: "200px" }} />
      <DatePicker placement="right" rootStyle={{ width: "200px" }} />
    </Space>
  );

  return (
    <>
      <PageTitle title={t("common.menu.dashboard")} rightItem={rightItem} />
      <Summary />
    </>
  );
};

export default withLocale(HomePage);
