import { NextPage } from "next";
import { getTranslations } from "next-intl/server";
import AuthMain from "@/features/auth/components/AuthMain";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import withLocale from "@/libs/withLocale";

interface ForgotPasswordPageProps {}

const ForgotPasswordPage: NextPage<ForgotPasswordPageProps> = async () => {
  const t = await getTranslations();

  return (
    <AuthMain title={t("auth.forgotPassword.title")}>
      <ForgotPasswordForm />
    </AuthMain>
  );
};

export default withLocale(ForgotPasswordPage);
