"use client";

import { FC, useState } from "react";
import { Flex } from "@/components/UI";
import { DatePicker } from "@/components/Control";
import { ControlColor } from "@/components/Control/type";
import { StatisticReqBody } from "@/services/dashboard/type";
import { useRouter } from "@/i18n/navigation";
import useLayout from "@/components/UI/Layout/useLayout";
import utils from "@/utils";

const { FlexRow, FlexCol } = Flex;

interface DateFilterProps {
  className?: string;
}

const DateFilter: FC<DateFilterProps> = ({ className }) => {
  const { layoutValue } = useLayout();

  const [dates, setDates] = useState<StatisticReqBody>({
    startDate: utils.formatDateValue(new Date("2025-01-01")),
    endDate: utils.formatDateValue(new Date("2025-12-01")),
  });

  const router = useRouter();

  const handleSelectStartDate = (date: Date) => {
    const formatted = utils.formatDateValue(date);
    setDates((prev) => ({ ...prev, startDate: formatted }));
    router.push(`?startDate=${formatted}&endDate=${dates.endDate}`);
  };

  const handleSelectEndDate = (date: Date) => {
    const formatted = utils.formatDateValue(date);
    setDates((prev) => ({ ...prev, endDate: formatted }));
    router.push(`?startDate=${dates.startDate}&endDate=${formatted}`);
  };

  return (
    <FlexRow rootClassName={className} justify="between">
      <FlexCol xs={24} md={12} lg={12} span={12}>
        <DatePicker
          placement="right"
          value={new Date(dates.startDate)}
          color={layoutValue.layoutColor as ControlColor}
          onChangeSelect={handleSelectStartDate}
        />
      </FlexCol>
      <FlexCol xs={24} md={12} lg={12} span={12}>
        <DatePicker
          placement="right"
          value={new Date(dates.endDate)}
          color={layoutValue.layoutColor as ControlColor}
          onChangeSelect={handleSelectEndDate}
        />
      </FlexCol>
    </FlexRow>
  );
};

export default DateFilter;
