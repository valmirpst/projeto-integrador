"use client";

import Search from "@/components/search";
import { Box } from "@/components/ui/box";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Box className={styles.homeWrapper}>
      <Search onChange={(event) => console.log(event)} value={searchValue} />
    </Box>
  );
}
