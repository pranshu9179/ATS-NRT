

















// import React, { useMemo, useState, useEffect, useCallback } from "react";
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { useQuery, gql } from "@apollo/client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// import { Search } from "lucide-react";
// import SidebarWrapper from "@/layouts/Sidebar";
// import { CreateJob } from "./AddJob";
// import { FiUserPlus } from "react-icons/fi";
// import { LuEye, LuSquarePen, LuUser } from "react-icons/lu";
// import { FaUserPlus } from "react-icons/fa";
// import { MdDelete, MdRefresh } from "react-icons/md";
// import { formatDate } from "@/components/FormatDate";

// export const JobListQuery = gql`
//   query JobList(
//     $page: Int
//     $limit: Int
//     $search: String
//     $department: String
//     $location: String
//     $status: Boolean
//     $sortBy: String
//   ) {
//     jobList(
//       page: $page
//       limit: $limit
//       search: $search
//       department: $department
//       location: $location
//       status: $status
//       sortBy: $sortBy
//     ) {
//       data {
//         id
//         title
//         description
//         department
//         location
//         experience
//         salary
//         vacancy
//         status
//         posted_date
//         closing_date
//         created_at
//         created_by {
//           id
//           firstName
//           lastName
//           email
//         }
//       }
//       filters {
//         search
//         department
//         location
//         status
//         sortBy
//       }
//       pagination {
//         currentPage
//         limit
//         totalCount
//         totalPages
//         hasNextPage
//         hasPreviousPage
//         nextPage
//         previousPage
//       }
//     }
//   }
// `;

// const JobListPage = () => {
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [open, setOpen] = useState(false);
//   const [openViewPage, setOpenViewPage] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [pagination, setPagination] = useState({
//     pageIndex: 0,
//     pageSize: 5,
//   });

//   const { loading, error, data, refetch } = useQuery(JobListQuery, {
//     variables: {
//       page: pagination.pageIndex + 1,
//       limit: pagination.pageSize,
//       search: globalFilter,
//     },
//     fetchPolicy: "cache-and-network",
//   });

//   const jobs = data?.jobList?.data || [];
//   const totalPages = data?.jobList?.pagination?.totalPages || 1;

//   const handleAddJob = useCallback(async (newJob) => {
//     await refetch();
//     setOpen(false);
//   }, [refetch]);

//   const columns = useMemo(() => [
//     {
//       accessorKey: "title",
//       header: "Job Title",
//       cell: ({ row }) => <div>{row.getValue("title")}</div>,
//     },
//     {
//       accessorKey: "department",
//       header: "Department",
//       cell: ({ row }) => <div>{row.getValue("department")}</div>,
//     },
//     {
//       accessorKey: "location",
//       header: "Location",
//       cell: ({ row }) => <div>{row.getValue("location")}</div>,
//     },
//     {
//       accessorKey: "status",
//       header: "Status",
//       cell: ({ row }) => <div>{row.getValue("status") ? "Open" : "Closed"}</div>,
//     },
//     {
//       id: "actions",
//       header: "Actions",
//       cell: ({ row }) => {
//         const job = row.original;
//         return (
//           <div className="flex gap-2">
//             <LuSquarePen onClick={() => console.log("Edit", job)} />
//             <LuEye onClick={() => { setSelectedJob(job); setOpenViewPage(true); }} />
//             <MdDelete onClick={() => console.log("Delete", job.id)} />
//           </div>
//         );
//       },
//     },
//   ], []);

//   const table = useReactTable({
//     data: jobs,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     state: { pagination },
//     onPaginationChange: setPagination,
//     manualPagination: true,
//     pageCount: totalPages,
//   });

//   return (
//     <SidebarWrapper>
//       <div className="flex justify-between items-center mb-4">
//         <Input
//           placeholder="Search jobs..."
//           value={globalFilter}
//           onChange={(e) => setGlobalFilter(e.target.value)}
//           className="w-64" type={undefined}        />
//         <Button onClick={() => setOpen(true)} className={undefined} variant={undefined} size={undefined}>
//           <FaUserPlus className="mr-2" /> Add Job
//         </Button>
//       </div>

//       <table className="w-full text-left border border-gray-200">
//         <thead className="bg-gray-50">
//           {table.getHeaderGroups().map(headerGroup => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map(header => (
//                 <th key={header.id} className="px-4 py-2">
//                   {flexRender(header.column.columnDef.header, header.getContext())}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map(row => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map(cell => (
//                 <td key={cell.id} className="px-4 py-2 border-t">
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <Pagination className="mt-4">
//         <PaginationContent className={undefined}>
//           <PaginationItem>
//             <PaginationPrevious onClick={() => table.previousPage()} className={undefined} />
//           </PaginationItem>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <PaginationItem key={i}>
//               <PaginationLink
//                 isActive={pagination.pageIndex === i}
//                 onClick={() => table.setPageIndex(i)} className={undefined}              >
//                 {i + 1}
//               </PaginationLink>
//             </PaginationItem>
//           ))}
//           <PaginationItem>
//             <PaginationNext onClick={() => table.nextPage()} className={undefined} />
//           </PaginationItem>
//         </PaginationContent>
//       </Pagination>

//       {/* Add Job Dialog */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className={undefined} >
//           <CreateJob open={open} onOpenChange={setOpen} onSubmit={handleAddJob} editingData={undefined} />
//         </DialogContent>
//       </Dialog>

//       {/* View Job Dialog */}
//       <Dialog open={openViewPage} onOpenChange={setOpenViewPage}>
//         <DialogContent className={undefined} >
//           {selectedJob && (
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Job Details</h3>
//               <p><strong>Title:</strong> {selectedJob.title}</p>
//               <p><strong>Description:</strong> {selectedJob.description}</p>
//               <p><strong>Department:</strong> {selectedJob.department}</p>
//               <p><strong>Location:</strong> {selectedJob.location}</p>
//               <p><strong>Status:</strong> {selectedJob.status ? "Open" : "Closed"}</p>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </SidebarWrapper>
//   );
// };

// export default JobListPage;
























import React, { useMemo, useState, useEffect, useCallback } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery, useMutation, gql } from "@apollo/client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Search } from "lucide-react";
import SidebarWrapper from "@/layouts/Sidebar";
import { CreateJob } from "./AddJob";
import { FiUserPlus } from "react-icons/fi";
import { LuEye, LuSquarePen, LuUser } from "react-icons/lu";
import { FaUserPlus } from "react-icons/fa";
import { MdDelete, MdRefresh } from "react-icons/md";
import { formatDate } from "@/components/FormatDate";
import { JobListQuery } from "@/Api/Query";
import { UPDATE_JOB_MUTATION } from "@/Api/Mutation";
import { DeleteJobMutation } from "@/Api/Mutation";

// export const JobListQuery = gql`
//   query JobList(
//     $page: Int
//     $limit: Int
//     $search: String
//     $department: String
//     $location: String
//     $status: Boolean
//     $sortBy: String
//   ) {
//     jobList(
//       page: $page
//       limit: $limit
//       search: $search
//       department: $department
//       location: $location
//       status: $status
//       sortBy: $sortBy
//     ) {
//       data {
//         id
//         title
//         description
//         department
//         location
//         experience
//         salary
//         vacancy
//         status
//         posted_date
//         closing_date
//         created_at
//         created_by {
//           id
//           firstName
//           lastName
//           email
//         }
//       }
//       filters {
//         search
//         department
//         location
//         status
//         sortBy
//       }
//       pagination {
//         currentPage
//         limit
//         totalCount
//         totalPages
//         hasNextPage
//         hasPreviousPage
//         nextPage
//         previousPage
//       }
//     }
//   }
// `;

// export const UPDATE_JOB_MUTATION = gql`
//   mutation UpdateJob(
//     $id: ID!
//     $data: UpdateJobInput! # Changed: Now taking a single 'data' object
//   ) {
//     updateJob(
//       id: $id
//       data: $data # Changed: Passing data via the 'data' object
//     ) {
//       id
//       title
//       description
//       department
//       location
//       experience
//       salary
//       vacancy
//       status
//       posted_date
//       closing_date
//       created_at
//       created_by {
//         id
//         firstName
//         lastName
//         email
//       }
//     }
//   }
// `;

// export const DeleteJobMutation = gql`
//   mutation DeleteJob($id: ID!) {
//     deleteJob(id: $id)
//   }
// `;

// Define a type for the job form data
interface JobFormData {
  id?: string;
  title?: string;
  description?: string;
  department?: string;
  location?: string;
  experience?: string;
  salary?: number | string;
  vacancy?: number | string;
  status?: boolean;
  posted_date?: string;
  closing_date?: string;
  created_at?: string;
  created_by?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

const EditJob = ({ open, onOpenChange, onSubmit, editingData }) => {
  const [formData, setFormData] = useState<JobFormData>({});

  useEffect(() => {
    if (editingData) {
      const formattedClosingDate = editingData.closing_date
        ? new Date(editingData.closing_date).toISOString().split('T')[0]
        : "";

      setFormData({
        id: editingData.id,
        title: editingData.title || "",
        description: editingData.description || "",
        department: editingData.department || "",
        location: editingData.location || "",
        experience: editingData.experience || "",
        salary: editingData.salary || 0,
        vacancy: editingData.vacancy || 0,
        status: editingData.status || false,
        closing_date: formattedClosingDate,
      });
    }
  }, [editingData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      salary: parseInt(formData.salary?.toString() || '0', 10),
      vacancy: parseInt(formData.vacancy?.toString() || '0', 10),
    };
    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
          <Input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
          <Input
            id="department"
            name="department"
            type="text"
            value={formData.department}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <Input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</label>
          <Input
            id="experience"
            name="experience"
            type="text"
            value={formData.experience}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary</label>
          <Input
            id="salary"
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="vacancy" className="block text-sm font-medium text-gray-700">Vacancy</label>
          <Input
            id="vacancy"
            name="vacancy"
            type="number"
            value={formData.vacancy}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="closing_date" className="block text-sm font-medium text-gray-700">Closing Date</label>
          <Input
            id="closing_date"
            name="closing_date"
            type="date"
            value={formData.closing_date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="status"
            name="status"
            checked={formData.status}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, status: checked }))}
            className="rounded"
          />
          <label htmlFor="status" className="text-sm font-medium text-gray-700">Status (Open/Closed)</label>
        </div>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm resize-y"
          required
        ></textarea>
      </div>
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => onOpenChange(false)}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50" size={undefined}        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700" variant={undefined} size={undefined}        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};


const JobListPage = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [openViewPage, setOpenViewPage] = useState(false);
  const [openEditPage, setOpenEditPage] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editingJobData, setEditingJobData] = useState(null);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);

  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const { loading, error, data, refetch } = useQuery(JobListQuery, {
    variables: {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      search: globalFilter,
    },
    fetchPolicy: "cache-and-network",
  });

  const [updateJobMutation] = useMutation(UPDATE_JOB_MUTATION, {
    onCompleted: (data) => {
      console.log("Job updated successfully:", data.updateJob);
      refetch();
      setOpenEditPage(false);
      setEditingJobData(null);
    },
    onError: (err) => {
      console.error("Error updating job:", err);
    },
  });

  const [deleteJobMutation] = useMutation(DeleteJobMutation, {
    onCompleted: (data) => {
      console.log("Job deleted successfully:", data.deleteJob);
      refetch();
      setOpenDeleteModel(false); 
      setSelectedJob(null); 
    },
    onError: (err) => {
      console.error("Error deleting job:", err);
    },
  });

  const jobs = data?.jobList?.data || [];
  const totalCount = data?.jobList?.pagination?.totalCount || 0;
  const totalPages = data?.jobList?.pagination?.totalPages || 1;

  console.log("job list ", jobs);

  const handleAddJob = useCallback(async (newJob) => {
    console.log("Simulating add job:", newJob);
    await refetch();
    setOpen(false);
  }, [refetch]);

  const handleEditJob = useCallback(async (updatedJobData) => {
    try {
      await updateJobMutation({
        variables: {
          id: updatedJobData.id,
          // Changed: Wrap all fields into an 'input' object
          data: {
            title: updatedJobData.title,
            description: updatedJobData.description,
            department: updatedJobData.department,
            location: updatedJobData.location,
            experience: updatedJobData.experience,
            salary: updatedJobData.salary,
            vacancy: updatedJobData.vacancy,
            status: updatedJobData.status,
            closing_date: updatedJobData.closing_date,
          }
        },
      });
    } catch (err) {
    }
  }, [updateJobMutation]);


  const handleDelete = useCallback(async (id) => {
    try {
     await deleteJobMutation({
        variables: { id: id }
      });
    } catch (err) {
    }
  }, [deleteJobMutation]);

  const handleRefresh = useCallback(() => {
    refetch();
    setRowSelection({});
    setSorting([]);
    setColumnFilters([]);
    setGlobalFilter("");
    setPagination({ pageIndex: 0, pageSize: 5 });
  }, [refetch]);

  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)} className={undefined}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)} className={undefined}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "title",
        header: "Job Title",
        cell: ({ row }) => (
          <div className="capitalize text-sm font-medium">
            {row.getValue("title")}
          </div>
        ),
      },
      {
        accessorKey: "department",
        header: "Department",
        cell: ({ row }) => (
          <div className="capitalize text-sm">{row.getValue("department")}</div>
        ),
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => (
          <div className="capitalize text-sm">{row.getValue("location")}</div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <span
            className={`px-2 py-1 text-xs rounded font-semibold ${
              row.getValue("status")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {row.getValue("status") ? "Open" : "Closed"}
          </span>
        ),
      },
      {
        accessorKey: "experience",
        header: "Experience",
        cell: ({ row }) => (
          <div className="text-sm">{row.getValue("experience")}</div>
        ),
      },
      {
        accessorKey: "salary",
        header: "Salary",
        cell: ({ row }) => (
          <div className="text-sm">{row.getValue("salary")}</div>
        ),
      },
      {
        accessorKey: "vacancy",
        header: "Vacancy",
        cell: ({ row }) => (
          <div className="text-sm">{row.getValue("vacancy")}</div>
        ),
      },
      {
        accessorKey: "posted_date",
        header: "Posted Date",
        cell: ({ row }) => (
          <div className="text-sm">
              {formatDate(row?.original?.posted_date ?? 'N/A')}
          </div>
        ),
      },
      {
        accessorKey: "closing_date",
        header: "Closing Date",
        cell: ({ row }) => (
          <div className="text-sm">
               {row?.original?.closing_date ?? 'N/A'}
          </div>
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
          const job = row.original;
          return (
            <div className="flex justify-center items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditingJobData(job);
                  setOpenEditPage(true);
                }}
                title="Edit Job"
              >
                <LuSquarePen
                  size={18}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer"
                />
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedJob(job);
                  setOpenViewPage(true);
                }}
                title="View Job"
              >
                <LuEye
                  size={18}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer"
                />
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedJob(job);
                  setOpenDeleteModel(true);
                }}
                title="Delete Job"
              >
                <MdDelete
                  size={20}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                />
              </button>
            </div>
          );
        },
        enableSorting: false,
        enableHiding: false,
      },
    ],
    []
  );

  const table = useReactTable({
    data: jobs,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
      globalFilter,
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,

    pageCount: totalPages,
  });

  if (loading) {
    return (
      <SidebarWrapper>
        <div className="flex justify-center items-center h-64 text-lg text-gray-600">
          Loading jobs...
        </div>
      </SidebarWrapper>
    );
  }

  if (error) {
    return (
      <SidebarWrapper>
        <div className="flex justify-center items-center h-64 text-lg text-red-600">
          Error loading jobs: {error.message}
        </div>
      </SidebarWrapper>
    );
  }

  return (
    <SidebarWrapper>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-5xl rounded-xl px-4 sm:px-6 py-4 shadow-2xl space-y-3">
          <div className="flex gap-2 items-center">
            <FiUserPlus className="text-[12px]" />
            <h2 className="text-xl font-semibold">Create Job</h2>
          </div>
          <div className="overflow-y-auto max-h-[70vh] pr-2">
            <CreateJob
              open={open}
              onOpenChange={setOpen}
              onSubmit={handleAddJob}
              editingData={undefined}
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openEditPage} onOpenChange={setOpenEditPage}>
        <DialogContent className="w-full max-w-5xl rounded-xl px-4 sm:px-6 py-4 shadow-2xl space-y-3">
          <div className="flex gap-2 items-center">
            <LuSquarePen className="text-[12px]" />
            <h2 className="text-xl font-semibold">Edit Job</h2>
          </div>
          <div className="overflow-y-auto max-h-[70vh] pr-2">
            {editingJobData && (
              <EditJob
                open={openEditPage}
                onOpenChange={setOpenEditPage}
                onSubmit={handleEditJob}
                editingData={editingJobData}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>


      <Dialog open={openViewPage} onOpenChange={setOpenViewPage}>
        <DialogContent className="w-full max-w-5xl rounded-xl px-4 sm:px-6 py-4 shadow-2xl space-y-3">
          <div className="flex gap-2 items-center">
            <LuUser className="text-xl" />
            <h3 className="text-lg font-medium">Job Detail</h3>
          </div>
          {selectedJob && (
            <div className="p-4 bg-gray-50 rounded-md space-y-2 text-sm">
              <p>
                <strong>Title:</strong> {selectedJob.title}
              </p>
              <p>
                <strong>Description:</strong> {selectedJob.description}
              </p>
              <p>
                <strong>Department:</strong> {selectedJob.department}
              </p>
              <p>
                <strong>Location:</strong> {selectedJob.location}
              </p>
              <p>
                <strong>Experience:</strong> {selectedJob.experience}
              </p>
              <p>
                <strong>Salary:</strong> {selectedJob.salary}
              </p>
              <p>
                <strong>Vacancy:</strong> {selectedJob.vacancy}
              </p>
              <p>
                <strong>Status:</strong> {selectedJob.status ? "Open" : "Closed"}
              </p>
              <p>
                <strong>Posted Date:</strong>{" "}
                  {formatDate(selectedJob.posted_date)}
              </p>
              <p>
                <strong>Closing Date:</strong>{" "}
                {selectedJob.closing_date
                  ? new Date(selectedJob.closing_date).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {selectedJob.created_at
                  ? new Date(parseInt(selectedJob.created_at)).toLocaleDateString()
                  : "N/A"}
              </p>
              {selectedJob.created_by && (
                <p>
                  <strong>Created By:</strong> {selectedJob.created_by.firstName}{" "}
                  {selectedJob.created_by.lastName} (
                  {selectedJob.created_by.email})
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openDeleteModel} onOpenChange={setOpenDeleteModel}>
        <DialogContent className="w-full max-w-5xl rounded-xl p-6 sm:p-10 shadow-2xl space-y-3">
          <div className="flex flex-col gap-4 items-center">
            <MdDelete size={30} className="text-red-500" />
            <h3 className="text-lg font-medium text-center">
              Are you sure you want to delete the job "
              <span className="font-semibold text-red-700">
                {selectedJob?.title}
              </span>
              "?
            </h3>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => {
                  handleDelete(selectedJob?.id);
                }}
                className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300 text-base font-medium"
              >
                Confirm Delete
              </button>
              <button
                onClick={() => setOpenDeleteModel(false)}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-300 text-base font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4">Job Management</h2>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 py-4">
          <div className="relative w-full sm:w-auto">
            <Input
              placeholder="Search jobs..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-8 w-full sm:w-96 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              type="text"
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setOpen(true)}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 text-sm font-medium flex gap-2 items-center"
              title="Add New Job"
            >
              <FaUserPlus size={16} />
              Add Job
            </button>
            <button
              onClick={handleRefresh}
              className="border border-gray-300 rounded-lg p-2 bg-gray-100 hover:bg-gray-200 transition duration-300 text-gray-800 flex items-center justify-center shadow-sm"
              title="Refresh Data"
            >
              <MdRefresh size={20} className="text-gray-700" />
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm max-w-full">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler?.()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted?.() as string] ?? ""}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-gray-50 ${
                      row.getIsSelected() ? "bg-blue-50" : ""
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
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
                    className="h-24 text-center text-gray-500"
                  >
                    No jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-4">
          <div className="text-sm text-gray-600">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="w-full sm:w-auto flex justify-end">
            <Pagination className="flex justify-end">
              <PaginationContent className="flex-wrap justify-center sm:justify-end gap-1">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      table.previousPage();
                    }}
                    className={
                      table.getCanPreviousPage()
                        ? "text-blue-600 hover:bg-blue-50"
                        : "pointer-events-none opacity-50 text-gray-400"
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
                      className={
                        table.getState().pagination.pageIndex === index
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }
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
                        ? "text-blue-600 hover:bg-blue-50"
                        : "pointer-events-none opacity-50 text-gray-400"
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

export default JobListPage;










