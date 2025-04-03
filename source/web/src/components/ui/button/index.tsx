"use client";

import { cnModules } from "@/lib/cnModules"; // Caso use para juntar as classes, se não, pode fazer string template normal
import React, { forwardRef } from "react";

import { CircleNotch } from "phosphor-react";
import styles from "./button.module.css";

const sizeStyles = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  full: styles.sizeFull,
};

const variantStyles = {
  primary: styles.variantPrimary,
  secondary: styles.variantSecondary,
  danger: styles.variantDanger,
  safe: styles.variantSafe,
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof sizeStyles;
  variant?: keyof typeof variantStyles;
  loading?: boolean;
  width?: number;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size = "sm", variant = "primary", loading = false, disabled, children, width, className, ...rest }, ref) => {
    const classes = cnModules(styles.buttonBase, sizeStyles[size], variantStyles[variant], className);

    return (
      <button ref={ref} style={{ width }} className={classes} disabled={disabled || loading} {...rest}>
        {loading && (
          <span className={styles.loadingOverlay}>
            <CircleNotch className={styles.loader} />
          </span>
        )}

        <span className={cnModules(styles.content, loading && styles.contentHidden)}>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
