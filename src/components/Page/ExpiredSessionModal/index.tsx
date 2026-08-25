"use client";

import { FC } from "react";
import { useTranslations } from "use-intl";
import Modal, { ModalProps } from "@/components/UI/Modal";
import Paragraph from "@/components/UI/Typography/Paragraph";
import useLayout from "@/components/UI/Layout/useLayout";

interface ExpiredSessionModalProps extends ModalProps {
  note?: string;
  isLoading?: boolean;
}

const ExpiredSessionModal: FC<ExpiredSessionModalProps> = ({ note, isLoading, ...restProps }) => {
  const t = useTranslations("auth");

  const { layoutValue } = useLayout();

  const modalDefaultProps: ModalProps = {
    sizes: "sm",
    color: layoutValue.layoutColor,
    hasHead: false,
    hasCancelButton: false,
    backdropClose: false,
    okButtonProps: { loading: isLoading },
    okButtonTitle: t("relogin"),
    ...restProps,
  };

  return (
    <Modal {...modalDefaultProps}>
      <Paragraph>{note}</Paragraph>
    </Modal>
  );
};

export default ExpiredSessionModal;
