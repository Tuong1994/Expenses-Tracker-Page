"use client";

import { FC } from "react";
import { Flex, Card, Typography } from "@/components/UI";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { useTranslations } from "next-intl";
import { ApiResponse } from "@/services/type";
import { StatisticBalance } from "@/services/dashboard/type";

const { Paragraph } = Typography;

const { FlexRow, FlexCol } = Flex;

interface AccountBalanceProps {
  balance: ApiResponse<StatisticBalance> | null;
}

const AccountBalance: FC<AccountBalanceProps> = ({ balance }) => {
  const t = useTranslations("dashboard");

  const isError = !balance || balance === null || !balance.success;

  if (isError) {
    return (
      <Card rootClassName="mb-5!">
        <Paragraph italic variant="secondary">
          {t("error.accountBalance")}
        </Paragraph>
      </Card>
    );
  }

  const { data } = balance;

  return (
    <FlexRow justify="between" rootClassName="mb-5!">
      <FlexCol xs={24} md={24} lg={24} span={12}>
        <Card>
          <Paragraph size={16}>{t("account.balance")}</Paragraph>
          <AreaChart
            style={{
              width: "100%",
              height: "400px",
              maxWidth: "700px",
              maxHeight: "100vh",
              marginTop: "20px",
              aspectRatio: 1.618,
            }}
            responsive
            data={data.balances}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid />
            <XAxis dataKey="month" />
            <YAxis width="auto" />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
              isAnimationActive
            />
          </AreaChart>
        </Card>
      </FlexCol>

      <FlexCol xs={24} md={24} lg={24} span={12}>
        <Card>
          <Paragraph size={16}>{t("account.incomeExpense")}</Paragraph>
          <BarChart
            style={{
              width: "100%",
              height: "400px",
              maxWidth: "700px",
              maxHeight: "100vh",
              marginTop: "20px",
              aspectRatio: 1.618,
            }}
            responsive
            data={data.icomesExpenses}
          >
            <CartesianGrid />
            <XAxis dataKey="month" />
            <YAxis width="auto" />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#8884d8" isAnimationActive />
            <Bar dataKey="expense" fill="#82ca9d" isAnimationActive />
          </BarChart>
        </Card>
      </FlexCol>
    </FlexRow>
  );
};

export default AccountBalance;
