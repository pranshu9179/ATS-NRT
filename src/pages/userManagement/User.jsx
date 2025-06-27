"use client";
import React, { useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { LucideDelete, LucideView, Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FaUserPlus, FaEdit } from "react-icons/fa";
import { MdDelete, MdRefresh } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { LuDelete, LuEye, LuSquarePen, LuUser, LuView } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SidebarWrapper from "@/layouts/Sidebar";
import AddUser from "./AddUser";
import ViewUser from "./ViewUser";
// import { IconName } from "react-icons/lu";

const data = [
  {
    id: "5kma53ae",
    name: "Silas Rhodes",
    email: "silas22@example.com",
    role: "DevOps Engineer",
    experience: 4,
    location: "Berlin, Germany",
    appliedDate: "2025-06-08",
    status: "success",
  },
  {
    id: "f8kd90wl",
    name: "Isla Rivera",
    email: "isla.rivera@example.com",
    role: "Full Stack Developer",
    experience: 4,
    location: "Delhi, India",
    appliedDate: "2025-06-06",
    status: "success",
  },
  {
    id: "x7nq29dj",
    name: "Leah Matthews",
    email: "leah.matthews@example.com",
    role: "Backend Developer",
    experience: 6,
    location: "London, UK",
    appliedDate: "2025-06-10",
    status: "success",
  },
  {
    id: "q1lz77jk",
    name: "Damon Frye",
    email: "damon.frye@example.com",
    role: "UI Designer",
    experience: 2,
    location: "Austin, USA",
    appliedDate: "2025-06-11",
    status: "failed",
  },
  {
    id: "e0wz35mn",
    name: "Rhea Singh",
    email: "rhea.singh@example.com",
    role: "Product Designer",
    experience: 5,
    location: "Mumbai, India",
    appliedDate: "2025-06-08",
    status: "success",
  },
];

const User = () => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [open, setOpen] = useState(false);
  const [openViewPage, setOpenViewPage] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userslist, setUserList] = useState(data);

  const handleView = (user) => {
    setSelectedUser(user);
    setOpenViewPage(true);
  };

  const handleDelete = (userId) => {
    console.log(userId);
    setOpenDeleteModel(false);
  };

  const handleRefresh = () => {
    setUserList([...data]);
    setRowSelection({});
    setSorting([]);
    setColumnFilters([]);
  };

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div
          onClick={() => handleView(row.original)}
          className="capitalize text-[14px] hover:underline cursor-pointer hover:text-cyan-500"
        >
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className={"font-bold"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize  text-[14px]">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div className="capitalize text-[14px]">{row.getValue("role")}</div>
      ),
    },
    {
      accessorKey: "experience",
      header: "Experience",
      cell: ({ row }) => (
        <div className="capitalize text-[14px]">
          {row.getValue("experience")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize text-[14px]">{row.getValue("status")}</div>
      ),
    },
    {
      id: "actions",
      header: () => (
        <div className="text-center font-bold capitalize text-[14px]">
          Actions
        </div>
      ),
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex justify-center items-center gap-2">
            <button type="button">
              <LuSquarePen
                size={18}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
              />
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedUser(user);
                setOpenViewPage(true);
              }}
            >
              <LuEye
                size={18}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
              />
            </button>
            <button type="button">
              <MdDelete
                onClick={() => {
                  setSelectedUser(user);
                  setOpenDeleteModel(true);
                }}
                size={20}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              />
            </button>
          </div>
        );
      },
    },
  ];
  const table = useReactTable({
    data: userslist,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <SidebarWrapper>
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent className="w-full max-w-5xl rounded-xl px-4 sm:px-6 py-4 shadow-2xl space-y-3">
          <div className="flex gap-2 items-center">
            <FiUserPlus className="text-[12px]" />
            <h2 className="text-xl font-semibold">Create User</h2>
          </div>
          <div className="overflow-y-auto max-h-[70vh] pr-2">
          <AddUser setOpen={setOpen} />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openViewPage} onOpenChange={setOpenViewPage}>
        <DialogContent className="w-full max-w-5xl rounded-xl px-4 sm:px-6 py-4 shadow-2xl space-y-3">
          <div className="flex gap-2 items-center">
            <LuUser className="text-xl" />
            <h3 className="text-lg font-medium">User Detail</h3>
          </div>
          <ViewUser user={selectedUser} setOpenViewPage={setOpenViewPage} />
        </DialogContent>
      </Dialog>

      <Dialog open={openDeleteModel} onOpenChange={setOpenDeleteModel}>
        <DialogContent className="w-full max-w-5xl rounded-xl p-6 sm:p-10 shadow-2xl space-y-3">
          <div className="flex flex-col gap-4 items-center">
            <LuUser className="text-xl" />
            <h3 className="text-lg font-medium">
              Are you sure you want to delete this user?
            </h3>
            <div className="space-x-2">
              <button
                onClick={() => handleDelete(selectedUser?.id)}
                className="bg-green-500 text-white px-4 py-[8px] rounded-lg shadow-md hover:bg-green-800 transition duration-300 text-sm font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => setOpenDeleteModel(false)}
                className="bg-red-500 text-white px-4 py-[8px] rounded-lg shadow-md hover:bg-red-800 transition duration-300 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="w-full">
        <h2 className="text-lg font-semibold">User Management</h2>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 py-4">
          <div className="relative w-full sm:w-auto">
            <Input
              placeholder="Filter emails..."
              value={table.getColumn("email")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("email")?.setFilterValue(event.target.value)
              }
              className="pl-8 w-full sm:w-96"
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setOpen(true)}
              className="bg-black text-white dark:bg-gray-200 dark:text-black px-4  py-[12px] rounded-lg shadow-md hover:bg-gray-800 transition duration-300 text-sm flex gap-1 items-center"
              title="Add User"
            >
              <FaUserPlus />
             Add User
            </button>
            <div className="border border-black/10 rounded-xl p-2 bg-gray-100 hover:text-gray-500">
              <MdRefresh
                onClick={handleRefresh}
                size={20}
                className="cursor-pointer text-gray-900 hover:text-orange-700"
              />
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto rounded-md border max-w-full">
          <table className="min-w-full border text-sm">
            <thead className="bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-2 text-left cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler?.()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted?.()] ?? ""}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-b hover:bg-accent ${
                      row.getIsSelected() ? "bg-accent/30" : ""
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={table.getAllColumns().length}
                    className="h-24 text-center"
                  >
                    No results.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-4">
          <div className="text-muted-foreground text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="w-full sm:w-auto flex justify-end">
            <Pagination>
              <PaginationContent className="flex-wrap sm:justify-end">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      table.previousPage();
                    }}
                    className={
                      table.getCanPreviousPage()
                        ? ""
                        : "pointer-events-none opacity-50"
                    }
                  />
                </PaginationItem>
                {Array.from({ length: table.getPageCount() }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      isActive={table.getState().pagination.pageIndex === index}
                      onClick={(e) => {
                        e.preventDefault();
                        table.setPageIndex(index);
                      }}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      table.nextPage();
                    }}
                    className={
                      table.getCanNextPage()
                        ? ""
                        : "pointer-events-none opacity-50"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default User;
