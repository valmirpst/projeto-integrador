"use client";
import * as Icon from "phosphor-react";
import { Box } from "../ui/box";
import { Input } from "../ui/input";
import styles from "./search.module.css";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLInputElement> & {
  value: string;
  width?: number;
};

export default function Search(props: Props) {
  const { onChange, className, value, width, ...rest } = props;

  return (
    <Box {...rest} className={className}>
      <Input
        id="search-home"
        style={{ width: `${width && width / 16}rem !important` }}
        label="Pesquisa"
        onChange={onChange}
        value={value}
        className={styles.search}
        startIcon={<Icon.MagnifyingGlass size={18} />}
      />
    </Box>
  );
}
