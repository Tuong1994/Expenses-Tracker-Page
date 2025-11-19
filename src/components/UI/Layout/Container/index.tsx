"use client";

import { HTMLAttributes, ReactNode, ForwardRefRenderFunction, useEffect, forwardRef } from "react";
import LayoutContext, { ETheme, LayoutColor, LayoutContextState, LayoutTheme } from "../Context";
import useLayout from "../useLayout";
import utils from "@/utils";

export interface LayoutContainerProps extends HTMLAttributes<HTMLDivElement> {
  rootClassName?: string;
  children?: ReactNode | ReactNode[];
  theme?: LayoutTheme;
  color?: LayoutColor;
}

const LayoutContainer: ForwardRefRenderFunction<HTMLDivElement, LayoutContainerProps> = (
  { rootClassName = "", theme = ETheme.LIGHT, color, children, ...restProps },
  ref
) => {
  const { layoutApi, layoutValue } = useLayout();

  const initialValue: LayoutContextState = {
    theme: layoutValue.layoutTheme,
    color: color ? color : layoutValue.layoutColor,
    layouted: true,
  };

  const themeClassName = `layout-container-${layoutValue.layoutTheme}`;

  const className = utils.formatClassName("layout-container", themeClassName, rootClassName);

  useEffect(() => layoutApi.onSwitchTheme(theme), []);

  return (
    <LayoutContext.Provider value={initialValue}>
      <main ref={ref} {...restProps} className={className}>
        {children}
      </main>
    </LayoutContext.Provider>
  );
};

export default forwardRef(LayoutContainer);
