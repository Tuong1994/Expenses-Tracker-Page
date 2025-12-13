import { FC } from "react";
import { Card, Flex, Typography } from "@/components/UI";
import { getTranslations } from "next-intl/server";
import { StatisticSummary } from "@/services/dashboard/type";
import { ApiResponse } from "@/services/type";
import utils from "@/utils";

const { FlexRow, FlexCol } = Flex;

const { Paragraph } = Typography;

interface SummaryProps {
  summary: ApiResponse<StatisticSummary> | null;
}

const Summary: FC<SummaryProps> = async ({ summary }) => {
  const t = await getTranslations("dashboard");

  const isError = !summary || summary === null || !summary.success;

  if (isError) {
    return (
      <Card rootClassName="mb-5!">
        <Paragraph italic variant="secondary">
          {t("error.summary")}
        </Paragraph>
      </Card>
    );
  }

  const { data } = summary;

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
