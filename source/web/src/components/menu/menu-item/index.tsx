import { Box } from "@/components/ui/box";
import styles from "./menu-item.module.css";
import { Text } from "@/components/ui/text";

type Props = {
  icon: React.ReactNode;
  text: string;
};

export default function MenuItem(props: Props) {
  const { icon, text } = props;

  return (
    <Box className={styles.menuItem}>
      {icon}
      <Text size="md" weight="light" color="gray100">
        {text}
      </Text>
    </Box>
  );
}
