"use client";
import * as Icon from "phosphor-react";
import { Box } from "../ui/box";
import { Input } from "../ui/input";
import styles from "./search.module.css";
import { Text } from "../ui/text";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLInputElement> & { value: string };

export default function Search(props: Props) {
  const { onChange, value } = props;

  return (
    <Box>
      <Text size="sm" className={styles.label}>
        Pesquisa
      </Text>
      <Input
        onChange={onChange}
        value={value}
        className={styles.search}
        startIcon={<Icon.MagnifyingGlass size={18} />}
      />
    </Box>
  );
}
