import React, { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import SidebarWrapper from "@/layouts/Sidebar";

const defaultData = [
  { id: 1, role: "Super Admin", module: "Users", access: "Full Access" },
  { id: 2, role: "HR", module: "Jobs", access: "Read Only" },
  { id: 3, role: "Interviewer", module: "Interviews", access: "Edit" },
  { id: 4, role: "Candidate", module: "Dashboard", access: "Read Only" },
  { id: 5, role: "HR", module: "Permissions", access: "No Access" },
];

const Permission = () => {
  const [data, setData] = useState(defaultData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
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
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "module",
        header: "Module",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "access",
        header: "Access Level",
        cell: (info) => {
          const value = info.getValue();
          const colorMap = {
            "Full Access": "bg-green-100 text-green-700",
            "Read Only": "bg-yellow-100 text-yellow-700",
            Edit: "bg-blue-100 text-blue-700",
            "No Access": "bg-red-100 text-red-700",
          };
          return (
            <span
              className={`px-2 py-1 text-xs rounded font-medium ${
                colorMap[value] || ""
              }`}
            >
              {value}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpenDialog(true)}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(row.original.id)}
            >
              Delete
            </Button>
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <SidebarWrapper>
      <Card className="m-6 shadow-sm rounded-2xl">
        <CardContent className="p-4 space-y-4">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <Input
              placeholder="Search permissions..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full md:w-64"
            />

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button onClick={() => setOpenDialog(true)}>
                  + Create Permission
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create/Edit Permission</DialogTitle>
                </DialogHeader>
                <div className="py-4 text-sm text-muted-foreground">
                  Form UI goes here...
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full text-sm">
              <thead className="bg-muted">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className="p-2 text-left font-medium cursor-pointer select-none"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted()] ?? ""}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
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
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-xs text-muted-foreground">
              Showing {table.getRowModel().rows.length} of {data.length} entries
            </p>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </SidebarWrapper>
  );
};

export default Permission;
