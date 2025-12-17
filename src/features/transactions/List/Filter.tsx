"use client";

import { FC } from "react";
import { Flex, Typography, Divider, Button } from "@/components/UI";
import { Input, Select } from "@/components/Control";
import { ControlColor, SelectOptions } from "@/components/Control/type";
import { ECashflow, EPaymentMode } from "@/services/transactions/enum";
import { ApiQuery } from "@/services/type";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { getApiQuery } from "@/services/helper";
import DateFilter from "@/features/dashboard/DateFilter";
import useLayout from "@/components/UI/Layout/useLayout";
import { SelectProps } from "@/components/Control/Select";

const { FlexRow, FlexCol } = Flex;

const { Paragraph } = Typography;

interface TransactionsListFilterProps {
  query: ApiQuery;
}

const TransactionsListFilter: FC<TransactionsListFilterProps> = ({ query }) => {
  const t = useTranslations("transactions");

  const router = useRouter();

  const { layoutValue } = useLayout();

  const { layoutColor } = layoutValue;

  const { cashflow, paymentMode, categoryId } = query;

  const color = layoutColor as ControlColor;

  const commonSelectProps: SelectProps = { hasClear: false, hasSearch: false, color };

  const cashflowOptions: SelectOptions = [
    { label: t("filter.all"), value: ECashflow.ALL },
    { label: t("cashflow.income"), value: ECashflow.INCOME },
    { label: t("cashflow.expense"), value: ECashflow.EXPENSE },
  ];

  const paymentModeOptions: SelectOptions = [
    { label: t("filter.all"), value: EPaymentMode.ALL },
    { label: t("paymentMode.cash"), value: EPaymentMode.CASH },
    { label: t("paymentMode.credit"), value: EPaymentMode.CREDIT },
  ];

  const handleSelectCashflow = (type: "cashflow" | "paymentMode", value: EPaymentMode | ECashflow) => {
    if (type === "cashflow") return router.push(getApiQuery({ ...query, cashflow: value }));
    router.push(getApiQuery({ ...query, paymentMode: value }));
  };

  return (
    <>
      <DateFilter className="my-5!" />
      <Paragraph rootClassName="mb-5!" variant="secondary">
        {t("filter.category")}
      </Paragraph>
      <Select {...commonSelectProps} />
      <Divider />
      <Paragraph variant="secondary">{t("filter.cashflow")}</Paragraph>
      <Select
        {...commonSelectProps}
        rootClassName="my-5!"
        defaultValue={cashflow}
        options={cashflowOptions}
        onChangeSelect={(value) => handleSelectCashflow("cashflow", value as ECashflow)}
      />
      <Paragraph variant="secondary">{t("filter.payment")}</Paragraph>
      <Select
        {...commonSelectProps}
        rootClassName="my-5!"
        defaultValue={paymentMode}
        options={paymentModeOptions}
        onChangeSelect={(value) => handleSelectCashflow("paymentMode", value as EPaymentMode)}
      />
      <Divider />
      <Paragraph rootClassName="mb-5!" variant="secondary">
        {t("filter.amount")}
      </Paragraph>
      <FlexRow rootClassName="mb-10!">
        <FlexCol span={12}>
          <Input label="Min" color={color} />
        </FlexCol>
        <FlexCol span={12}>
          <Input label="Max" color={color} />
        </FlexCol>
      </FlexRow>
      <Button color={color} rootClassName="w-full!">
        {t("filter.title")}
      </Button>
    </>
  );
};

export default TransactionsListFilter;
