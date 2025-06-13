"use client";
import { theme } from "@/theme";
import * as Icon from "phosphor-react";
import { Avatar } from "../ui/avatar";
import { Box } from "../ui/box";
import Img from "../ui/img";
import { Text } from "../ui/text";
import MenuItem from "./menu-item";
import styles from "./menu.module.css";
import { useEffect, useState } from "react";
import RegisterLivroModal from "../register-modal";
import { UserType } from "@/@types/user";
import { api } from "@/lib/api";

const userMenu = [
  {
    icon: <Icon.House width={20} height={20} color={theme.colors.gray100} />,
    text: "Home",
    url: "/",
  },
  {
    icon: (
      <Icon.Bookmarks width={20} height={20} color={theme.colors.gray100} />
    ),
    text: "Categorias",
    url: "categorias",
  },
  {
    icon: <Icon.Book width={20} height={20} color={theme.colors.gray100} />,
    text: "Acervo",
    url: "acervo",
  },
];

const librarianMenu = [
  {
    icon: <Icon.House width={20} height={20} color={theme.colors.gray100} />,
    text: "Dashboard",
    url: "/admin/dashboard",
  },
  {
    icon: <Icon.Books width={20} height={20} color={theme.colors.gray100} />,
    text: "Livro",
    url: "/admin/livro",
  },
  {
    icon: (
      <Icon.AddressBook width={20} height={20} color={theme.colors.gray100} />
    ),
    text: "Reserva",
    url: "/admin/reserva",
  },
];

const userSubMenu = [
  {
    icon: <Icon.Heart width={20} height={20} color={theme.colors.gray100} />,
    text: "Favoritos",
    url: "favoritos",
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
    url: "sugestoes",
  },
  {
    icon: (
      <Icon.ChartLineUp width={20} height={20} color={theme.colors.gray100} />
    ),
    text: "Livros Lidos",
    url: "livros-lidos",
  },
];

type PropsType = {
  user: UserType;
};

export default function Menu() {
  const [isRegisterModalActive, setIsRegisterModalActive] = useState(false);
  const [user, setUser] = useState<UserType | null>();

  const isAdmin = true;
  const menuItems = isAdmin ? librarianMenu : userMenu;

  useEffect(() => {
    async function fetchUser() {
      const userResponse = await api.usuarios.getByIdAsync("u10");
      setUser(userResponse.data);
    }
    fetchUser();
  }, []);

  return (
    <>
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
          {isAdmin ? "Gerencie a biblioteca" : "Descubra seu livro"}
        </Text>

        {menuItems.map((item) => (
          <MenuItem
            key={item.text}
            url={item.url}
            text={item.text}
            icon={item.icon}
          />
        ))}

        {!isAdmin && (
          <>
            <Box className={styles.menuDivider} />
            {userSubMenu.map((item) => (
              <MenuItem
                key={item.text}
                url={item.url}
                text={item.text}
                icon={item.icon}
              />
            ))}
          </>
        )}

        <button onClick={() => setIsRegisterModalActive(true)}>
          <Box className={styles.menuFooter}>
            <Avatar src="" />
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
        </button>
      </Box>
      <RegisterLivroModal
        open={isRegisterModalActive}
        onOpenChange={() => setIsRegisterModalActive(false)}
      />
    </>
  );
}
