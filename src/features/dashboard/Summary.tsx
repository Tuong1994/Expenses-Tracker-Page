"use client";

import { FC, useEffect } from "react";
import { Card, Flex, Typography } from "@/components/UI";
import { useTranslations } from "next-intl";
import { StatisticSummary } from "@/services/dashboard/type";
import { ApiResponse } from "@/services/type";
import ErrorMessage from "@/components/Page/ErrorMessage";
import localStorageKey from "@/common/constant/storage";
import utils from "@/utils";

const { FlexRow, FlexCol } = Flex;

const { Paragraph } = Typography;

interface SummaryProps {
  summary: ApiResponse<StatisticSummary> | null;
}

const Summary: FC<SummaryProps> = ({ summary }) => {
  const t = useTranslations("dashboard");

  const isError = !summary || summary === null || !summary.success;

  if (isError) {
    return <ErrorMessage>{t("error.summary")}</ErrorMessage>;
  }

  const { data } = summary;

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(localStorageKey.BALANCES, JSON.stringify(data.totalBalance));
  }, []);

  return (
    <FlexRow rootClassName="mb-5!" justify="between" aligns="middle">
      <FlexCol xs={24} md={12} lg={6} span={6}>
        <Card>
          <Paragraph rootClassName="mb-3!" variant="success" size={20}>
            {utils.formatCurrency(data.totalIncome ?? 0)}
          </Paragraph>
          <Paragraph variant="secondary">{t("summary.income")}</Paragraph>
        </Card>
      </FlexCol>
      <FlexCol xs={24} md={12} lg={6} span={6}>
        <Card>
          <Paragraph rootClassName="mb-3!" variant="danger" size={20}>
            {utils.formatCurrency(data.totalExpense ?? 0)}
          </Paragraph>
          <Paragraph variant="secondary">{t("summary.expenses")}</Paragraph>
        </Card>
      </FlexCol>
      <FlexCol xs={24} md={12} lg={6} span={6}>
        <Card>
          <Paragraph rootClassName="mb-3!" variant="warning" size={20}>
            {utils.formatCurrency(data.totalBalance ?? 0)}
          </Paragraph>
          <Paragraph variant="secondary">{t("summary.balance")}</Paragraph>
        </Card>
      </FlexCol>
      <FlexCol xs={24} md={12} lg={6} span={6}>
        <Card>
          <Paragraph rootClassName="mb-3!" size={20}>
            {utils.formatCurrency(data.totalTransactions ?? 0)}
          </Paragraph>
          <Paragraph variant="secondary">{t("summary.transactions")}</Paragraph>
        </Card>
      </FlexCol>
    </FlexRow>
  );
};

export default Summary;
