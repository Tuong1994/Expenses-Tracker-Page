"use client";

import { SelectOptions } from "@/components/Control/type";
import { ECashflow, EPaymentMode } from "@/services/transactions/enum";
import { useTranslations } from "next-intl";

const useSelectOptions = () => {
  const t = useTranslations();

  const cashflowOptions: SelectOptions = [
    { label: t("transactions.filter.all"), value: ECashflow.ALL },
    { label: t("transactions.cashflow.income"), value: ECashflow.INCOME },
    { label: t("transactions.cashflow.expense"), value: ECashflow.EXPENSE },
  ];

  const paymentModeOptions: SelectOptions = [
    { label: t("transactions.filter.all"), value: EPaymentMode.ALL },
    { label: t("transactions.paymentMode.cash"), value: EPaymentMode.CASH },
    { label: t("transactions.paymentMode.credit"), value: EPaymentMode.CREDIT },
  ];

  return { cashflowOptions, paymentModeOptions };
};

export default useSelectOptions;
