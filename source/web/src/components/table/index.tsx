"use client";
import styles from "./table.module.css";
import Img from "../ui/img";

type ColumnItemType<T> = {
  title: string;
  proporcion: number;
  image?: keyof T;
};

export type ColumnType<T> = Partial<{
  [K in keyof T]: ColumnItemType<T>;
}>;

type Props<T> = {
  items: T[];
  columns: ColumnType<T>;
};

export default function Table<T>(props: Props<T>) {
  const { items, columns } = props;

  const keys = Object.keys(columns || {}) as (keyof T)[];
  const values = Object.values(columns || {}) as ColumnItemType<T>[];

  const gridColumns = values.reduce((acc, value) => {
    return acc + `${value.proporcion}fr `;
  }, "");

  return (
    <table className={styles.tableWrapper}>
      <thead>
        <tr style={{ gridTemplateColumns: gridColumns }}>
          {values.map((column, index) => (
            <th key={index}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index} style={{ gridTemplateColumns: gridColumns }}>
            {keys.map((key, index) => (
              <td key={index}>
                {columns[key]?.image &&
                  typeof item[columns[key].image] === "string" &&
                  typeof item[key] === "string" && (
                    <Img
                      src={item[columns[key].image] as string}
                      alt={item[key] as string}
                      width={40}
                      height={60}
                    />
                  )}
                {typeof item[key] === "string" || typeof item[key] === "number"
                  ? item[key]
                  : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
