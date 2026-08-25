"use client";

import { forwardRef, ForwardRefRenderFunction, ReactNode, useEffect } from "react";
import { Divider, Layout, Section } from "@/components/UI";
import { QueryClient, QueryClientProvider } from "react-query";
import { ApiResponse } from "@/services/type";
import { User } from "@/services/user/type";
import AppRefreshToken from "./AppRefreshToken";
import Header from "./Header";
import Profile from "./Profile";
import Menu from "./Menu";
import useUserStore from "@/store/UserStore";

const { Container, Side, Body, Content } = Layout;

interface AppMainProps {
  children?: ReactNode;
  isAuth: boolean;
  user: ApiResponse<User> | null;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 0,
      refetchOnWindowFocus: false,
    },
  },
});

const AppMain: ForwardRefRenderFunction<HTMLDivElement, AppMainProps> = ({ children, user, isAuth }, ref) => {
  const setUser = useUserStore(state => state.setUser)

  const isError = !user || user === null || !user.success;

  useEffect(() => {
    if(isError) return;
    setUser(user.data)
  }, [user])

  return (
    <QueryClientProvider client={queryClient}>
      <AppRefreshToken>
        {!isAuth ? (
          children
        ) : (
          <Container ref={ref}>
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
        )}
      </AppRefreshToken>
    </QueryClientProvider>
  );
};

export default forwardRef(AppMain);
