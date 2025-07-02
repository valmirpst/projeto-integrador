import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { theme } from "@/theme";
import Link from "next/link";
import * as Icon from "phosphor-react";
import styles from "./menu-item.module.css";

type Props = {
  icon: React.ReactNode;
  text: string;
  url: string;
  onClick?: () => void;
};

const icons = {
  house: <Icon.House width={20} height={20} color={theme.colors.gray100} />,
  Bookmarks: <Icon.Bookmarks width={20} height={20} color={theme.colors.gray100} />,
};

export default function MenuItem(props: Props) {
  const { icon, text, url } = props;

  const teste = Icon["LightbulbFilament"];

  return (
    <Link className={styles.menuItem} href={url} onClick={props.onClick}>
      <Box className={styles.menuItemContent}>
        <Text className={styles.text} size="md" weight="light" color="gray100">
          {text}
        </Text>
      </Box>
    </Link>
  );
}
