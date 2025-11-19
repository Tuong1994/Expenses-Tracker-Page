import { forwardRef, ForwardRefRenderFunction, ReactNode } from "react";
import { Divider, Layout, Section } from "@/components/UI";
import Header from "./Header";
import Profile from "./Profile";
import Menu from "./Menu";

const { Container, Side, Body, Content } = Layout;

interface AppMainProps {
  children?: ReactNode;
}

const AppMain: ForwardRefRenderFunction<HTMLDivElement, AppMainProps> = ({ children }) => {
  return (
    <Container>
      <Header />
      <Body>
        <Side rootClassName="p-5!">
          <Profile />
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
