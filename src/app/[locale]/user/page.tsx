import { NextPage } from "next";
import { getTranslations } from "next-intl/server";
import withLocale from "@/libs/withLocale";
import PageTitle from "@/components/Page/PageTitle";
import UpdateForm from "@/features/user/components/UpdateForm";

const UserPage: NextPage = async () => {
  const t = await getTranslations();

  return (
    <>
      <PageTitle title={t("user.update")} />
      <UpdateForm />
    </>
  );
};

export default withLocale(UserPage);
