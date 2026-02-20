"use client";

import { FC } from "react";
import { useTranslations } from "use-intl";
import Modal, { ModalProps } from "@/components/UI/Modal";
import Paragraph from "@/components/UI/Typography/Paragraph";

interface ExpiredSessionModalProps extends ModalProps {}

const ExpiredSessionModal: FC<ExpiredSessionModalProps> = ({ ...restProps }) => {
  const t = useTranslations("auth");

  const modalDefaultProps: ModalProps = {
    color: "green",
    sizes: "sm",
    hasHead: false,
    hasCancelButton: false,
    backdropClose: false,
    okButtonTitle: t("relogin"),
    ...restProps,
  };

  return (
    <Modal {...modalDefaultProps}>
      <Paragraph>{t("note")}</Paragraph>
    </Modal>
  );
};

export default ExpiredSessionModal;
