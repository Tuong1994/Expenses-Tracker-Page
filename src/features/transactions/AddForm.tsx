"use client";

import { FC, useState } from "react";
import { Button, Modal } from "@/components/UI";
import { useTranslations } from "next-intl";
import useLayout from "@/components/UI/Layout/useLayout";

interface TransactionsFormProps {}

const TransactionsForm: FC<TransactionsFormProps> = () => {
  const t = useTranslations();

  const { layoutValue } = useLayout();

  const {layoutColor} = layoutValue

  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleTriggerModal = () => setOpenModal(!openModal)

  return (
    <>
      <Button color={layoutColor} onClick={handleTriggerModal}>{t("transactions.actions.add")}</Button>
      <Modal open={openModal} color={layoutColor} onCancel={handleTriggerModal}></Modal>
    </>
  );
};

export default TransactionsForm;
