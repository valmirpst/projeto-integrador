import { cnModules } from "@/lib/cnModules";
import React, { ComponentPropsWithoutRef, ElementType, forwardRef } from "react";
import styles from "./box.module.css";

export type BoxProps<T extends ElementType = "div"> = {
  as?: T;
  height?: string;
} & ComponentPropsWithoutRef<T>;

// Definição do componente Box usando forwardRef
const BoxComponent = <T extends ElementType = "div">(
  { as, className, children, height, ...rest }: BoxProps<T>,
  ref: React.Ref<Element>
) => {
  const Component = as || "div";

  return (
    <Component
      ref={ref as React.Ref<any>}
      style={{ height }}
      className={cnModules(styles.boxBase, className)} // Usando CSS Module para os estilos
      {...rest}
    >
      {children}
    </Component>
  );
};

// Fazendo "type assertion" para adicionar displayName
export const Box = forwardRef(BoxComponent) as unknown as {
  <T extends ElementType = "div">(props: BoxProps<T> & { ref?: React.Ref<Element> }): React.JSX.Element;
  displayName: string;
};

Box.displayName = "Box";
