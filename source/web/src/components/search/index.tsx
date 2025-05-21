"use client";
import * as Icon from "phosphor-react";
import { Box } from "../ui/box";
import { Input } from "../ui/input";
import styles from "./search.module.css";
import React, { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLInputElement> & {
  value: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  width?: number;
};

export default function Search(props: Props) {
  const { setState, className, value, width, ...rest } = props;

  return (
    <Box {...rest} className={className}>
      <Input
        id="search-home"
        style={{ width: `${width && width / 16}rem !important` }}
        label="Pesquisa"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setState(event.target.value);
        }}
        value={value}
        className={styles.search}
        startIcon={<Icon.MagnifyingGlass size={18} />}
      />
    </Box>
  );
}
