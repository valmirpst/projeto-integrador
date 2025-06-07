/* eslint-disable @next/next/no-img-element */
"use client";
import styles from "./table.module.css";
import { CaretLeft, CaretRight } from "phosphor-react";
import { Text } from "../ui/text";
import { Box } from "../ui/box";
import { useState } from "react";
import { BookType } from "@/@types/book";

type ColumnItemType<T> = {
  title: string;
  proporcion: number;
  image?: keyof T;
  justify?: "start" | "center" | "end";
};

export type ColumnType<T> = Partial<{
  [K in keyof T]: ColumnItemType<T>;
}>;

type Props<T> = {
  items: T[];
  columns: ColumnType<T>;
  handleTrash: (item: T) => void;
};

export default function Table<T>(props: Props<T>) {
  const { items, columns, handleTrash } = props;

  const [page, setPage] = useState(1);

  const keys = Object.keys(columns || {}) as (keyof T)[];
  const values = Object.values(columns || {}) as ColumnItemType<T>[];

  const gridColumns =
    values.reduce((acc, value) => {
      return acc + `${value.proporcion}fr `;
    }, "") + "1fr 1fr";

  const itemsPerPage = 10;
  const totalPages = Number((items.length / itemsPerPage).toFixed(0));

  return (
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
          <th>edit</th>
          <th>trash</th>
        </tr>
      </thead>
      <tbody>
        {items
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((item, index) => (
            <tr key={index} style={{ gridTemplateColumns: gridColumns }}>
              {keys.map((key, index) => (
                <td
                  key={index}
                  style={{
                    justifyContent: columns[key]?.justify,
                  }}
                >
                  {columns[key]?.image &&
                    typeof item[columns[key].image] === "string" &&
                    typeof item[key] === "string" && (
                      <img
                        src={item[columns[key].image] as string}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "";
                        }}
                        alt={item[key] as string}
                        width={40}
                        height={60}
                      />
                    )}
                  {typeof item[key] === "string" ||
                  typeof item[key] === "number"
                    ? item[key]
                    : Array.isArray(item[key])
                    ? item[key].join(" - ")
                    : null}
                </td>
              ))}
              <td>
                <button>edit</button>
              </td>
              <td>
                <button onClick={() => handleTrash(item)}>trash</button>
              </td>
            </tr>
          ))}
      </tbody>
      <tfoot className={styles.tableFooter}>
        <tr>
          <td>
            <Text>
              {page} de {totalPages} páginas
            </Text>
            <Box className={styles.tableFooterContent}>
              {page > 1 && (
                <Box
                  className={styles.paginationNumber}
                  onClick={() => setPage(page - 1)}
                >
                  <CaretLeft width={20} height={20} />
                </Box>
              )}
              {page > 1 && (
                <Text
                  className={`${styles.paginationNumber}`}
                  onClick={() => setPage(page - 1)}
                >
                  {page - 1}
                </Text>
              )}
              <Text
                className={`${styles.paginationNumber} ${styles.pageAtive}`}
              >
                {page}
              </Text>
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
                <Box
                  className={styles.paginationNumber}
                  onClick={() => setPage(page + 1)}
                >
                  <CaretRight width={20} height={20} />
                </Box>
              )}
            </Box>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
