import { forwardRef, ForwardRefRenderFunction, ReactNode } from "react";
import { Divider, Layout, Section } from "@/components/UI";
import { ApiResponse } from "@/services/type";
import { User } from "@/services/user/type";
import Header from "./Header";
import Profile from "./Profile";
import Menu from "./Menu";

const { Container, Side, Body, Content } = Layout;

interface AppMainProps {
  children?: ReactNode;
  isAuth: boolean;
  user: ApiResponse<User> | null;
}

const AppMain: ForwardRefRenderFunction<HTMLDivElement, AppMainProps> = ({ children, user, isAuth }) => {
  if (!isAuth) return children;

  return (
    <Container>
      <Header />
      <Body>
        <Side rootClassName="p-5!">
          <Profile user={user} />
          <Divider />
          <Menu />
        </Side>
        <Content rootClassName="bg-gray-100!">
          <Section>{children}</Section>
        </Content>
      </Body>
    </Container>
  );
};

export default forwardRef(AppMain);
