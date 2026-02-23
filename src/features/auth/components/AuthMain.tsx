import { FC, ReactNode } from "react";
import { Card, Typography, Space } from "@/components/UI";
import LocaleSwitcher from "@/components/Page/LocaleSwitcher";
import Logo from "@/components/Page/Logo";

const { Title } = Typography;

interface AuthMainProps {
  title?: ReactNode;
  children?: ReactNode;
}

const AuthMain: FC<AuthMainProps> = ({ title, children }) => {
  return (
    <div className="w-full h-screen md:flex lg:flex">
      <div className="w-1/2 min-h-full px-32! hidden md:flex lg:flex items-center justify-center">
        <Logo imgWidth={400} imgHeight={450} />
      </div>
      <div className="w-full min-h-full md:w-1/2 lg:w-1/2 flex items-center justify-center bg-emerald-500">
        <div className="w-full p-5! sm:p-10! lg:px-32!">
          <Space rootClassName="mb-5!" justify="end">
            <LocaleSwitcher rootClassName="w-30" />
          </Space>
          <Card
            head={
              <Title level={3} rootClassName="m-0!">
                {title}
              </Title>
            }
            bodyClassName="p-5! lg:px-20!"
          >
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthMain;
