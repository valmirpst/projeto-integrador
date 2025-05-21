"use client";

import { cnModules } from "@/lib/cnModules";
import { forwardRef, ReactNode, useState } from "react";
import styles from "./input.module.css";
import { theme } from "@/theme";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  hasError?: boolean;
  hSize?: "sm" | "md" | "lg";
  prefix?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      hasError = false,
      hSize = "md",
      prefix,
      startIcon,
      endIcon,
      className,
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div>
        <label
          htmlFor={id}
          className={styles.label}
          style={{
            color: isFocused ? theme.colors.primary300 : theme.colors.gray700,
          }}
        >
          {label}
        </label>
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
            <span
              className={cnModules(
                styles.prefix,
                (startIcon || endIcon ? true : false) && styles.hasIcon
              )}
            >
              {prefix}
            </span>
          )}
          <input
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            spellCheck={false}
            className={styles.input}
            ref={ref}
            {...rest}
          />
          {endIcon}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
