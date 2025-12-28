"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Modal, Flex, Typography, Divider } from "@/components/UI";
import { Form, FormItem, Input, InputNumber, Radio, Select } from "@/components/Control";
import { ECashflow, EPaymentMode } from "@/services/transactions/enum";
import { ControlColor, SelectOptions } from "@/components/Control/type";
import { Transaction } from "@/services/transactions/type";
import { ApiResponse, List } from "@/services/type";
import { User } from "@/services/user/type";
import { Category } from "@/services/category/type";
import useLayout from "@/components/UI/Layout/useLayout";
import useForm from "@/components/Control/Form/useForm";
import useCreateTransaction from "../../hooks/useCreateTransaction";
import utils from "@/utils";

const { FlexRow, FlexCol } = Flex;

const { Paragraph } = Typography;

interface TransactionsFormProps {
  user: ApiResponse<User> | null;
  categories: ApiResponse<List<Category>> | null;
}

const TransactionsForm: FC<TransactionsFormProps> = ({ user, categories }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const t = useTranslations();

  const form = useForm();

  const { isLoading, onCreateTransaction } = useCreateTransaction();

  const { layoutValue } = useLayout();

  const { layoutColor } = layoutValue;

  const isCategoryError = !categories || categories === null || !categories.success;

  const categoryOptions: SelectOptions = !isCategoryError
    ? utils.convertDataToSelectOptions<Category>(categories.data.items, "name", "id")
    : [];

  const initialData: Transaction = {
    amount: 0,
    categoryId: "",
    cashflow: ECashflow.INCOME,
    paymentMode: EPaymentMode.CREDIT,
    description: "",
    userId: user?.data ? String(user.data?.id) : "",
  };

  const handleTriggerModal = () => setOpenModal(!openModal);

  const handleSubmit = async (formData: Transaction) => {
    await onCreateTransaction(formData);
    handleTriggerModal()
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
        okButtonProps={{ loading: isLoading }}
        cancelButtonProps={{ disabled: isLoading }}
        onOk={form?.handleSubmit}
        onCancel={handleTriggerModal}
      >
        <Form<Transaction>
          disabled={isLoading}
          initialData={initialData}
          color={layoutColor as ControlColor}
          onFinish={handleSubmit}
        >
          <FormItem name="categoryId">
            <Select label={t("common.form.label.category")} options={categoryOptions} />
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
                <Radio value={EPaymentMode.CREDIT} label={t("common.form.label.credit")} />
              </FlexCol>
              <FlexCol span={6}>
                <Radio value={EPaymentMode.CASH} label={t("common.form.label.cash")} />
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
