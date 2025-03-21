import React from "react";
import "./Table.css";

interface TableProps<T> {
  columns: { header: string; accessor: keyof T }[];
  data: T[];
  noDataMessage?: string;
}

export function Table<T>({
  columns,
  data,
  noDataMessage = "No data available",
}: TableProps<T>) {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {row[column.accessor] as unknown as React.ReactNode}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>{noDataMessage}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
