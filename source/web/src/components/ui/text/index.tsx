import { cnModules } from "@/lib/cnModules";
import { forwardRef } from "react";
import styles from "./text.module.css"; // Importando o arquivo de estilos

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: React.ElementType;
  size?: keyof typeof sizeStyles;
  weight?: keyof typeof weightStyles;
  variant?: keyof typeof variantStyles;
}

const sizeStyles = {
  xxs: styles.sizeXxs,
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  smMd: styles.sizeSmMd,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
  "2xl": styles.size2Xl,
};

const weightStyles = {
  light: styles.weightLight,
  regular: styles.weightRegular,
  medium: styles.weightMedium,
  bold: styles.weightBold,
};

const variantStyles = {
  default: styles.variantDefault,
  lighter: styles.variantLighter,
  light: styles.variantLight,
  danger: styles.variantDanger,
  safe: styles.variantSafe,
};

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ as: Component = "p", size = "md", weight = "regular", variant = "default", children, className, ...rest }, ref) => {
    const classes = cnModules(styles.defaultStyles, sizeStyles[size], weightStyles[weight], variantStyles[variant], className);

    return (
      <Component ref={ref} className={classes} {...rest}>
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";
