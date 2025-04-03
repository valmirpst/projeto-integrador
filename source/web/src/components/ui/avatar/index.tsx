"use client";

import { cnModules } from "@/lib/cnModules";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { ComponentProps, ComponentRef, forwardRef } from "react";

import { User } from "phosphor-react";
import styles from "./avatar.module.css";

const rootSizeStyles = {
  xs: styles.rootXs,
  sm: styles.rootSm,
  md: styles.rootMd,
  lg: styles.rootLg,
};

const fallbackIconSizeStyles = {
  xs: styles.iconXs,
  sm: styles.iconSm,
  md: styles.iconMd,
  lg: styles.iconLg,
};

export interface AvatarProps extends ComponentProps<typeof AvatarPrimitive.Root> {
  size?: keyof typeof rootSizeStyles;
  imageClassname?: string;
  src?: string;
}

export const Avatar = forwardRef<ComponentRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ size = "md", imageClassname, src, className, ...rest }, ref) => {
    const rootClasses = cnModules(styles.rootBase, rootSizeStyles[size], className);

    return (
      <AvatarPrimitive.Root ref={ref} className={rootClasses} {...rest}>
        <AvatarPrimitive.Image src={src} className={cnModules(styles.image, imageClassname)} />

        <AvatarPrimitive.Fallback className={cnModules(styles.fallback, imageClassname)} delayMs={600}>
          <User className={fallbackIconSizeStyles[size]} />
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    );
  }
);

Avatar.displayName = "Avatar";
