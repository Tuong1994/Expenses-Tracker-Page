"use client";

import { FC } from "react";
import { Space, Flex, Typography, Divider } from "@/components/UI";
import { Input, Select, CheckBox } from "@/components/Control";
import { ControlColor } from "@/components/Control/type";
import DateFilter from "@/features/dashboard/DateFilter";
import useLayout from "@/components/UI/Layout/useLayout";
import { useTranslations } from "next-intl";

const { FlexRow, FlexCol } = Flex;

const { Paragraph } = Typography;

interface TransactionsListFilterProps {}

const TransactionsListFilter: FC<TransactionsListFilterProps> = () => {
  const t = useTranslations('transactions.filter');

  const { layoutValue } = useLayout();

  const { layoutColor } = layoutValue;

  const color = layoutColor as ControlColor;

  return (
    <>
      <DateFilter className="my-5!" />
      <Paragraph rootClassName="mb-5!" variant="secondary">{t('category')}</Paragraph>
      <Select color={color} />
      <Divider />
      <Paragraph variant="secondary">{t('cashflow')}</Paragraph>
      <Space rootClassName="my-5!">
        <CheckBox label="Income" color={color} />
        <CheckBox label="Expense" color={color} />
      </Space>
      <Paragraph variant="secondary">{t('payment')}</Paragraph>
      <Space rootClassName="my-5!">
        <CheckBox label="Cash" color={color} />
        <CheckBox label="Credit card" color={color} />
      </Space>
      <Divider />
      <Paragraph rootClassName="mb-5!" variant="secondary">{t('amount')}</Paragraph>
      <FlexRow>
        <FlexCol span={12}>
          <Input label="Min" color={color} />
        </FlexCol>
        <FlexCol span={12}>
          <Input label="Max" color={color} />
        </FlexCol>
      </FlexRow>
    </>
  );
};

export default TransactionsListFilter;
