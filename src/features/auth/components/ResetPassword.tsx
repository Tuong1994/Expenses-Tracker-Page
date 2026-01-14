"use client";

import { FC } from "react";
import { Form, FormItem, InputPassword } from "@/components/Control";
import { AuthResetPassword } from "@/services/auth/type";
import { ControlColor } from "@/components/Control/type";
import { Button } from "@/components/UI";
import { useFormRule } from "@/hooks";
import { useTranslations } from "next-intl";
import useLayout from "@/components/UI/Layout/useLayout";
import useResetPassword from "../hooks/useResetPassword";

interface ResetPasswordForm {
  token: string;
}

const ResetPasswordForm: FC<ResetPasswordForm> = ({ token }) => {
  const t = useTranslations();

  const { match, password } = useFormRule();

  const { isLoading, mutate: onResetPassword } = useResetPassword();

  const { layoutValue } = useLayout();

  const { layoutColor } = layoutValue;

  const initialData: AuthResetPassword = {
    resetPassword: "",
    confirmPassword: "",
    token,
  };

  const handleFinish = (formData: AuthResetPassword) => onResetPassword(formData)

  return (
    <Form<AuthResetPassword>
      sizes="lg"
      disabled={isLoading}
      color={layoutColor as ControlColor}
      initialData={initialData}
      onFinish={handleFinish}
    >
      <FormItem name="resetPassword" rules={password()}>
        <InputPassword required label={t("common.form.label.newPassword")} />
      </FormItem>
      <FormItem name="confirmPassword">
        <InputPassword required label={t("common.form.label.confirmPassword")} />
      </FormItem>
      <Button sizes="lg" loading={isLoading} rootClassName="w-full! my-5!">
        {t("auth.resetPassword.title")}
      </Button>
    </Form>
  );
};

export default ResetPasswordForm;
