import { NextPage } from "next";
import { getTranslations } from "next-intl/server";
import withLocale from "@/libs/withLocale";
import SignUpForm from "@/features/auth/components/SignUpForm";
import AuthMain from "@/features/auth/components/AuthMain";

interface SignUpPageProps {}

const SignUpPage: NextPage<SignUpPageProps> = async () => {
  const t = await getTranslations("auth");

  return (
    <AuthMain title={t("signUp.title")}>
      <SignUpForm />
    </AuthMain>
  );
};

export default withLocale(SignUpPage);
