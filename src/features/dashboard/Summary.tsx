import { FC } from "react";
import { Card, Flex, Typography } from "@/components/UI";
import { getTranslations } from "next-intl/server";
import utils from "@/utils";

const { FlexRow, FlexCol } = Flex;

const { Paragraph } = Typography;

interface SummaryProps {}

const TOTAL_INCOME = 13000000;

const TOTAL_EXPENSES = 8000000;

const Summary: FC<SummaryProps> = async () => {
  const t = await getTranslations("dashboard.summary");

  return (
    <FlexRow rootClassName="mb-5!" justify="between" aligns="middle">
      <FlexCol xs={24} md={12} lg={6} span={6}>
        <Card>
          <Paragraph rootClassName="mb-3!" variant="success" size={20}>
            {utils.formatCurrency(TOTAL_INCOME)}
          </Paragraph>
          <Paragraph variant="secondary">{t("income")}</Paragraph>
        </Card>
      </FlexCol>
      <FlexCol xs={24} md={12} lg={6} span={6}>
        <Card>
          <Paragraph rootClassName="mb-3!" variant="danger" size={20}>
            {utils.formatCurrency(TOTAL_EXPENSES)}
          </Paragraph>
          <Paragraph variant="secondary">{t("expenses")}</Paragraph>
        </Card>
      </FlexCol>
      <FlexCol xs={24} md={12} lg={6} span={6}>
        <Card>
          <Paragraph rootClassName="mb-3!" variant="warning" size={20}>
            {utils.formatCurrency(TOTAL_INCOME - TOTAL_EXPENSES)}
          </Paragraph>
          <Paragraph variant="secondary">{t("balance")}</Paragraph>
        </Card>
      </FlexCol>
      <FlexCol xs={24} md={12} lg={6} span={6}>
        <Card>
          <Paragraph rootClassName="mb-3!" size={20}>
            {utils.formatCurrency(1500)}
          </Paragraph>
          <Paragraph variant="secondary">{t("transactions")}</Paragraph>
        </Card>
      </FlexCol>
    </FlexRow>
  );
};

export default Summary;
