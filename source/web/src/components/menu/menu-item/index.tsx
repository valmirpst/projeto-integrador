import { Box } from "@/components/ui/box";
import styles from "./menu-item.module.css";
import { Text } from "@/components/ui/text";
import Link from "next/link";

type Props = {
  icon: React.ReactNode;
  text: string;
  url: string;
};

export default function MenuItem(props: Props) {
  const { icon, text, url } = props;

  return (
    <Link className={styles.menuItem} href={url}>
      <Box className={styles.menuItemContent}>
        {icon}
        <Text className={styles.text} size="md" weight="light" color="gray100">
          {text}
        </Text>
      </Box>
    </Link>
  );
}
