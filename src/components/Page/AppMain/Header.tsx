import { FC } from "react";
import { Flex, Layout } from "@/components/UI/";
import LocaleSwitcher from "../LocaleSwitcher";
import Logo from "../Logo";

const { FlexRow, FlexCol } = Flex;

const { Head } = Layout;

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <Head rootClassName="px-10! lg:px-20!">
      <FlexRow rootClassName="w-full" justify="between" aligns="middle">
        <FlexCol>
          <Logo />
        </FlexCol>
        <FlexCol xs={6} md={4} lg={2} span={1}>
          <LocaleSwitcher />
        </FlexCol>
      </FlexRow>
    </Head>
  );
};

export default Header;
