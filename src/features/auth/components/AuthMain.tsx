import { FC, ReactNode } from "react";
import { Card, Typography, Space } from "@/components/UI";
import LocaleSwitcher from "@/components/Page/LocaleSwitcher";

const { Title, Paragraph } = Typography;

interface AuthMainProps {
  title?: ReactNode;
  children?: ReactNode;
}

const AuthMain: FC<AuthMainProps> = ({ title, children }) => {
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 px-32! flex items-center justify-center">
        <Paragraph size={50}>Expenses Tracker</Paragraph>
      </div>
      <div className="w-1/2 flex items-center justify-center bg-emerald-500">
        <div className="w-full px-32!">
          <Space rootClassName="mb-5!" justify="end">
            <LocaleSwitcher rootClassName="w-30" />
          </Space>
          <Card
            head={
              <Title level={3} rootClassName="m-0!">
                {title}
              </Title>
            }
            bodyClassName="px-20!"
          >
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthMain;
