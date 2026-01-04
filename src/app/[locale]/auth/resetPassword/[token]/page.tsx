import { NextPage } from "next";
import { getTranslations } from "next-intl/server";
import AuthMain from "@/features/auth/components/AuthMain";
import ResetPasswordForm from "@/features/auth/components/ResetPassword";
import withLocale from "@/libs/withLocale";

interface ResetPasswordPageProps {}

const ResetPasswordPage: NextPage<ResetPasswordPageProps> = async () => {
  const t = await getTranslations("auth");

  return (
    <AuthMain title={t("resetPassword.title")}>
      <ResetPasswordForm />
    </AuthMain>
  );
};

export default withLocale(ResetPasswordPage);
