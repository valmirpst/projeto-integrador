"use client";

import { cnModules } from "@/lib/cnModules";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { ComponentProps, ComponentRef, forwardRef, useState } from "react";
import styles from "./checkbox.module.css"; // Importando os estilos do CSS Module

const sizeStyles = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
};

const iconSizeStyles = {
  sm: styles.iconSm,
  md: styles.iconMd,
};

export interface CheckboxProps extends ComponentProps<typeof CheckboxPrimitive.Root> {
  size?: "sm" | "md";
}

export const Checkbox = forwardRef<ComponentRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ size = "md", className, disabled, ...rest }, ref) => {
    const [isChecked, setIsChecked] = useState(false);

    const checkedClasses =
      "data-[state=checked]:bg-unimake-300 data-[state=checked]:border-unimake-300 data-[state=checked]:hover:filter data-[state=checked]:brightness-110 data-[state=checked]:focus:outline-hidden data-[state=checked]:focus-visible:bg-unimake-500";

    const classes = `${styles.checkbox} ${checkedClasses} ${sizeStyles[size]} ${disabled ? styles.disabled : ""} ${
      className || ""
    }`;

    return (
      <CheckboxPrimitive.Root
        onCheckedChange={value => {
          setIsChecked(!!value);
          rest.onCheckedChange?.(value);
        }}
        value={isChecked.toString()}
        ref={ref}
        className={classes}
        disabled={disabled}
        {...rest}
      >
        <CheckboxPrimitive.Indicator className={styles.indicator} asChild>
          <Check weight="bold" className={cnModules(styles.icon, iconSizeStyles[size])} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);

Checkbox.displayName = "Checkbox";
