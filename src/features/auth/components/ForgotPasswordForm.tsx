"use client";

import { FC } from "react";
import { Form, FormItem, Input } from "@/components/Control";
import { Button, Space } from "@/components/UI";
import { AuthForgotPassword } from "@/services/auth/type";
import { ControlColor } from "@/components/Control/type";
import { Link } from "@/i18n/navigation";
import { routePaths } from "@/common/constant/routers";
import { useTranslations } from "next-intl";
import useLayout from "@/components/UI/Layout/useLayout";

interface ForgotPasswordForm {}

const ForgotPasswordForm: FC<ForgotPasswordForm> = () => {
  const t = useTranslations();

  const { layoutValue } = useLayout();

  const { layoutColor } = layoutValue;

  const initialData: AuthForgotPassword = {
    email: "",
  };

  return (
    <Form<AuthForgotPassword> sizes="lg" color={layoutColor as ControlColor} initialData={initialData}>
      <FormItem name="email">
        <Input required label={t("common.form.label.email")} />
      </FormItem>
      <Space aligns="middle">
        <Button sizes="lg">{t("auth.forgotPassword.action")}</Button>
        <span>|</span>
        <Link href={routePaths.SIGN_IN}>
          <Button text>{t("auth.signIn.title")}</Button>
        </Link>
      </Space>
    </Form>
  );
};

export default ForgotPasswordForm;
