import { Box } from "@/components/ui/box";
import styles from "./menu-item.module.css";
import { Text } from "@/components/ui/text";
import Link from "next/link";
import * as Icon from "phosphor-react";
import { theme } from "@/theme";

type Props = {
  icon: React.ReactNode;
  text: string;
  url: string;
};

const icons = {
  house: <Icon.House width={20} height={20} color={theme.colors.gray100} />,
  Bookmarks: (
    <Icon.Bookmarks width={20} height={20} color={theme.colors.gray100} />
  ),
};

export default function MenuItem(props: Props) {
  const { icon, text, url } = props;

  const teste = Icon["LightbulbFilament"];

  return (
    <Link className={styles.menuItem} href={url}>
      <Box className={styles.menuItemContent}>
        <Text className={styles.text} size="md" weight="light" color="gray100">
          {text}
        </Text>
      </Box>
    </Link>
  );
}
