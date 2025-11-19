"use client"

import { FC } from "react";
import { Avatar, Image, Typography, Badge } from "@/components/UI";
import { FaWallet } from "react-icons/fa";
import useLayout from "@/components/UI/Layout/useLayout";

const { Paragraph } = Typography;

interface SideProfileProps {}

const SideProfile: FC<SideProfileProps> = () => {
    const {layoutValue} = useLayout()

  return (
    <div className="flex flex-col items-center">
      <Avatar size={80}>
        <Image />
      </Avatar>
      <Paragraph rootClassName="my-5!" size={15}>Kevin McCoy</Paragraph>
      <Badge ghost shape="square" color={layoutValue.layoutColor}>
        <FaWallet className="mr-3!" />
        <Paragraph>$11.000.000</Paragraph>
      </Badge>
    </div>
  );
};

export default SideProfile;
