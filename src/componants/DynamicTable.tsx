"use client";

import { FormEvent, useEffect, useState } from "react";

import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState,
  ColumnDefBase,
  ColumnDef
} from "@tanstack/react-table";

interface Props {
  columns:ColumnDef<unknown, any>[];
  data: any;
  messageForEmptyTableData?: string;
}

const DynamicTable = ({columns , data}: Props) => {
const table = useReactTable({
    data: data,
    columns : columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
  });
    return (
    <div className="grid">
       <table className="border p-2 rounded-md items-center">
        <thead className="bg-green-200 p-2 rounded-md">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="users-table-cell">
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : "",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="items-center text-center p-2">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 border">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
         
            </tr>
            
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
