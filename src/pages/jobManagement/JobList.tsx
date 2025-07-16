// Your imports remain unchanged
import React, { useMemo, useState, useCallback } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery, useMutation, gql } from "@apollo/client";
import { JobListQuery } from "@/Api/Query";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MdDelete, MdRefresh } from "react-icons/md";
import { LuEye, LuSquarePen } from "react-icons/lu";

import SidebarWrapper from "@/layouts/Sidebar";
import { AddJob } from "./AddJob";
import ViewJob from "./ViewJob";
import { CreateJob, UPDATE_JOB_MUTATION, DeleteJobMutation } from "@/Api/Mutation";
import { formatDate } from "@/components/FormatDate";
import { Search } from "lucide-react";


const JobListPage = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [openViewPage, setOpenViewPage] = useState(false);
  const [openEditPage, setOpenEditPage] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editingJobData, setEditingJobData] = useState(null);

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [sorting, setSorting] = useState([]);

  const { loading, error, data, refetch } = useQuery(JobListQuery, {
    variables: {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      search: globalFilter,
    },
    fetchPolicy: "cache-and-network",
  });

  const [deleteJobMutation] = useMutation(DeleteJobMutation, {
    onCompleted: () => {
      refetch();
      setOpenDeleteModel(false);
      setSelectedJob(null);
    },
    onError: (err) => console.error("Delete Error:", err),
  });

  const jobs = data?.jobList?.data || [];
  const totalPages = data?.jobList?.pagination?.totalPages || 1;

  const handleRefresh = useCallback(() => {
    refetch();
    setGlobalFilter("");
    setPagination({ pageIndex: 0, pageSize: 5 });
  }, [refetch]);

  const columns = useMemo(() => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)} className={undefined}        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)} className={undefined}        />
      ),
    },
    {
      accessorKey: "title",
      header: "Job Title",
      cell: ({ row }) => (
        <div className="capitalize text-sm font-medium">{row.getValue("title")}</div>
      ),
    },
    { accessorKey: "department", header: "Department" },
    { accessorKey: "location", header: "Location" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 text-xs rounded font-semibold ${
            row.getValue("status") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {row.getValue("status") ? "Open" : "Closed"}
        </span>
      ),
    },
    { accessorKey: "experience", header: "Experience" },
    {
      accessorKey: "salary",
      header: "Salary",
      cell: ({ row }) => `₹${row.getValue("salary")}`,
    },
    { accessorKey: "vacancy", header: "Vacancy" },
    {
      accessorKey: "posted_date",
      header: "Posted-Date",
      cell: ({ row }) => <div>{formatDate(row?.original?.posted_date)}</div>,
    },
    {
       accessorKey: "closing_date",
       header: "Closing-Date",
      cell: ({ row }) => <div>{formatDate(row?.original?.closing_date)}</div>,
     },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const job = row.original;
        return (
          <div className="flex gap-2">
            <LuSquarePen
              className="text-blue-600 cursor-pointer size-4"
              onClick={() => {
                setEditingJobData(job);
                setOpenEditPage(true);
              }}
            />
            <LuEye
              className="text-blue-600 cursor-pointer size-4"
              onClick={() => {
                setSelectedJob(job);
                setOpenViewPage(true);
              }}
            />
            <MdDelete
              className="text-red-500 cursor-pointer size-4"
              onClick={() => {
                setSelectedJob(job);
                setOpenDeleteModel(true);
              }}
            />
          </div>
        );
      },
    },
  ], []);

  const table = useReactTable({
    data: jobs,
    columns,
    state: {
      sorting,
      pagination,
      globalFilter,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    pageCount: totalPages,
  });

  return (
    <SidebarWrapper>
      {/* View Job Dialog */}
     <Dialog open={openViewPage} onOpenChange={setOpenViewPage}>
        <DialogContent className={undefined} >
          <DialogHeader className={undefined}>
            <DialogTitle className={undefined}>Job Details</DialogTitle>
               <DialogDescription className={undefined}>Details of the selected job.</DialogDescription>
            </DialogHeader>
             {selectedJob && <ViewJob job={selectedJob} />}
        </DialogContent>
      </Dialog>


      {/* Create Job Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={undefined} >
          <DialogHeader className={undefined}>
            <DialogTitle className={undefined}>Create New Job</DialogTitle>
          </DialogHeader>
          <AddJob
            onSubmit={() => {
              setOpen(false);
              refetch();
            } } editingData={undefined}          />
        </DialogContent>
      </Dialog>

      {/* Edit Job Dialog */}
      <Dialog open={openEditPage} onOpenChange={setOpenEditPage}>
        <DialogContent className={undefined}>
          <DialogHeader className={undefined}>
            <DialogTitle className={undefined}>Edit Job</DialogTitle>
          </DialogHeader>
          {editingJobData && (
            <AddJob
              editingData={editingJobData}
              onSubmit={() => {
                setOpenEditPage(false);
                setEditingJobData(null);
                refetch();
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteModel} onOpenChange={setOpenDeleteModel}>
        <DialogContent className={undefined} >
          <DialogHeader className={undefined}>
            <DialogTitle className={undefined}>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this job?</p>
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={() => setOpenDeleteModel(false)} className={undefined} size={undefined}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedJob?.id) {
                  deleteJobMutation({ variables: { id: selectedJob.id } });
                }
              } } className={undefined} size={undefined}            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Search & Add */}
      <div className="flex justify-between items-center py-4">
        <div className="relative w-64">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search className="h-4 w-4" />
          </span>
          <Input
            placeholder="Search jobs..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10" type={undefined}          />
        </div>

        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)} className={undefined} variant={undefined} size={undefined}>Add Job</Button>
          <Button onClick={handleRefresh} variant="outline" className={undefined} size={undefined}>
            <MdRefresh />
          </Button>
        </div>
      </div>

      {/* Job Table */}
      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left font-medium text-gray-600"
                    onClick={header.column.getToggleSortingHandler?.()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === "asc"
                      ? " 🔼"
                      : header.column.getIsSorted() === "desc"
                      ? " 🔽"
                      : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-4">
                <div className="text-muted-foreground text-sm">
                  {table.getFilteredSelectedRowModel().rows.length} of{" "}
                  {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="w-full sm:w-auto flex justify-end">
                  <Pagination className={undefined}>
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
                            } } className={undefined}                    >
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
    </SidebarWrapper>
  );
};

export default JobListPage;


