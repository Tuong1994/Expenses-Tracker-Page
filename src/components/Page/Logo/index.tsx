import { FC } from "react";
import Image, { ImageProps } from "@/components/UI/Image";

interface LogoProps extends ImageProps {}

const Logo: FC<LogoProps> = ({ ...restProps }) => {
  const defaultProps: ImageProps = {
    imgWidth: 55,
    imgHeight: 60,
    ...restProps,
  };

  return <Image src="/logo.png" {...defaultProps} />;
};

export default Logo;
