"use client";
import { ReserveType } from "@/@types/reserve";
import RegisterReserveModal from "@/components/register-reserve-modal";
import Search from "@/components/search";
import Table, { ColumnType } from "@/components/table";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { api } from "@/lib/api";
import { getTokenHeader } from "@/lib/getTokenHeader";
import { useEffect, useState } from "react";
import stylesAdmin from "../admin.module.css";
import styles from "./reserve.module.css";

type EditarAtributo<T, K extends keyof T, V> = Omit<T, K> & { [P in K]: V };

type ReserveItem = EditarAtributo<ReserveType, "criado_em", string>;

export default function ReserveClient() {
  const [searchValue, setSearchValue] = useState("");
  const [reserves, setReserves] = useState<ReserveType[]>([]);
  const [isCreateReserveModalActive, setIsCreateReverveModalActive] = useState(false);

  useEffect(() => {
    loadReserves();
  }, []);

  const columns: ColumnType<ReserveItem> = {
    isbn_livro: {
      title: "Livro",
      proporcion: 2.5,
      // image: "caminho_img",
    },
    id_usuario: {
      title: "Usuário",
      proporcion: 2,
    },
    id_bibliotecario: {
      title: "Bibliotecário(a)",
      proporcion: 1.5,
    },
    criado_em: {
      title: "Data",
      proporcion: 2,
      justify: "center",
    },
  };

  const loadReserves = async () => {
    const res = await api.reservas.getAsync(getTokenHeader() || {});

    if (res.data) setReserves(res.data);
  };

  function onOpenChange() {
    loadReserves();
    setIsCreateReverveModalActive(false);
    // setLivroEditProps({});
  }

  const reserverFormat = reserves
    .filter(reserve => reserve.status === "ativo")
    .map(reserve => {
      return {
        ...reserve,
        criado_em: new Date(reserve.criado_em).toLocaleDateString("pt-BR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      };
    });

  async function handleTrash(reserve: ReserveItem) {
    await api.reservas.deleteAsync(reserve.id, getTokenHeader() || {});
    await loadReserves();
  }

  function handleEdit() {
    console.log("edit");
  }

  return (
    <Box className={styles.adminBookWrapper}>
      <Text as="h1" className={stylesAdmin.adminTitle}>
        Reservas
      </Text>
      <Box className={stylesAdmin.adminFilterContainer}>
        <Box className={stylesAdmin.adminFilters}>
          <Search className={stylesAdmin.adminSearch} value={searchValue} setState={setSearchValue} width={500} />
          <Box className={stylesAdmin.adminSelectContainer}>
            {/* <Select
              options={reserves.map((value) => value.status)}
              label="Gênero"
              width={200}
            />
            <Select
              options={["Mais recente", "Mais antigo"]}
              label="Ordenar Por"
              width={200}
            /> */}
          </Box>
          <Button onClick={() => setIsCreateReverveModalActive(true)} className={stylesAdmin.adminButton} size="sm" width={120}>
            Cadastrar
          </Button>
        </Box>
        <Box className={stylesAdmin.adminOtherInformations}>
          <Text color="gray400">{reserves ? reserves.length : 0} produtos encontrados</Text>
          <Box className={stylesAdmin.adminCleanFilters}>
            <Text color="primary300" weight="bold">
              Limpar filtros
            </Text>
            <Text>Filtros selecionados</Text>
          </Box>
        </Box>
      </Box>
      <Table items={reserverFormat} columns={columns} handleTrash={handleTrash} handleEdit={handleEdit} />
      <RegisterReserveModal
        open={isCreateReserveModalActive}
        onOpenChange={onOpenChange}
        // {...livroEditProps}
      />
    </Box>
  );
}
