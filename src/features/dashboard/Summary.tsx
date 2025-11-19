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
          <Paragraph>$11.000.000</Paragraph>
          <Paragraph>{t("income")}</Paragraph>
        </Card>
      </FlexCol>
      <FlexCol span={6}>
        <Card>
          <Paragraph>$8.000.000</Paragraph>
          <Paragraph>{t("expenese")}</Paragraph>
        </Card>
      </FlexCol>
      <FlexCol span={6}>
        <Card>
          <Paragraph>$3.000.000</Paragraph>
          <Paragraph>{t("balance")}</Paragraph>
        </Card>
      </FlexCol>
      <FlexCol span={6}>
        <Card>
          <Paragraph>1.500</Paragraph>
          <Paragraph>{t("transactions")}</Paragraph>
        </Card>
      </FlexCol>
    </FlexRow>
  );
};

export default Summary;
