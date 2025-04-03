import { ComponentPropsWithoutRef, ElementType, forwardRef } from "react";
import styles from "./heading.module.css";

export type HeadingProps<T extends ElementType = "h2"> = {
  as?: T;
  size?: keyof typeof sizeStyles;
  weight?: keyof typeof weightStyles;
} & ComponentPropsWithoutRef<T>;

const sizeStyles = {
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
  "2xl": styles.size2Xl,
  "3xl": styles.size3Xl,
  "4xl": styles.size4Xl,
};

const weightStyles = {
  regular: styles.weightRegular,
  medium: styles.weightMedium,
  bold: styles.weightBold,
};

const HeadingComponent = <T extends ElementType = "h2">(
  { as, size = "md", weight = "medium", children, className, ...rest }: HeadingProps<T>,
  ref: React.Ref<Element>
) => {
  const classes = `${styles.defaultStyles} ${sizeStyles[size]} ${weightStyles[weight]} ${className || ""}`;
  const Component = as || "h2";

  return (
    // eslint-disable-next-line
    <Component ref={ref as React.Ref<any>} className={classes} {...rest}>
      {children}
    </Component>
  );
};

export const Heading = forwardRef(HeadingComponent) as unknown as {
  <T extends ElementType = "h2">(props: HeadingProps<T> & { ref?: React.Ref<Element> }): React.JSX.Element;
  displayName: string;
};
