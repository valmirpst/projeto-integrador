"use client";
import styles from "./table.module.css";

type ColumnItemType = {
  title: string;
  proporcion: number;
};

export type ColumnType<T> = Partial<{
  [K in keyof T]: ColumnItemType;
}>;

type Props<T> = {
  items: T[];
  columns?: ColumnType<T>;
};

export default function Table<T>(props: Props<T>) {
  const { items, columns } = props;

  const keys = Object.keys(columns || {}) as (keyof T)[];
  const values = Object.values(columns || {}) as ColumnItemType[];

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
