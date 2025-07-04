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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { Search } from "lucide-react";
import SidebarWrapper from "@/layouts/Sidebar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdRefresh } from "react-icons/md";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { FaPlus } from "react-icons/fa";
import CreatePermission from "./CreatePermission";
import { MdOutlineLockPerson } from "react-icons/md";

const data = [
  {
    id: "p1",
    role: "Admin",
    module: "users",
    view: true,
    create: true,
    edit: true,
    delete: true,
  },
  {
    id: "p2",
    role: "Admin",
    module: "jobs",
    view: true,
    create: true,
    edit: true,
    delete: true,
  },
  {
    id: "p3",
    role: "HR",
    module: "candidates",
    view: true,
    create: true,
    edit: true,
    delete: false,
  },
  {
    id: "p4",
    role: "HR",
    module: "interviews",
    view: true,
    create: true,
    edit: true,
    delete: false,
  },
  {
    id: "p5",
    role: "Interviewer",
    module: "candidates",
    view: true,
    create: false,
    edit: false,
    delete: false,
  },
  {
    id: "p6",
    role: "Interviewer",
    module: "interviews",
    view: true,
    create: false,
    edit: true,
    delete: false,
  },
  {
    id: "p7",
    role: "Candidate",
    module: "jobs",
    view: true,
    create: false,
    edit: false,
    delete: false,
  },
  {
    id: "p8",
    role: "Candidate",
    module: "profile",
    view: true,
    create: false,
    edit: true,
    delete: false,
  },

  {
    id: "p12",
    role: "Admin",
    module: "reports",
    view: true,
    create: false,
    edit: false,
    delete: false,
  },
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

  console.log("selectedPermission", selectedPermission);

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
      cell: ({ row }) => (
        <div className="capitalize text-[14px]">{row.getValue("role")}</div>
      ),
    },
    {
      accessorKey: "module",
      header: "Module",
      cell: ({ row }) => (
        <div className="capitalize text-[14px] cursor-pointer">
          {row.getValue("module")}
        </div>
      ),
    },

    {
      id: "actions",
      header: () => <div className="text-center font-medium">Actions</div>,
      cell: ({ row }) => {
        const permission = row.original;
        return (
          <div className="flex justify-center items-center gap-2">
            <button type="button">
              <FaEdit
                onClick={() => {
                  setselectedPermission(permission);
                  setOpen(true);
                }}
                size={18}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
              />
            </button>
            <button type="button">
              <MdDelete
                onClick={() => {
                  setselectedPermission(permission);
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

  const handleDelete = (Id) => {
    setPermissionList((prev) =>
      prev.filter((permission) => permission.id !== Id)
    );
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
      {/* Add Permission form dilaogue model */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-5xl rounded-xl px-6 py-4 shadow-2xl space-y-3 ">
          {selectedPermission ? (
            <div className="flex gap-2 items-center">
              <MdOutlineLockPerson className="text-xl" />
              <h3 className="text-lg font-semibold ">Edit Permission</h3>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <MdOutlineLockPerson className="text-xl" />
              <h3 className="text-lg font-semibold ">Create Permission</h3>
            </div>
          )}

          <CreatePermission
            setOpen={setOpen}
            selectedPermission={selectedPermission}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Model */}
      <Dialog open={openDeleteModel} onOpenChange={setOpenDeleteModel}>
        <DialogContent className="w-full max-w-5xl rounded-xl p-10 shadow-2xl space-y-3 ">
          <div className="flex flex-col  gap-4 items-center">
            <MdOutlineLockPerson className="text-xl" />
            <h3 className="text-lg font-medium ">
              Are you sure you want to delete this permission?
            </h3>
            <div className="space-x-2">
              <button
                onClick={() => handleDelete(selectedPermission?.id)}
                className="bg-green-500 text-white px-4 py-[8px]
                rounded-lg shadow-md hover:bg-green-800 transition
                duration-300 text-sm font-medium  "
              >
                Delete
              </button>
              <button
                onClick={() => setOpenDeleteModel(false)}
                className="bg-red-500 text-white px-4 py-[8px]
                rounded-lg shadow-md hover:bg-red-800 transition
                duration-300 text-sm font-medium "
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
            <Search
              className="absolute left-2 top-1/2 -translate-y-1/2
           w-4 h-4 text-gray-400 pointer-events-none"
            />
          </div>

          <div className="flex gap-3 items-center">
            <div>
              <button
                onClick={() => setOpen(true)}
                className="bg-black text-white px-4 py-[8px]
                rounded-lg shadow-md hover:bg-gray-800 transition
                duration-300 text-sm flex gap-1 items-center"
              >
                <FaPlus />
                Create
              </button>
            </div>
            <div className=" border border-black/10 p-2">
              <MdRefresh
                onClick={handleRefresh}
                size={20}
                className="cursor-pointer text-gray-600 hover:text-orange-600"
              />
            </div>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          {/* Pagination */}
          <div>
            <Pagination>
              <PaginationContent>
                {/* Prev */}
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

                {/* Page 1 */}
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={table.getState().pagination.pageIndex === 0}
                    onClick={(e) => {
                      e.preventDefault();
                      table.setPageIndex(0);
                    }}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>

                {/* Page 2 */}
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={table.getState().pagination.pageIndex === 1}
                    onClick={(e) => {
                      e.preventDefault();
                      table.setPageIndex(1);
                    }}
                  >
                    2
                  </PaginationLink>
                </PaginationItem>

                {/* Page 3 */}
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={table.getState().pagination.pageIndex === 2}
                    onClick={(e) => {
                      e.preventDefault();
                      table.setPageIndex(2);
                    }}
                  >
                    3
                  </PaginationLink>
                </PaginationItem>

                {/* Ellipsis */}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>

                {/* Next */}
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
