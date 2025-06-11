"use client";
import { Box } from "@/components/ui/box";
import styles from "./reserve.module.css";
import stylesAdmin from "../admin.module.css";
import Table, { ColumnType } from "@/components/table";
import { Text } from "@/components/ui/text";
import Search from "@/components/search";
import { useEffect, useState } from "react";
import Select from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ReserveType } from "@/@types/reserve";
import { api } from "@/lib/api";

type EditarAtributo<T, K extends keyof T, V> = Omit<T, K> & { [P in K]: V };

export default function ReserveClient() {
  const [searchValue, setSearchValue] = useState("");
  const [reserves, setReserves] = useState<ReserveType[]>([]);

  useEffect(() => {
    loadReserves();
  }, []);

  const columns: ColumnType<EditarAtributo<ReserveType, "criado_em", string>> =
    {
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
    const res = await api.reservas.getAsync();
    if (res.data) setReserves(res.data);
  };

  const reserverFormat = reserves.map((reserve) => {
    return {
      ...reserve,
      criado_em: new Date(reserve.criado_em).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
  });

  function handleTrash() {
    console.log("trash");
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
          <Search
            className={stylesAdmin.adminSearch}
            value={searchValue}
            setState={setSearchValue}
            width={500}
          />
          <Box className={stylesAdmin.adminSelectContainer}>
            <Select
              options={reserves.map((value) => value.status)}
              label="Gênero"
              width={200}
            />
            <Select
              options={["Mais recente", "Mais antigo"]}
              label="Ordenar Por"
              width={200}
            />
          </Box>
          <Button className={stylesAdmin.adminButton} size="sm" width={120}>
            Cadastrar
          </Button>
        </Box>
        <Box className={stylesAdmin.adminOtherInformations}>
          <Text color="gray400">{reserves.length} produtos encontrados</Text>
          <Box className={stylesAdmin.adminCleanFilters}>
            <Text color="primary300" weight="bold">
              Limpar filtros
            </Text>
            <Text>Filtros selecionados</Text>
          </Box>
        </Box>
      </Box>
      <Table
        items={reserverFormat}
        columns={columns}
        handleTrash={handleTrash}
        handleEdit={handleEdit}
      />
    </Box>
  );
}
