"use client";

import { FC } from "react";
import { Form, FormItem, Input, InputPassword } from "@/components/Control";
import { AuthSignIn } from "@/services/auth/type";
import { ControlColor } from "@/components/Control/type";
import { Link } from "@/i18n/navigation";
import { Button, Divider, Space } from "@/components/UI";
import { routePaths } from "@/common/constant/routers";
import { useFormRule } from "@/hooks";
import { useTranslations } from "next-intl";
import useLayout from "@/components/UI/Layout/useLayout";
import useSignIn from "../hooks/useLogin";

interface SignInForm {}

const SignInForm: FC<SignInForm> = () => {
  const t = useTranslations();

  const { isLoading, onSignIn } = useSignIn();

  const { email, password } = useFormRule();

  const { layoutValue } = useLayout();

  const { layoutColor } = layoutValue;

  const initialData: AuthSignIn = {
    email: "",
    password: "",
  };

  const handleFinish = async (formData: AuthSignIn) => await onSignIn(formData);

  return (
    <Form<AuthSignIn>
      sizes="lg"
      color={layoutColor as ControlColor}
      initialData={initialData}
      disabled={isLoading}
      onFinish={handleFinish}
    >
      <FormItem name="email" rules={email()}>
        <Input required label={t("common.form.label.email")} />
      </FormItem>
      <FormItem name="password" rules={password()}>
        <InputPassword required label={t("common.form.label.password")} />
      </FormItem>
      <Space justify="end">
        <Link href={routePaths.FORGOT_PASSWORD}>
          <Button type="button" text>
            {t("auth.signIn.forgot")}?
          </Button>
        </Link>
      </Space>
      <Divider />
      <Button loading={isLoading} sizes="lg" rootClassName="w-full! my-5!">
        {t("auth.signIn.title")}
      </Button>
      <Link href={routePaths.SIGN_UP}>
        <Button sizes="lg" ghost rootClassName="w-full!">
          {t("auth.signUp.title")}
        </Button>
      </Link>
    </Form>
  );
};

export default SignInForm;
