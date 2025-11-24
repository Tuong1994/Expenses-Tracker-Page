"use client";

import { FC } from "react";
import { Flex } from "@/components/UI";
import { DatePicker } from "@/components/Control";
import { ControlColor } from "@/components/Control/type";
import useLayout from "@/components/UI/Layout/useLayout";

const { FlexRow, FlexCol } = Flex;

interface DateFilterProps {
  className?: string;
}

const DateFilter: FC<DateFilterProps> = ({ className }) => {
  const { layoutValue } = useLayout();

  return (
    <FlexRow rootClassName={className} justify="between">
      <FlexCol xs={24} md={12} lg={12} span={12}>
        <DatePicker placement="right" color={layoutValue.layoutColor as ControlColor} />
      </FlexCol>
      <FlexCol xs={24} md={12} lg={12} span={12}>
        <DatePicker placement="right" color={layoutValue.layoutColor as ControlColor} />
      </FlexCol>
    </FlexRow>
  );
};

export default DateFilter;
