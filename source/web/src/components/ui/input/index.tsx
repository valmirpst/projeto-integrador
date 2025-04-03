"use client";

import { cnModules } from "@/lib/cnModules";
import { forwardRef, ReactNode } from "react";
import styles from "./input.module.css";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  hSize?: "sm" | "md" | "lg";
  prefix?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError = false, hSize = "md", prefix, startIcon, endIcon, className, ...rest }, ref) => {
    return (
      <div
        className={cnModules(
          styles.container,
          styles[hSize],
          hasError && styles.hasError,

          (startIcon || endIcon ? true : false) && !prefix && styles.hasIcon,
          className
        )}
      >
        {startIcon}
        {!!prefix && (
          <span className={cnModules(styles.prefix, (startIcon || endIcon ? true : false) && styles.hasIcon)}>{prefix}</span>
        )}
        <input spellCheck={false} className={styles.input} ref={ref} {...rest} />
        {endIcon}
      </div>
    );
  }
);

Input.displayName = "Input";
