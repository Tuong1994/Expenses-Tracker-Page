"use client";

import { FC } from "react";
import { Flex, Typography, Divider } from "@/components/UI";
import { InputNumber, Select } from "@/components/Control";
import { ControlColor, SelectOptions } from "@/components/Control/type";
import { ECashflow, EPaymentMode } from "@/services/transactions/enum";
import { ApiQuery, ApiResponse, List } from "@/services/type";
import { Category } from "@/services/category/type";
import { SelectProps } from "@/components/Control/Select";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useSelectOptions } from "@/hooks";
import { getApiQuery } from "@/services/helpers";
import DateFilter from "@/components/Page/DateFilter";
import useLayout from "@/components/UI/Layout/useLayout";
import utils from "@/utils";

const { FlexRow, FlexCol } = Flex;

const { Paragraph } = Typography;

interface TransactionsListFilterProps {
  query: ApiQuery;
  categories: ApiResponse<List<Category>> | null;
}

type SelectType = "category" | "cashflow" | "paymentMode";

const TransactionsListFilter: FC<TransactionsListFilterProps> = ({ query, categories }) => {
  const t = useTranslations("transactions");

  const router = useRouter();

  const { cashflowOptions, paymentModeOptions } = useSelectOptions();

  const { layoutValue } = useLayout();

  const { layoutColor } = layoutValue;

  let apiQuery: ApiQuery = { ...query };

  const { cashflow, paymentMode, min, max, categoryId } = apiQuery;

  const color = layoutColor as ControlColor;

  const commonSelectProps: SelectProps = { hasClear: false, hasSearch: false, color };

  const isCategoryError = !categories || categories === null || !categories.success;

  const categoryOptions: SelectOptions = !isCategoryError
    ? utils.convertDataToSelectOptions<Category>(categories.data.items, "name", "id")
    : [];

  const handleSelect = (type: SelectType, value: string | EPaymentMode | ECashflow) => {
    if (type === "category") return router.push(getApiQuery({ ...apiQuery, categoryId: value }));
    if (type === "cashflow") return router.push(getApiQuery({ ...apiQuery, cashflow: value }));
    router.push(getApiQuery({ ...apiQuery, paymentMode: value }));
  };

  const handleChangeAmount = (amount: { min?: number; max?: number }) => {
    if (amount.min) return (apiQuery = { ...apiQuery, min: amount.min });
    if (amount.max) return (apiQuery = { ...apiQuery, max: amount.max });
  };

  const handleFilterByAmount = () => {
    if (apiQuery.min === query.min && apiQuery.max === query.max) return;
    router.push(getApiQuery(apiQuery));
  };

  return (
    <>
      <DateFilter className="my-5!" />
      <Paragraph rootClassName="mb-5!" variant="secondary">
        {t("filter.category")}
      </Paragraph>
      <Select
        hasSearch={false}
        color={color}
        defaultValue={categoryId}
        options={categoryOptions}
        onChangeSelect={(value) => handleSelect("category", value as string)}
      />
      <Divider />
      <Paragraph variant="secondary">{t("filter.cashflow")}</Paragraph>
      <Select
        {...commonSelectProps}
        rootClassName="my-5!"
        defaultValue={cashflow}
        options={cashflowOptions}
        onChangeSelect={(value) => handleSelect("cashflow", value as ECashflow)}
      />
      <Paragraph variant="secondary">{t("filter.payment")}</Paragraph>
      <Select
        {...commonSelectProps}
        rootClassName="my-5!"
        defaultValue={paymentMode}
        options={paymentModeOptions}
        onChangeSelect={(value) => handleSelect("paymentMode", value as EPaymentMode)}
      />
      <Divider />
      <Paragraph rootClassName="mb-5!" variant="secondary">
        {t("filter.amount")}
      </Paragraph>
      <FlexRow rootClassName="mb-10!">
        <FlexCol span={12}>
          <InputNumber
            label="Min"
            color={color}
            value={min}
            hasClear={false}
            addonBefore="$"
            onChangeInput={(min) => handleChangeAmount({ min })}
            onBlur={handleFilterByAmount}
          />
        </FlexCol>
        <FlexCol span={12}>
          <InputNumber
            label="Max"
            color={color}
            value={max}
            hasClear={false}
            addonBefore="$"
            onChangeInput={(max) => handleChangeAmount({ max })}
            onBlur={handleFilterByAmount}
          />
        </FlexCol>
      </FlexRow>
    </>
  );
};

export default TransactionsListFilter;
