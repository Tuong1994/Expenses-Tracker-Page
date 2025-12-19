import { FC, ReactNode } from "react";
import { Card, Typography } from "@/components/UI";

const { Paragraph } = Typography;

interface ErrorMessageProps {
  children?: ReactNode;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ children }) => {
  return (
    <Card rootClassName="mb-5!">
      <Paragraph italic variant="secondary">
        {children}
      </Paragraph>
    </Card>
  );
};

export default ErrorMessage;
