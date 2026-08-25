"use client";

import { FC } from "react";
import Modal, { ModalProps } from "@/components/UI/Modal";
import { Paragraph } from "@/components/UI/Typography";
import { AuthChangePassword } from "@/services/auth/type";
import { Form, FormItem, InputPassword } from "@/components/Control";
import { ControlColor } from "@/components/Control/type";
import { useTranslations } from "next-intl";
import useLayout from "@/components/UI/Layout/useLayout";
import useForm from "@/components/Control/Form/useForm";
import useChangePassword from "../hooks/useChangePassword";

interface PasswordFormModalProps extends ModalProps {
  onRelogin?: () => void;
}

const PasswordFormModal: FC<PasswordFormModalProps> = ({ onRelogin, ...restProps }) => {
  const t = useTranslations();

  const form = useForm();

  const { layoutValue } = useLayout();

  const { layoutColor } = layoutValue;

  const { isLoading, mutate: onChangePassword } = useChangePassword();

  const initialData: AuthChangePassword = {
    oldPassword: "",
    newPassword: "",
  };

  const handleSubmit = (formData: AuthChangePassword) => {
    onChangePassword(formData)
    onRelogin?.()
  };

  return (
    <Modal
      {...restProps}
      color={layoutColor}
      head={<Paragraph size={16}>{t("user.changePassword")}</Paragraph>}
      okButtonTitle={t("common.actions.save")}
      onOk={form?.handleSubmit}
    >
      <Form<AuthChangePassword>
        disabled={isLoading}
        color={layoutColor as ControlColor}
        initialData={initialData}
        onFinish={handleSubmit}
      >
        <FormItem name="oldPassword">
          <InputPassword label={t("common.form.label.oldPassword")} />
        </FormItem>
        <FormItem name="newPassword">
          <InputPassword label={t("common.form.label.newPassword")} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default PasswordFormModal;
