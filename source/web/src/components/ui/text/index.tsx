import { cnModules } from "@/lib/cnModules";
import { forwardRef } from "react";
import styles from "./text.module.css"; // Importando o arquivo de estilos

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: React.ElementType;
  size?: keyof typeof sizeStyles;
  weight?: keyof typeof weightStyles;
  color?: keyof typeof colorStyles;
}

const colorStyles = {
  primary100: styles.colorPrimary100,
  primary300: styles.colorPrimary300,
  primary500: styles.colorPrimary500,
  primary700: styles.colorPrimary700,
  primary900: styles.colorPrimary900,

  gray50: styles.colorGray50,
  gray100: styles.colorGray100,
  gray200: styles.colorGray200,
  gray300: styles.colorGray300,
  gray400: styles.colorGray400,
  gray500: styles.colorGray500,
  gray600: styles.colorGray600,
  gray700: styles.colorGray700,

  danger300: styles.colorDanger300,
  danger500: styles.colorDanger500,
  danger700: styles.colorDanger700,

  safe300: styles.colorSafe300,
  safe500: styles.colorSafe500,
  safe700: styles.colorSafe700,
};

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

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      as: Component = "p",
      size = "md",
      weight = "regular",
      color = "gray700",
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const classes = cnModules(
      styles.defaultStyles,
      sizeStyles[size],
      weightStyles[weight],
      colorStyles[color],
      className
    );

    return (
      <Component ref={ref} className={classes} {...rest}>
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";
