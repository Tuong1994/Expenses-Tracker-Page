"use client";

import { FC, ReactNode } from "react";
import { Modal, Typography } from "@/components/UI";
import { ModalProps } from "@/components/UI/Modal";
import useLayout from "@/components/UI/Layout/useLayout";

const { Paragraph } = Typography;

interface ConfirmModalProps extends ModalProps {
  children?: ReactNode;
}

const ConfirmModal: FC<ConfirmModalProps> = ({ children, ...restProps }) => {
  const { layoutValue } = useLayout();

  const { layoutColor } = layoutValue;

  return (
    <Modal color={layoutColor} {...restProps}>
      {children}
    </Modal>
  );
};

export default ConfirmModal;
