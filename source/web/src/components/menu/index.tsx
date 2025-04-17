"use client";
import { Box } from "../ui/box";
import Img from "../ui/img";
import { Text } from "../ui/text";
import styles from "./menu.module.css";
import * as Icon from "phosphor-react";
import { theme } from "@/theme";
import MenuItem from "./menu-item";

const userMenu = [
  {
    icon: <Icon.House width={20} height={20} color={theme.colors.gray100} />,
    text: "Home",
  },
  {
    icon: (
      <Icon.Bookmarks width={20} height={20} color={theme.colors.gray100} />
    ),
    text: "Categorias",
  },
  {
    icon: <Icon.Book width={20} height={20} color={theme.colors.gray100} />,
    text: "Acervo",
  },
];

const librarianMenu = [
  {
    icon: <Icon.House width={20} height={20} color={theme.colors.gray100} />,
    text: "Dashboard",
  },
  {
    icon: <Icon.Books width={20} height={20} color={theme.colors.gray100} />,
    text: "Livro",
  },
  {
    icon: (
      <Icon.AddressBook width={20} height={20} color={theme.colors.gray100} />
    ),
    text: "Reserva",
  },
];

const userSubMenu = [
  {
    icon: <Icon.Heart width={20} height={20} color={theme.colors.gray100} />,
    text: "Favoritos",
  },
  {
    icon: (
      <Icon.LightbulbFilament
        width={20}
        height={20}
        color={theme.colors.gray100}
      />
    ),
    text: "Sugestões de Leitura",
  },
  {
    icon: (
      <Icon.ChartLineUp width={20} height={20} color={theme.colors.gray100} />
    ),
    text: "Livros Lidos",
  },
];

export default function Menu() {
  const menuItems = true ? userMenu : librarianMenu;

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

      <Text className={styles.menuSectionTitle} size="lg" color="gray50">
        Descubra seu livro
      </Text>

      {menuItems.map((item) => (
        <MenuItem key={item.text} text={item.text} icon={item.icon} />
      ))}

      {true && (
        <>
          <Box className={styles.menuDivider} />
          {userSubMenu.map((item) => (
            <MenuItem key={item.text} text={item.text} icon={item.icon} />
          ))}
        </>
      )}

      <Box className={styles.menuFooter}>
        <Box className={styles.emptyProfilePhoto}>
          <Icon.User width={24} height={24} color={theme.colors.gray700} />
        </Box>
        <Box>
          <Text
            className={styles.loginText}
            size="md"
            weight="bold"
            color="gray50"
          >
            Entrar/Registrar
          </Text>
          <Text size="xs" weight="light" color="gray50">
            Encerrar sessão
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
