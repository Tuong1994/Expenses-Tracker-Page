"use client";

import { FC } from "react";
import { Flex } from "@/components/UI";
import { DatePicker } from "@/components/Control";
import { ControlColor } from "@/components/Control/type";
import { StatisticReqBody } from "@/services/dashboard/type";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { defaultEndDate, defaultStartDate } from "@/data/transaction";
import useLayout from "@/components/UI/Layout/useLayout";
import utils from "@/utils";

const { FlexRow, FlexCol } = Flex;

interface DateFilterProps {
  className?: string;
}

const DateFilter: FC<DateFilterProps> = ({ className }) => {
  const { layoutValue } = useLayout();

  const router = useRouter();

  const searchParams = useSearchParams();

  const startDateParams = searchParams.get("startDate");

  const endDateParams = searchParams.get("endDate");

  const dates: StatisticReqBody = {
    startDate: startDateParams ? startDateParams : utils.formatDateValue(defaultStartDate),
    endDate: endDateParams ? endDateParams : utils.formatDateValue(defaultEndDate),
  };

  const updateDates = (partialDates: Partial<StatisticReqBody>) => {
    const newDates = { ...dates, ...partialDates };
    router.push(`?startDate=${newDates.startDate}&endDate=${newDates.endDate}`);
  };

  const handleSelectStartDate = (date: Date) => updateDates({ startDate: utils.formatDateValue(date) });

  const handleSelectEndDate = (date: Date) => updateDates({ endDate: utils.formatDateValue(date) });

  return (
    <FlexRow rootClassName={className} justify="between">
      <FlexCol xs={24} md={12} lg={12} span={12}>
        <DatePicker
          placement="right"
          hasReset={false}
          value={new Date(dates.startDate)}
          color={layoutValue.layoutColor as ControlColor}
          onChangeSelect={handleSelectStartDate}
        />
      </FlexCol>
      <FlexCol xs={24} md={12} lg={12} span={12}>
        <DatePicker
          placement="right"
          hasReset={false}
          value={new Date(dates.endDate)}
          color={layoutValue.layoutColor as ControlColor}
          onChangeSelect={handleSelectEndDate}
        />
      </FlexCol>
    </FlexRow>
  );
};

export default DateFilter;
