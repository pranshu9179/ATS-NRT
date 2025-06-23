"use client";

import React, { useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

import { MdOutlineLockPerson } from "react-icons/md";
import CreateRoles from "./CreateRoles";
import { UserCog} from "lucide-react";

const data = [
  {
    name: "Ram verma",
    userType: "HR",
    createdAt: "2024-06-01T10:15:00Z",
  },
  {
    name: "Rahul yadav",
    userType: "Interviewer",
    createdAt: "2024-06-02T14:20:00Z",
  },
  {
    name: "Tanvi Verma ",
    userType: "Candidate",
    createdAt: "2024-06-03T08:10:00Z",
  },
  {
    name: "Anjali Sharma",
    userType: "Recruiter",
    createdAt: "2024-06-04T09:00:00Z",
  },
  {
    name: "Suresh verma",
    userType: "Hiring Manager",
    createdAt: "2024-06-05T17:45:00Z",
  },
  {
    name: "Priya sharma",
    userType: "Vendor",
    createdAt: "2024-06-06T12:30:00Z",
  },
  {
    name: "Karan  verma",
    userType: "Admin",
    createdAt: "2024-06-07T16:00:00Z",
  },
];

export default function Roles() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [open, setOpen] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [selectedRole, setselectedRole] = useState(null);
  const [RoleList, setRoleList] = useState(data);

  console.log("selectedRole", selectedRole);

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
        <div className="capitalize text-[14px]">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "userType",
      header: "UserType",
      cell: ({ row }) => (
        <div className="capitalize text-[14px] cursor-pointer">
          {row.getValue("userType")}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return (
          <div className="text-sm text-gray-700">
            {date.toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        );
      },
    },

    {
      id: "actions",
      header: () => <div className="text-center font-medium">Actions</div>,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex justify-center items-center gap-2">
            <button type="button">
              <FaEdit
                size={18}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
              />
            </button>
            <button type="button">
              <MdDelete
                onClick={() => setOpenDeleteModel(true)}
                size={20}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              />
            </button>
          </div>
        );
      },
    },
  ];

  const handleDelete = (userId) => {
    console.log(userId);
    setOpenDeleteModel(false);
  };

  const handleRefresh = () => {
    setRoleList([...data]);
    setRowSelection({});
    setSorting([]);
    setColumnFilters([]);
  };

  const table = useReactTable({
    data,
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
      {/* Add role form dilaogue model */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-5xl max-h-[90vh] rounded-xl px-6 py-4 shadow-2xl space-y-3">
          {/* Fixed Header */}
          <div className="flex items-center gap-2 sticky top-0  z-10 pb-2">
            <UserCog className="text-[12px]" />
            <h2 className="text-lg font-medium">Create Role</h2>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[70vh] pr-2">
            <CreateRoles setOpen={setOpen} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Model */}
      <Dialog open={openDeleteModel} onOpenChange={setOpenDeleteModel}>
        <DialogContent className="w-full max-w-5xl rounded-xl p-10 shadow-2xl space-y-3 ">
          <div className="flex flex-col  gap-4 items-center">
            <MdOutlineLockPerson className="text-xl" />
            <h3 className="text-lg font-medium ">
              Are you sure you want to delete this Roles?
            </h3>
            <div className="space-x-2">
              <button
                onClick={() => handleDelete(selectedRole?.id)}
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
        <h2 className="text-lg font-semibold">Roles</h2>
        <div className="flex justify-between items-center py-4">
          <div className="relative ">
            <Input
              placeholder="Search...."
              value={table.getColumn("name")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
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
                Add Role
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
