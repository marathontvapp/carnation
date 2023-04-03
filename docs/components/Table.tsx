import React, { PropsWithChildren, createContext, useContext } from "react";

interface Column {
  title: string;
  width: number;
}

interface TableContextProps {
  columns: Column[];
}

const TableContext = createContext<TableContextProps>({ columns: [] });

export interface RootProps extends PropsWithChildren {
  columns: Column[];
}

export function Root({ children, columns }: RootProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div className="mt-6 relative overflow-x-auto">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="border-b dark:border-neutral-800">
              {columns.map((column) => (
                <th
                  key={column.title}
                  className="py-3 pr-3 text-xs opacity-60 font-normal"
                  scope="col"
                  style={{ width: `${column.width * 100}%` }}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y dark:divide-neutral-800">{children}</tbody>
        </table>
      </div>
    </TableContext.Provider>
  );
}

export interface RowProps {
  data: Record<string, any>;
}

export function Row({ data }: RowProps) {
  const { columns } = useContext(TableContext);
  return (
    <tr>
      {columns.map((column) => (
        <td key={column.title} className="py-3 pr-3" scope="row">
          {data[column.title]}
        </td>
      ))}
    </tr>
  );
}
