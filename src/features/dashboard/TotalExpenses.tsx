"use client";

import { FC } from "react";
import { Card, Flex, Typography } from "@/components/UI";
import { PieChart, Pie, LabelList } from "recharts";
import { useTranslations } from "next-intl";
import { useMounted, useViewpoint } from "@/hooks";
import utils from "@/utils";

const { Paragraph } = Typography;

const { FlexRow, FlexCol } = Flex;

interface TotalExpensesProps {}

const TOTAL_INCOME = 13000000;

const TotalExpenses: FC<TotalExpensesProps> = () => {
  const t = useTranslations();

  const mounted = useMounted();

  const { isPhone, isSmTablet } = useViewpoint();

  const expenses = [
    { id: "2", name: "Food", amount: 4000000, color: "#10b981" },
    { id: "3", name: "Utilities", amount: 500000, color: "#f5a316" },
    { id: "4", name: "Bills", amount: 1500000, color: "#f43f5e" },
    { id: "5", name: "Shopping", amount: 120000, color: "#0ea5e9" },
    { id: "6", name: "Transportation", amount: 400000, color: "#38bdf8" },
    { id: "7", name: "Insurance", amount: 1200000, color: "#ec4899" },
    { id: "8", name: "Health care", amount: 2000000, color: "#6366f1" },
    { id: "9", name: "Clothing", amount: 400000, color: "#1e293b" },
    { id: "10", name: "Others", amount: 200000, color: "#111" },
  ];

  const data = expenses.map((expense) => ({
    name: expense.name,
    value: expense.amount,
    fill: expense.color,
  }));

  const isMobile = isPhone || isSmTablet;

  if (!mounted) return null;

  if (isMobile) return null;

  return (
    <Card rootClassName="mb-5!">
      <Paragraph size={16}>{t("dashboard.totalExpenses.title")}</Paragraph>
      <Paragraph variant="secondary">Jun 1 - Dec 1</Paragraph>

      <div className="flex items-center justify-around sm:flex-col md:flex-col lg:flex-row">
        <div className="md:w-full lg:w-1/2 flex justify-center">
          <PieChart
            style={{ width: "100%", maxWidth: "500px", maxHeight: "80vh", aspectRatio: 1 }}
            responsive
            margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          >
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="80%"
              isAnimationActive
            >
              <LabelList dataKey="name" position="outside" />
            </Pie>
          </PieChart>
        </div>

        <div className="md:w-1/2 lg:w-1/2">
          {expenses.map((expense) => (
            <FlexRow key={expense.id} aligns="middle" rootClassName="my-5!">
              <FlexCol md={2} lg={2} span={1}>
                <div style={{ backgroundColor: expense.color }} className="w-8 h-8 rounded-full"></div>
              </FlexCol>
              <FlexCol md={10} lg={10} span={6}>
                <Paragraph>{expense.name}</Paragraph>
              </FlexCol>
              <FlexCol md={6} lg={6} span={4}>
                <Paragraph>{utils.formatCurrency(expense.amount)}</Paragraph>
              </FlexCol>
              <FlexCol md={6} lg={6} span={3}>
                <Paragraph>{((expense.amount / TOTAL_INCOME) * 100).toFixed(2)}%</Paragraph>
              </FlexCol>
            </FlexRow>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TotalExpenses;
