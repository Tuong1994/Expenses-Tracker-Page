import { FC, ReactNode } from "react";
import { Category } from "@/services/category/type";
import { Flex } from "@/components/UI";
import { ECategoryType, ECategoryTypeColor } from "@/services/category/enum";
import { FaBowlFood, FaHouse, FaShieldHeart, FaShirt, FaUserDoctor } from "react-icons/fa6";
import { FaEllipsisH, FaMoneyBill, FaPlane, FaShoppingCart, FaTools } from "react-icons/fa";

const { FlexRow, FlexCol } = Flex;

interface CategoryTypeProps {
  category?: Category;
}

const CategoryType: FC<CategoryTypeProps> = ({ category }) => {
  if (!category) return null;

  const categoryIcons = () => {
    const iconSize = 25;
    const className = "w-18 h-18 rounded-full flex justify-center items-center";
    const icons: Record<ECategoryType, ReactNode> = {
      [ECategoryType.MORTGAGE]: (
        <div className={className} style={{ background: ECategoryTypeColor.MORTGAGE }}>
          <FaHouse size={iconSize} color="#fff" />
        </div>
      ),
      [ECategoryType.FOOD]: (
        <div className={className} style={{ background: ECategoryTypeColor.FOOD }}>
          <FaBowlFood size={iconSize} color="#fff" />
        </div>
      ),
      [ECategoryType.UTILITIES]: (
        <div className={className} style={{ background: ECategoryTypeColor.UTILITIES }}>
          <FaTools size={iconSize} color="#fff" />
        </div>
      ),
      [ECategoryType.BILLS]: (
        <div className={className} style={{ background: ECategoryTypeColor.BILLS }}>
          <FaMoneyBill size={iconSize} color="#fff" />
        </div>
      ),
      [ECategoryType.SHOPPING]: (
        <div className={className} style={{ background: ECategoryTypeColor.SHOPPING }}>
          <FaShoppingCart size={iconSize} color="#fff" />
        </div>
      ),
      [ECategoryType.TRANSPORTATION]: (
        <div className={className} style={{ background: ECategoryTypeColor.TRANSPORTATION }}>
          <FaPlane size={iconSize} color="#fff" />
        </div>
      ),
      [ECategoryType.INSURANCE]: (
        <div className={className} style={{ background: ECategoryTypeColor.INSURANCE }}>
          <FaShieldHeart size={iconSize} color="#fff" />
        </div>
      ),
      [ECategoryType.HEALTHCARE]: (
        <div className={className} style={{ background: ECategoryTypeColor.HEALTHCARE }}>
          <FaUserDoctor size={iconSize} color="#fff" />
        </div>
      ),
      [ECategoryType.CLOTHING]: (
        <div className={className} style={{ background: ECategoryTypeColor.CLOTHING }}>
          <FaShirt size={iconSize} color="#fff" />
        </div>
      ),
      [ECategoryType.OTHERS]: (
        <div className={className} style={{ background: ECategoryTypeColor.OTHERS }}>
          <FaEllipsisH size={iconSize} color="#fff" />
        </div>
      ),
    };
    return icons[category.type];
  };

  return (
    <FlexRow aligns="middle" rootClassName="w-full!">
      <FlexCol>{categoryIcons()}</FlexCol>
      <FlexCol>{category.name}</FlexCol>
    </FlexRow>
  );
};

export default CategoryType;
