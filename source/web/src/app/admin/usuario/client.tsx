"use client";
import { Box } from "@/components/ui/box";
import styles from "./user.module.css";
import stylesAdmin from "../admin.module.css";
import Table, { ColumnType } from "@/components/table";
import { Text } from "@/components/ui/text";
import Search from "@/components/search";
import { useEffect, useState } from "react";
import Select from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { UserType } from "@/@types/user";
import RegisterUserModal, {
  PropsRegisterModalType,
} from "@/components/register-modal";
import { getTokenHeader } from "@/lib/getTokenHeader";

// type EditarAtributo<T, K extends keyof T, V> = Omit<T, K> & { [P in K]: V };

// type UserItem = EditarAtributo<UserType, "criado_em", string>;

export default function UsuarioClient() {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState<UserType[]>([]);
  const [isCreateUserModalActive, setIsCreateUserModalActive] = useState(false);
  const [userEditProps, setUserEditProps] = useState<
    Partial<PropsRegisterModalType>
  >({});

  useEffect(() => {
    console.log("teste");
    loadUsers();
  }, []);

  function onOpenChange() {
    loadUsers();
    setIsCreateUserModalActive(false);
    setUserEditProps({});
  }

  const columns: ColumnType<UserType> = {
    nome: {
      title: "Livro",
      proporcion: 2.5,
      // image: "caminho_img",
    },
    perfil: {
      title: "Usuário",
      proporcion: 2,
    },
    ciape: {
      title: "Bibliotecário(a)",
      proporcion: 1.5,
    },
    telefone: {
      title: "Data",
      proporcion: 2,
      justify: "center",
    },
  };

  const loadUsers = async () => {
    console.log("teste");
    const res = await api.usuarios.getAsync(getTokenHeader());
    console.log(res.data);
    // @ts-expect-error teste
    if (res.data) setUsers(res.data.data);
  };

  const userFormat = users.map((user) => {
    return {
      ...user,
    };
  });

  async function handleTrash(user: UserType) {
    await api.usuarios.deleteAsync(user.id, getTokenHeader());
    await loadUsers();
  }

  function handleEdit(user: UserType) {
    setUserEditProps({
      open: true,
      onOpenChange: onOpenChange,
      formdata: user,
      update: true,
    });
  }

  return (
    <Box className={styles.adminBookWrapper}>
      <Text as="h1" className={stylesAdmin.adminTitle}>
        Usuários
      </Text>
      <Box className={stylesAdmin.adminFilterContainer}>
        <Box className={stylesAdmin.adminFilters}>
          <Search
            className={stylesAdmin.adminSearch}
            value={searchValue}
            setState={setSearchValue}
            width={500}
          />
          <Box className={stylesAdmin.adminSelectContainer}>
            {/* <Select
              options={["Mais recente", "Mais antigo"]}
              label="Ordenar Por"
              width={200}
            /> */}
          </Box>
          <Button
            className={stylesAdmin.adminButton}
            size="sm"
            width={120}
            onClick={() => setIsCreateUserModalActive(true)}
          >
            Cadastrar
          </Button>
        </Box>
        <Box className={stylesAdmin.adminOtherInformations}>
          <Text color="gray400">{users.length} produtos encontrados</Text>
          <Box className={stylesAdmin.adminCleanFilters}>
            <Text color="primary300" weight="bold">
              Limpar filtros
            </Text>
            <Text>Filtros selecionados</Text>
          </Box>
        </Box>
      </Box>
      <Table
        items={userFormat}
        columns={columns}
        handleTrash={handleTrash}
        handleEdit={handleEdit}
      />
      <RegisterUserModal
        open={isCreateUserModalActive}
        onOpenChange={onOpenChange}
        {...userEditProps}
      />
    </Box>
  );
}
