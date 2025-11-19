import { FC } from "react";
import { Card, Flex, Typography } from "@/components/UI";
import { getTranslations } from "next-intl/server";

const { FlexRow, FlexCol } = Flex;

const { Paragraph } = Typography;

interface SummaryProps {}

const Summary: FC<SummaryProps> = async () => {
  const t = await getTranslations("dashboard.summary");

  return (
    <FlexRow rootClassName="mb-2!" justify="between" aligns="middle">
      <FlexCol span={6}>
        <Card>
          <Paragraph rootClassName="mb-3!" variant="success" size={20}>$11.000.000</Paragraph>
          <Paragraph variant="secondary">{t("income")}</Paragraph>
        </Card>
      </FlexCol>
      <FlexCol span={6}>
        <Card>
          <Paragraph rootClassName="mb-3!" variant="danger" size={20}>$8.000.000</Paragraph>
          <Paragraph variant="secondary">{t("expenses")}</Paragraph>
        </Card>
      </FlexCol>
      <FlexCol span={6}>
        <Card>
          <Paragraph rootClassName="mb-3!" variant="warning" size={20}>$3.000.000</Paragraph>
          <Paragraph variant="secondary">{t("balance")}</Paragraph>
        </Card>
      </FlexCol>
      <FlexCol span={6}>
        <Card>
          <Paragraph rootClassName="mb-3!" size={20}>1.500</Paragraph>
          <Paragraph variant="secondary">{t("transactions")}</Paragraph>
        </Card>
      </FlexCol>
    </FlexRow>
  );
};

export default Summary;
