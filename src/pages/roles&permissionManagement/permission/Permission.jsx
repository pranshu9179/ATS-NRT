
"use client";

import React, { useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { flexRender } from "@tanstack/react-table";
import { Search } from "lucide-react";
import SidebarWrapper from "@/layouts/Sidebar";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete, MdRefresh, MdOutlineLockPerson } from "react-icons/md";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CreatePermission from "./CreatePermission";

const data = [
  { id: "p1", role: "Admin", module: "users", view: true, create: true, edit: true, delete: true },
  { id: "p2", role: "Admin", module: "jobs", view: true, create: true, edit: true, delete: true },
  { id: "p3", role: "HR", module: "candidates", view: true, create: true, edit: true, delete: false },
  { id: "p4", role: "HR", module: "interviews", view: true, create: true, edit: true, delete: false },
  { id: "p5", role: "Interviewer", module: "candidates", view: true, create: false, edit: false, delete: false },
  { id: "p6", role: "Interviewer", module: "interviews", view: true, create: false, edit: true, delete: false },
  { id: "p7", role: "Candidate", module: "jobs", view: true, create: false, edit: false, delete: false },
  { id: "p8", role: "Candidate", module: "profile", view: true, create: false, edit: true, delete: false },
  { id: "p12", role: "Admin", module: "reports", view: true, create: false, edit: false, delete: false },
];

export default function Permission() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [open, setOpen] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [selectedPermission, setselectedPermission] = useState(null);
  const [permissionList, setPermissionList] = useState(data);

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
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <div className="capitalize text-[14px] hover:underline cursor-pointer hover:text-cyan-500">{row.getValue("role")}</div>,
    },
    {
      accessorKey: "module",
      header: "Module",
      cell: ({ row }) => <div className="capitalize text-[14px] cursor-pointer">{row.getValue("module")}</div>,
    },
    {
      id: "actions",
      header: () => <div className="text-center font-medium">Actions</div>,
      cell: ({ row }) => {
        const permission = row.original;
        return (
          <div className="flex justify-center items-center gap-2">
            <button type="button">
              <FaEdit size={18} className="text-blue-600 hover:text-blue-800 cursor-pointer" />
            </button>
            <button type="button" onClick={() => { setselectedPermission(user); setOpenDeleteModel(true); }}>
              <MdDelete size={20} className="text-red-500 hover:text-red-700 cursor-pointer" />
            </button>
          </div>
        );
      },
    },
  ];

  const handleDelete = (userId) => {
    setPermissionList(prev => prev.filter(p => p.id !== userId));
    setOpenDeleteModel(false);
  };

  const handleRefresh = () => {
    setPermissionList([...data]);
    setRowSelection({});
    setSorting([]);
    setColumnFilters([]);
  };

  const table = useReactTable({
    data: permissionList,
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-5xl rounded-xl px-6 py-4 shadow-2xl space-y-3 ">
          <div className="flex gap-2 items-center">
            <MdOutlineLockPerson className="text-xl" />
            <h3 className="text-lg font-semibold ">Create Permission</h3>
          </div>
          <CreatePermission setOpen={setOpen} />
        </DialogContent>
      </Dialog>

      <Dialog open={openDeleteModel} onOpenChange={setOpenDeleteModel}>
        <DialogContent className="w-full max-w-5xl rounded-xl p-10 shadow-2xl space-y-3 ">
          <div className="flex flex-col  gap-4 items-center">
            <MdOutlineLockPerson className="text-xl" />
            <h3 className="text-lg font-medium ">Are you sure you want to delete this permission?</h3>
            <div className="space-x-2">
              <button
                onClick={() => handleDelete(selectedPermission?.id)}
                className="bg-green-500 text-white px-4 py-[8px] rounded-lg shadow-md hover:bg-green-800 transition duration-300 text-sm font-medium  "
              >
                Delete
              </button>
              <button
                onClick={() => setOpenDeleteModel(false)}
                className="bg-red-500 text-white px-4 py-[8px] rounded-lg shadow-md hover:bg-red-800 transition duration-300 text-sm font-medium "
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="w-full">
        <h2 className="text-lg font-semibold">Permission</h2>
        <div className="flex justify-between items-center py-4">
          <div className="relative ">
            <Input
              placeholder="Search...."
              value={table.getColumn("role")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("role")?.setFilterValue(event.target.value)
              }
              className="pl-8 w-96"
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="flex gap-3 items-center">
            <div>
              <button
                onClick={() => setOpen(true)}
                className="bg-black text-white dark:bg-gray-200 dark:text-black px-4 py-[12px] rounded-lg shadow-md hover:bg-gray-800 transition duration-300 text-sm flex gap-1 items-center"
                title="Add Permission"
              >
                <FaPlus /> Add Permission
              </button>
            </div>
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
                      {{ asc: " 🔼", desc: " 🔽" }[header.column.getIsSorted?.()] ?? ""}
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
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
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
}
