"use client";

import { FC } from "react";
import { Form, FormItem, InputPassword } from "@/components/Control";
import { AuthResetPassword } from "@/services/auth/type";
import { ControlColor } from "@/components/Control/type";
import { Button } from "@/components/UI";
import { routePaths } from "@/common/constant/routers";
import { useFormRule } from "@/hooks";
import { useTranslations } from "next-intl";
import useLayout from "@/components/UI/Layout/useLayout";

interface ResetPasswordForm {}

const ResetPasswordForm: FC<ResetPasswordForm> = () => {
  const t = useTranslations();

  const { email, password } = useFormRule();

  const { layoutValue } = useLayout();

  const { layoutColor } = layoutValue;

  const initialData: AuthResetPassword = {
    resetPassword: "",
    confirmPassword: "",
    token: "",
  };

  const handleFinish = (formData: AuthResetPassword) => {};

  return (
    <Form<AuthResetPassword>
      sizes="lg"
      color={layoutColor as ControlColor}
      initialData={initialData}
      onFinish={handleFinish}
    >
      <FormItem name="email" rules={email()}>
        <InputPassword required label={t("common.form.label.newPassword")} />
      </FormItem>
      <FormItem name="password" rules={password()}>
        <InputPassword required label={t("common.form.label.confirmPassword")} />
      </FormItem>
      <Button sizes="lg" rootClassName="w-full! my-5!">
        {t("auth.resetPassword.title")}
      </Button>
    </Form>
  );
};

export default ResetPasswordForm;
