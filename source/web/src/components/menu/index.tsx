import { Box } from "../ui/box";
import Img from "../ui/img";
import { Text } from "../ui/text";
import styles from "./menu.module.css";

export default function Menu() {
  return (
    <Box className={styles.menuWrapper}>
      <Box className={styles.menuHeader}>
        <Img src="/logo.png" width={65} height={65} alt="logo" />
        <Box>
          <Text size="lg" weight="bold" color="gray50">
            BiblioTech
          </Text>
          <Text size="xs" weight="light" color="gray50">
            Nunca é tarde para começar a ler
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
