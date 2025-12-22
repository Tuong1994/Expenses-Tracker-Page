"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Modal, Flex, Typography, Divider } from "@/components/UI";
import { DatePicker, Form, FormItem, Input, InputNumber, Radio, Select } from "@/components/Control";
import { ECashflow, EPaymentMode } from "@/services/transactions/enum";
import { ControlColor } from "@/components/Control/type";
import { Transaction } from "@/services/transactions/type";
import useLayout from "@/components/UI/Layout/useLayout";
import useForm from "@/components/Control/Form/useForm";

const { FlexRow, FlexCol } = Flex;

const { Paragraph } = Typography;

interface TransactionsFormProps {}

const TransactionsForm: FC<TransactionsFormProps> = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const t = useTranslations();

  const form = useForm();

  const { layoutValue } = useLayout();

  const { layoutColor } = layoutValue;

  const initialData: Transaction = {
    amount: 0,
    categoryId: "",
    cashflow: ECashflow.ALL,
    paymentMode: EPaymentMode.ALL,
    description: "",
    userId: "",
    createdAt: new Date(),
  };

  const handleTriggerModal = () => setOpenModal(!openModal);

  const handleSubmit = (formData: Transaction) => {
    console.log(formData)
  };

  return (
    <>
      <Button color={layoutColor} onClick={handleTriggerModal}>
        {t("transactions.actions.add")}
      </Button>
      <Modal
        head={<Paragraph size={16}>{t("transactions.form.title")}</Paragraph>}
        open={openModal}
        color={layoutColor}
        onOk={form?.handleSubmit}
        onCancel={handleTriggerModal}
      >
        <Form<Transaction> initialData={initialData} color={layoutColor as ControlColor} onFinish={handleSubmit}>
          <FormItem name="createdAt">
            <DatePicker label={t("common.form.label.date")} />
          </FormItem>
          <FormItem name="category">
            <Select label={t("common.form.label.category")} />
          </FormItem>
          <FormItem name="amount">
            <InputNumber label={t("common.form.label.amount")} />
          </FormItem>
          <FormItem name="description">
            <Input label={t("common.form.label.description")} />
          </FormItem>
          <Divider>{t("common.form.label.payment")}</Divider>
          <FormItem name="paymentMode">
            <FlexRow>
              <FlexCol span={6}>
                <Radio label={t("common.form.label.credit")} value="credit" />
              </FlexCol>
              <FlexCol span={6}>
                <Radio label={t("common.form.label.cash")} value="cash" />
              </FlexCol>
            </FlexRow>
          </FormItem>
          <Divider>{t("common.form.label.cashflow")}</Divider>
          <FormItem name="cashflow">
            <FlexRow>
              <FlexCol span={6}>
                <Radio label={t("common.form.label.income")} value="income" />
              </FlexCol>
              <FlexCol span={6}>
                <Radio label={t("common.form.label.expense")} value="expense" />
              </FlexCol>
            </FlexRow>
          </FormItem>
        </Form>
      </Modal>
    </>
  );
};

export default TransactionsForm;
