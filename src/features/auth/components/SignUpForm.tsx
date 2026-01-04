"use client";

import { FC } from "react";
import { Form, FormItem, Input, InputPassword, InputPhone } from "@/components/Control";
import { Button, Typography, Space } from "@/components/UI";
import { AuthSignUp } from "@/services/auth/type";
import { ControlColor } from "@/components/Control/type";
import { Link } from "@/i18n/navigation";
import { routePaths } from "@/common/constant/routers";
import { useTranslations } from "next-intl";
import { useFormRule } from "@/hooks";
import useLayout from "@/components/UI/Layout/useLayout";
import useSignUp from "../hooks/useSignUp";

const { Paragraph } = Typography;

interface SignInForm {}

const SignInForm: FC<SignInForm> = () => {
  const t = useTranslations();

  const { email, password, phone } = useFormRule();

  const { isLoading, mutate: onSignUp } = useSignUp();

  const { layoutValue } = useLayout();

  const { layoutColor } = layoutValue;

  const initialData: AuthSignUp = {
    email: "",
    password: "",
    phone: "",
  };

  const handleFinish = (formData: AuthSignUp) => onSignUp(formData);

  return (
    <Form<AuthSignUp>
      sizes="lg"
      disabled={isLoading}
      color={layoutColor as ControlColor}
      initialData={initialData}
      onFinish={handleFinish}
    >
      <FormItem name="email" rules={email()}>
        <Input required label={t("common.form.label.email")} />
      </FormItem>
      <FormItem name="password" rules={password()}>
        <InputPassword required label={t("common.form.label.password")} />
      </FormItem>
      <FormItem name="phone" rules={phone()}>
        <InputPhone required label={t("common.form.label.phone")} />
      </FormItem>
      <Button loading={isLoading} sizes="lg" rootClassName="w-full! my-10!">
        {t("auth.signUp.title")}
      </Button>
      <Space justify="center" aligns="middle">
        <Paragraph>{t("auth.signUp.note")}?</Paragraph>
        <span>|</span>
        <Link href={routePaths.SIGN_IN}>
          <Button text>{t("auth.signIn.title")}</Button>
        </Link>
      </Space>
    </Form>
  );
};

export default SignInForm;
