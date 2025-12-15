"use client";

import { FC } from "react";
import { Badge } from "@/components/UI";
import { ECashflow } from "@/services/transactions/enum";
import { useTranslations } from "next-intl";

interface CashflowProps {
  cashflow: ECashflow;
}

const Cashflow: FC<CashflowProps> = ({ cashflow }) => {
  const t = useTranslations("transactions");

  const badgeColor = cashflow === ECashflow.INCOME ? "green" : "red";

  const badgeName = cashflow === ECashflow.INCOME ? t("cashflow.income") : t("cashflow.expense");

  return <Badge color={badgeColor}>{badgeName}</Badge>;
};

export default Cashflow;
