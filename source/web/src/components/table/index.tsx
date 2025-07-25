/* eslint-disable @next/next/no-img-element */
"use client";
import { BookType } from "@/@types/book";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useState } from "react";
import ConfirmationTrashModal from "../confirmation-trash-modal";
import { Box } from "../ui/box";
import { Text } from "../ui/text";
import styles from "./table.module.css";

type ColumnItemType<T> = {
  title: string;
  proporcion: number;
  image?: keyof T;
  justify?: "start" | "center" | "end";
  link?: "string";
};

export type ColumnType<T> = Partial<{
  [K in keyof T]: ColumnItemType<T>;
}>;

type Props<T> = {
  items: T[];
  columns: ColumnType<T>;
  handleTrash: (item: T) => void;
  handleEdit: (item: T) => void;
  type?: "book";
};

export default function Table<T>(props: Props<T>) {
  const { items, columns, handleTrash, handleEdit, type } = props;

  const [page, setPage] = useState(1);
  const [isConfirmationTrashModalActive, setIsConfirmationTrashModalActive] = useState(false);

  const keys = Object.keys(columns || {}) as (keyof T)[];
  const values = Object.values(columns || {}) as ColumnItemType<T>[];

  const gridColumns =
    values.reduce((acc, value) => {
      return acc + `${value.proporcion}fr `;
    }, "") + "1fr 1fr";

  const itemsPerPage = 10;
  const totalPages = Math.ceil(Number(items.length / itemsPerPage));

  function handleConfirmationTrash(item: T) {
    setIsConfirmationTrashModalActive(true);
    handleTrash(item);
  }

  return (
    <>
      <table className={styles.tableWrapper}>
        <thead>
          <tr style={{ gridTemplateColumns: gridColumns }}>
            {values.map((column, index) => (
              <th
                key={index}
                style={{
                  justifyContent: column.justify,
                }}
              >
                {column.title}
              </th>
            ))}
            <th>
              <span style={{ opacity: 0 }}>edit</span>
            </th>
            <th>
              <span style={{ opacity: 0 }}>trash</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item, index) => {
            return (
              <tr key={index} style={{ gridTemplateColumns: gridColumns }}>
                {keys.map((key, index) => (
                  <td
                    key={index}
                    style={{
                      justifyContent: columns[key]?.justify,
                    }}
                  >
                    <Link
                      href={type === "book" ? `/livro/${(item as BookType).isbn}` : ""}
                      className={styles.link}
                      style={{
                        gridTemplateColumns: columns[key]?.image ? "auto 1fr" : "1fr",
                      }}
                    >
                      {columns[key]?.image && typeof item[columns[key].image] === "string" && typeof item[key] === "string" && (
                        <img
                          src={("http://localhost:3333/images/" + item[columns[key].image]) as string}
                          onError={e => {
                            (e.target as HTMLImageElement).src = "";
                          }}
                          alt={item[key] as string}
                          width={40}
                          height={60}
                        />
                      )}
                      {typeof item[key] === "string" || typeof item[key] === "number"
                        ? item[key]
                        : Array.isArray(item[key])
                        ? item[key].join(" - ")
                        : null}
                    </Link>
                  </td>
                ))}
                <td>
                  <button className={styles.editButton} onClick={() => handleEdit(item)}>
                    <Pencil size={16} />
                  </button>
                </td>
                <td>
                  <button className={styles.trashButton} onClick={() => handleConfirmationTrash(item)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot className={styles.tableFooter}>
          <tr>
            <td>
              <Text>
                {page} de {totalPages} páginas
              </Text>
              <Box className={styles.tableFooterContent}>
                {page > 1 && (
                  <Box className={styles.paginationNumber} onClick={() => setPage(page - 1)}>
                    <CaretLeft width={20} height={20} />
                  </Box>
                )}
                {page > 1 && (
                  <Text className={`${styles.paginationNumber}`} onClick={() => setPage(page - 1)}>
                    {page - 1}
                  </Text>
                )}
                <Text className={`${styles.paginationNumber} ${styles.pageAtive}`}>{page}</Text>
                <Text
                  className={`
                  ${styles.paginationNumber} 
                  ${page + 1 > totalPages && styles.paginationNumberDisabled}
                `}
                  onClick={() => {
                    if (page + 1 <= totalPages) setPage(page + 1);
                  }}
                >
                  {page + 1}
                </Text>
                {page === 1 && (
                  <Text
                    className={`
                  ${styles.paginationNumber} 
                    ${page + 2 > totalPages && styles.paginationNumberDisabled}
                  `}
                    onClick={() => {
                      if (page + 2 < totalPages) setPage(page + 2);
                    }}
                  >
                    {page + 2}
                  </Text>
                )}
                {page < totalPages && (
                  <Box className={styles.paginationNumber} onClick={() => setPage(page + 1)}>
                    <CaretRight width={20} height={20} />
                  </Box>
                )}
              </Box>
            </td>
          </tr>
        </tfoot>
      </table>

      <ConfirmationTrashModal
        open={isConfirmationTrashModalActive}
        onOpenChange={() => setIsConfirmationTrashModalActive(false)}
      />
    </>
  );
}
