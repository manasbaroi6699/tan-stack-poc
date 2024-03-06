"use client";

import { FormEvent, useEffect, useState } from "react";

import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState
} from "@tanstack/react-table";
import DynamicTable from "@/componants/DynamicTable";

export type User = {
  id: number;
  name: string;
  age: number;
  address : string;
};

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("id", {
    header: () => "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: () => "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("age", {
    header: () => "Age",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("address", {
    header: () => "Full Address",
    cell: (info) => info.getValue(),
  }),
];

const UsersTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const [inputSearchValue, setInputSearchValue] = useState("");

  const submitSearchForm = (e: FormEvent) => {
    e.preventDefault();
    setSearchValue(inputSearchValue);
  };

  

    useEffect(() => {
    const url = `https://65899ba0324d417152593c87.mockapi.io/api/pp?name=${searchValue}`;
    fetch(url)
      .then((res) => res.json())
      .then((users) => {
        setUsers(users);
      });
  }, [searchValue]);

  return (
    <div>
      <DynamicTable
      columns={columns}
      data={users}
      />
     
    </div>
  );
};

export default UsersTable;