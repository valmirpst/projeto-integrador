"use client";
import { Box } from "@/components/ui/box";
import styles from "./reserve.module.css";
import stylesAdmin from "../admin.module.css";
import { reserves } from "@/mock/reserve";
import Table, { ColumnType } from "@/components/table";
import { Text } from "@/components/ui/text";
import Search from "@/components/search";
import { useState } from "react";
import Select from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ReserveType } from "@/@types/reserve";

export default function HomeClient() {
  const [searchValue, setSearchValue] = useState("");

  const columns: ColumnType<ReserveType> = {
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearchValue(event.target.value);
            }}
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
          <Text color="gray400">16 produtos encontrados</Text>
          <Box className={stylesAdmin.adminCleanFilters}>
            <Text color="primary300" weight="bold">
              Limpar filtros
            </Text>
            <Text>Filtros selecionados</Text>
          </Box>
        </Box>
      </Box>
      <Table items={reserves} columns={columns}></Table>
    </Box>
  );
}
