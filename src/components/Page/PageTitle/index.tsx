import { FC, ReactNode } from "react";
import { Flex, Typography } from "@/components/UI";

const { Title } = Typography;

const { FlexRow, FlexCol } = Flex;

interface PageTitleProps {
  title?: ReactNode;
  rightItem?: ReactNode;
}

const PageTitle: FC<PageTitleProps> = ({ title = "Title", rightItem }) => {
  return (
    <FlexRow rootClassName="mb-2!" justify="between" aligns="middle">
      <FlexCol>
        <Title level={4}>{title}</Title>
      </FlexCol>
      <FlexCol>{rightItem}</FlexCol>
    </FlexRow>
  );
};

export default PageTitle;
