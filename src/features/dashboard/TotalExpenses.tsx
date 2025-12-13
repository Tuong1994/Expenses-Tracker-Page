"use client";

import { FC } from "react";
import { Card, Flex, Typography } from "@/components/UI";
import { PieChart, Pie, LabelList } from "recharts";
import { StatisticTotalExpense } from "@/services/dashboard/type";
import { ApiResponse } from "@/services/type";
import { categoryTypeColor } from "@/data/category";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useMounted, useViewpoint } from "@/hooks";
import utils from "@/utils";

const { Paragraph } = Typography;

const { FlexRow, FlexCol } = Flex;

interface TotalExpensesProps {
  totalExpenses: ApiResponse<StatisticTotalExpense[]> | null;
}

const TotalExpenses: FC<TotalExpensesProps> = ({ totalExpenses }) => {
  const t = useTranslations();

  const mounted = useMounted();

  const searchParams = useSearchParams();

  const { isPhone, isSmTablet } = useViewpoint();

  const isMobile = isPhone || isSmTablet;

  const startDateParams = searchParams.get("startDate");

  const endDateParams = searchParams.get("endDate");

  const isError = !totalExpenses || totalExpenses === null || !totalExpenses.success;

  if (!mounted) return null;

  if (isMobile) return null;

  if (isError) {
    return (
      <Card rootClassName="mb-5!">
        <Paragraph italic variant="secondary">
          {t("dashboard.error.totalExpenses")}
        </Paragraph>
      </Card>
    );
  }

  const convertDate = (date: string | null) => {
    if (!date || date === null) return;
    return String(new Date(date)).slice(4, 11);
  };

  const convertExpenses = () => {
    const expenses = totalExpenses.data && Array.isArray(totalExpenses.data) ? totalExpenses.data : [];
    return expenses.map((expense) => {
      const color = categoryTypeColor.find((category) => category.type === expense.type)?.color;
      return {
        type: expense.type,
        name: expense.name,
        amount: expense.amount,
        fill: color,
        percent: expense.percent,
      };
    });
  };

  return (
    <Card rootClassName="mb-5!">
      <Paragraph size={16}>{t("dashboard.totalExpenses.title")}</Paragraph>
      <Paragraph variant="secondary">
        {convertDate(startDateParams)} - {convertDate(endDateParams)}
      </Paragraph>

      <div className="flex items-center justify-around sm:flex-col md:flex-col lg:flex-row">
        <div className="md:w-full lg:w-1/2 flex justify-center">
          <PieChart
            style={{ width: "100%", maxWidth: "500px", maxHeight: "80vh", aspectRatio: 1 }}
            responsive
            margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          >
            <Pie
              data={convertExpenses()}
              dataKey="amount"
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
          {convertExpenses().map((expense) => (
            <FlexRow key={expense.type} aligns="middle" rootClassName="my-5!">
              <FlexCol md={2} lg={2} span={1}>
                <div style={{ backgroundColor: expense.fill }} className="w-8 h-8 rounded-full"></div>
              </FlexCol>
              <FlexCol md={10} lg={10} span={6}>
                <Paragraph>{expense.name}</Paragraph>
              </FlexCol>
              <FlexCol md={6} lg={6} span={4}>
                <Paragraph>{utils.formatCurrency(expense.amount)}</Paragraph>
              </FlexCol>
              <FlexCol md={6} lg={6} span={3}>
                <Paragraph>{expense.percent}%</Paragraph>
              </FlexCol>
            </FlexRow>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TotalExpenses;
