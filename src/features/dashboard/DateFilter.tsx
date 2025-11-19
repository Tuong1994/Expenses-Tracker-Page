"use client";

import { FC } from "react";
import { Space } from "@/components/UI";
import { DatePicker } from "@/components/Control";
import { ControlColor } from "@/components/Control/type";
import useLayout from "@/components/UI/Layout/useLayout";

interface DateFilterProps {}

const DateFilter: FC<DateFilterProps> = () => {
  const { layoutValue } = useLayout();

  return (
    <Space>
      <DatePicker
        placement="right"
        rootStyle={{ width: "200px" }}
        color={layoutValue.layoutColor as ControlColor}
      />
      <DatePicker
        placement="right"
        rootStyle={{ width: "200px" }}
        color={layoutValue.layoutColor as ControlColor}
      />
    </Space>
  );
};

export default DateFilter;
