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
    <FlexRow rootClassName="mb-5!" justify="between" aligns="middle">
      <FlexCol xs={24}>
        <Title level={4} rootClassName="mb-0!">{title}</Title>
      </FlexCol>
      <FlexCol xs={24}>{rightItem}</FlexCol>
    </FlexRow>
  );
};

export default PageTitle;
