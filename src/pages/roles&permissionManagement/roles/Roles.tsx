import React, { useEffect, useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { Search, UserCog } from "lucide-react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete, MdRefresh, MdOutlineLockPerson } from "react-icons/md";
import SidebarWrapper from "@/layouts/Sidebar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CreateRoles from "./CreateRoles";
import ViewRoles from "./ViewRoles";
import { LuEye, LuUser } from "react-icons/lu";
import { useLazyQuery } from "@apollo/client";
import { ListRoles } from "@/Api/Query";
import { formatDate } from "@/components/FormatDate";

export default function Roles() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [open, setOpen] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [selectedRole, setselectedRole] = useState(null);
  const [openViewPage, setOpenViewPage] = useState(false);

  const [listRoles, { data, refetch }] = useLazyQuery(ListRoles, {
    fetchPolicy: "network-only",
  });

  const mainData = data?.rolesList?.data ?? [];

  useEffect(() => {
    listRoles();
  }, []);

  const handleView = (role) => {
    setselectedRole(role);
    setOpenViewPage(true);
  };

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all" className={undefined}        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row" className={undefined}        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize text-[14px]">{row.original.name}</div>
      ),
    },
    {
      accessorKey: "userType",
      header: "User Type",
      cell: ({ row }) => (
        <div className="capitalize text-[14px]">{row.original.userType}</div>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => (
        <div className="capitalize text-[14px]">
          {formatDate(row.original.created_at)}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex justify-center items-center gap-2">
            <button type="button">
              <FaEdit
                size={18}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={() => console.log("Edit role:", user)}
              />
            </button>
            <button type="button" onClick={() => handleView(user)}>
              <LuEye
                size={18}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
              />
            </button>
            <button type="button">
              <MdDelete
                onClick={() => {
                  setselectedRole(user);
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

  const handleRefresh = () => {
    refetch();
    setRowSelection({});
    setSorting([]);
    setColumnFilters([]);
  };

  const table = useReactTable({
    data: mainData,
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
      pagination: { pageSize: 5 },
    },
  });

  return (
    <SidebarWrapper>
      {/* Create Role Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl rounded-xl px-4 py-4">
          <div className="flex items-center gap-4 pb-2">
            <UserCog />
            <h2 className="text-lg font-medium">Create Role</h2>
          </div>
          <CreateRoles setOpen={setOpen} />
        </DialogContent>
      </Dialog>

      {/* View Role Dialog */}
      <Dialog open={openViewPage} onOpenChange={setOpenViewPage}>
        <DialogContent className="max-w-5xl rounded-xl px-4 py-4">
          <div className="flex gap-2 items-center">
            <LuUser />
            <h3 className="text-lg font-medium">Role Details</h3>
          </div>
          <ViewRoles roles={selectedRole} setOpenViewPage={setOpenViewPage} />
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteModel} onOpenChange={setOpenDeleteModel}>
        <DialogContent className="max-w-md p-8">
          <div className="flex flex-col gap-4 items-center">
            <MdOutlineLockPerson className="text-2xl" />
            <h3 className="text-lg font-medium text-center">Are you sure you want to delete this Role?</h3>
            <div className="flex gap-3">
              <button
                onClick={() => setOpenDeleteModel(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="w-full">
        <h2 className="text-lg font-semibold">Roles</h2>
        <div className="flex justify-between py-4">
          <div className="relative w-96">
            <Input
              placeholder="Search..."
              value={table.getColumn("name")?.getFilterValue() ?? ""}
              onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
              className="pl-8" type={undefined}            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setOpen(true)}
              className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <FaPlus /> Add Role
            </button>
            <MdRefresh
              onClick={handleRefresh}
              size={24}
              className="cursor-pointer text-gray-800 hover:text-orange-700"
            />
          </div>
        </div>

        <div className="overflow-x-auto border rounded-md">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-2 cursor-pointer"
                      onClick={header.column.getToggleSortingHandler?.()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? ""}
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
                    className={`border-b ${row.getIsSelected() ? "bg-gray-200" : ""}`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-2">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center p-4">No results.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center py-4">
          <div className="text-sm text-gray-600">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected
          </div>
          <Pagination className={undefined}>
            <PaginationContent className="flex-wrap justify-end">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    table.previousPage();
                  }}
                  className={!table.getCanPreviousPage() ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>
              {Array.from({ length: table.getPageCount() }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={table.getState().pagination.pageIndex === i}
                    onClick={(e) => {
                      e.preventDefault();
                      table.setPageIndex(i);
                    } } className={undefined}                  >
                    {i + 1}
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
                  className={!table.getCanNextPage() ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </SidebarWrapper>
  );
}

