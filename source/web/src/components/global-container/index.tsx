"use client";

import { HTMLAttributes, ReactNode } from "react";
import { Box } from "../ui/box";
import styles from "./global-container.module.css";

type Props = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function GlobalContainer(props: Props) {
  const { children } = props;

  return <Box className={styles.globalContainer}>{children}</Box>;
}
