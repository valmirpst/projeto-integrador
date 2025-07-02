"use client";
import { UserType } from "@/@types/user";
import { api } from "@/lib/api";
import { getTokenHeader, parseJwt } from "@/lib/getTokenHeader";
import { theme } from "@/theme";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as Icon from "phosphor-react";
import { useEffect, useState } from "react";
import LoginModal from "../login-modal";
import { Avatar } from "../ui/avatar";
import { Box } from "../ui/box";
import Img from "../ui/img";
import { Text } from "../ui/text";
import MenuItem from "./menu-item";
import styles from "./menu.module.css";

const userMenu = [
  {
    icon: <Icon.House width={20} height={20} color={theme.colors.gray100} />,
    text: "Home",
    url: "/",
  },
  {
    icon: <Icon.Bookmarks width={20} height={20} color={theme.colors.gray100} />,
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
    icon: <Icon.AddressBook width={20} height={20} color={theme.colors.gray100} />,
    text: "Reserva",
    url: "/admin/reserva",
  },
  {
    icon: <Icon.AddressBook width={20} height={20} color={theme.colors.gray100} />,
    text: "Usuário",
    url: "/admin/usuario",
  },
];

const userSubMenu = [
  {
    icon: <Icon.Heart width={20} height={20} color={theme.colors.gray100} />,
    text: "Favoritos",
    url: "favoritos",
  },
  {
    icon: <Icon.LightbulbFilament width={20} height={20} color={theme.colors.gray100} />,
    text: "Sugestões de Leitura",
    url: "sugestoes",
  },
  {
    icon: <Icon.ChartLineUp width={20} height={20} color={theme.colors.gray100} />,
    text: "Livros Lidos",
    url: "livros-lidos",
  },
];

export default function Menu() {
  const [isRegisterModalActive, setIsRegisterModalActive] = useState(false);
  const [user, setUser] = useState<{ data: UserType } | null>(null);

  const [menuWidth, setMenuWidth] = useState("0");

  const isAdmin = user?.data.perfil === "bibliotecario" ? true : false;
  const menuItems = isAdmin ? librarianMenu : userMenu;

  useEffect(() => {
    const token = getTokenHeader()?.options.headers.Authorization.split(" ")[1];
    if (!token) return;
    const parsedToken = parseJwt(token);
    const usuario = parsedToken?.payload as { id: string; nome: string; email: string };
    fetchUser(usuario);

    async function fetchUser(userFromToken: { id: string; nome: string; email: string }) {
      const { data } = await api.usuarios.getByIdAsync(userFromToken.id, getTokenHeader() || {});
      // @ts-expect-error ignore
      setUser(data);
    }
  }, []);

  return (
    <>
      <button className={styles.menuToggleButton} onClick={() => setMenuWidth(menuWidth === "0" ? "18rem" : "0")}>
        {menuWidth === "0" ? <ChevronRight /> : <ChevronLeft />}
      </button>
      <Box className={styles.menuWrapper} style={{ width: menuWidth, padding: menuWidth === "0" ? "0" : "3rem 2rem" }}>
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

        {menuItems.map(item => (
          <MenuItem onClick={() => setMenuWidth("0")} key={item.text} url={item.url} text={item.text} icon={item.icon} />
        ))}

        {!isAdmin && (
          <>
            <Box className={styles.menuDivider} />
            {userSubMenu.map(item => (
              <MenuItem onClick={() => setMenuWidth("0")} key={item.text} url={item.url} text={item.text} icon={item.icon} />
            ))}
          </>
        )}

        <Box className={styles.menuFooter} onClick={() => setIsRegisterModalActive(true)}>
          <Avatar src="" />
          <Box>
            <Text className={styles.loginText} size="md" weight="bold" color="gray50">
              {user?.data.nome || "Entrar/Registrar"}
            </Text>
            <Text
              size="xs"
              weight="light"
              color="gray50"
              onClick={e => {
                e.stopPropagation();
                localStorage.removeItem("token");
                location.reload();
              }}
              style={{ cursor: "pointer" }}
            >
              Encerrar sessão
            </Text>
          </Box>
        </Box>
      </Box>
      <LoginModal user={user?.data || null} open={isRegisterModalActive} onOpenChange={() => setIsRegisterModalActive(false)} />
    </>
  );
}
