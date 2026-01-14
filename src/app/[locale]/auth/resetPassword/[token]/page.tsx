import { NextPage } from "next";
import { getTranslations } from "next-intl/server";
import AuthMain from "@/features/auth/components/AuthMain";
import ResetPasswordForm from "@/features/auth/components/ResetPassword";
import withLocale from "@/libs/withLocale";

interface ResetPasswordPageProps {
  resetPasswordToken: string;
}

const ResetPasswordPage: NextPage<ResetPasswordPageProps> = async ({ resetPasswordToken }) => {
  const t = await getTranslations("auth");

  return (
    <AuthMain title={t("resetPassword.title")}>
      <ResetPasswordForm token={resetPasswordToken} />
    </AuthMain>
  );
};

export default withLocale(ResetPasswordPage);
