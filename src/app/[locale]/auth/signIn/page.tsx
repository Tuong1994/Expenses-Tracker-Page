import { NextPage } from "next";
import { getTranslations } from "next-intl/server";
import withLocale from "@/libs/withLocale";
import SignInForm from "@/features/auth/components/SignInForm";
import AuthMain from "@/features/auth/components/AuthMain";

interface SignInPageProps {}

const SignInPage: NextPage<SignInPageProps> = async () => {
  const t = await getTranslations("auth");

  return (
    <AuthMain title={t("signIn.title")}>
      <SignInForm />
    </AuthMain>
  );
};

export default withLocale(SignInPage);
