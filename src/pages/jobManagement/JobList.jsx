// import React, { useState } from "react";
// import { AddJob } from "./AddJob";
// import SidebarWrapper from "@/layouts/Sidebar";

// export default function JobList() {
//   const [open, setOpen] = useState(false);

//   return (
//      <>
//      <SidebarWrapper>
//       <div className="p-6">
        
      
//         <button className="btn btn-primary" onClick={() => setOpen(true)}>
//           + Add Job
//         </button>
//         <h1>Job Management</h1>
//         <AddJob open={open} onOpenChange={() => setOpen(false)} />
//     </div>
//      </SidebarWrapper>
    
//      </>
//   );
// }


// JobListPage.jsx



// import React, { useMemo, useState } from "react";
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Checkbox } from "@/components/ui/checkbox";
// import SidebarWrapper from "@/layouts/Sidebar";
// import { AddJob } from "./AddJob";

// const defaultJobs = [
//   {
//     id: 1,
//     jobTitle: "Frontend Developer",
//     department: "Engineering",
//     location: "Remote",
//     status: "Open",
//   },
//   {
//     id: 2,
//     jobTitle: "Backend Developer",
//     department: "Engineering",
//     location: "On-site",
//     status: "Closed",
//   },
// ];

// const JobListPage = () => {
//   const [data, setData] = useState(defaultJobs);
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [openDialog, setOpenDialog] = useState(false);

//   const handleAddJob = (newJob) => {
//     setData((prev) => [...prev, { id: prev.length + 1, ...newJob }]);
//     setOpenDialog(false);
//   };

//   const handleDelete = (id) => {
//     setData((prev) => prev.filter((job) => job.id !== id));
//   };

//   const columns = useMemo(
//     () => [
//       {
//         id: "select",
//         header: ({ table }) => (
//           <Checkbox
//             checked={table.getIsAllRowsSelected()}
//             onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
//           />
//         ),
//         cell: ({ row }) => (
//           <Checkbox
//             checked={row.getIsSelected()}
//             onCheckedChange={(value) => row.toggleSelected(!!value)}
//           />
//         ),
//         enableSorting: false,
//         enableHiding: false,
//       },
//       {
//         accessorKey: "jobTitle",
//         header: "Job Title",
//         cell: (info) => info.getValue(),
//       },
//       {
//         accessorKey: "department",
//         header: "Department",
//         cell: (info) => info.getValue(),
//       },
//       {
//         accessorKey: "location",
//         header: "Location",
//         cell: (info) => info.getValue(),
//       },
//       {
//         accessorKey: "status",
//         header: "Status",
//         cell: (info) => (
//           <span
//             className={`px-2 py-1 text-xs rounded ${
//               info.getValue() === "Open"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-red-100 text-red-700"
//             }`}
//           >
//             {info.getValue()}
//           </span>
//         ),
//       },
//       {
//         id: "actions",
//         header: "Actions",
//         cell: ({ row }) => (
//           <div className="flex gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => console.log("Edit Job", row.original)}
//             >
//               Edit
//             </Button>
//             <Button
//               variant="destructive"
//               size="sm"
//               onClick={() => handleDelete(row.original.id)}
//             >
//               Delete
//             </Button>
//           </div>
//         ),
//         enableSorting: false,
//         enableHiding: false,
//       },
//     ],
//     []
//   );

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       globalFilter,
//     },
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   });

//   return (
//     <SidebarWrapper>
//       <Card className="m-6">
//         <CardContent className="p-4">
//           <div className="flex justify-between items-center mb-4">
//             <Input
//               placeholder="Search jobs..."
//               value={globalFilter}
//               onChange={(e) => setGlobalFilter(e.target.value)}
//               className="w-60"
//             />
//             <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//               <DialogTrigger asChild>
//                 <Button onClick={() => setOpenDialog(true)}>+ Add Job</Button>
//               </DialogTrigger>
//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>Add New Job</DialogTitle>
//                 </DialogHeader>
//                 <AddJob open={openDialog} onOpenChange={setOpenDialog} onSubmit={handleAddJob} />
//               </DialogContent>
//             </Dialog>
//           </div>

//           <div className="overflow-x-auto rounded-md">
//             <table className="min-w-full border text-sm">
//               <thead>
//                 {table.getHeaderGroups().map((headerGroup) => (
//                   <tr key={headerGroup.id} className="bg-muted">
//                     {headerGroup.headers.map((header) => (
//                       <th
//                         key={header.id}
//                         className="p-2 text-left cursor-pointer select-none"
//                         onClick={header.column.getToggleSortingHandler()}
//                       >
//                         {flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                         {{
//                           asc: " 🔼",
//                           desc: " 🔽",
//                         }[header.column.getIsSorted()] ?? ""}
//                       </th>
//                     ))}
//                   </tr>
//                 ))}
//               </thead>
//               <tbody>
//                 {table.getRowModel().rows.map((row) => (
//                   <tr
//                     key={row.id}
//                     className={`border-b hover:bg-accent ${
//                       row.getIsSelected() ? "bg-accent/30" : ""
//                     }`}
//                   >
//                     {row.getVisibleCells().map((cell) => (
//                       <td key={cell.id} className="p-2">
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext()
//                         )}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="flex justify-between items-center mt-4">
//             <div className="text-xs text-muted-foreground">
//               Showing {table.getRowModel().rows.length} of {data.length} entries
//             </div>
//             <div className="space-x-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => table.previousPage()}
//                 disabled={!table.getCanPreviousPage()}
//               >
//                 Prev
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => table.nextPage()}
//                 disabled={!table.getCanNextPage()}
//               >
//                 Next
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </SidebarWrapper>
//   );
// };

// export default JobListPage;


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
import { AddJob } from "./AddJob"; // Make sure this is imported correctly
const defaultJobs = [
  {
    id: 1,
    jobTitle: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    status: "Open",
  },
  {
    id: 2,
    jobTitle: "Backend Developer",
    department: "Engineering",
    location: "On-site",
    status: "Closed",
  },
  {
    id: 3,
    jobTitle: "UI/UX Designer",
    department: "Design",
    location: "Bangalore",
    status: "Open",
  },
  {
    id: 4,
    jobTitle: "Product Manager",
    department: "Product",
    location: "Mumbai",
    status: "Open",
  },
  {
    id: 5,
    jobTitle: "DevOps Engineer",
    department: "Infrastructure",
    location: "Hyderabad",
    status: "Closed",
  },
  {
    id: 6,
    jobTitle: "QA Tester",
    department: "Quality Assurance",
    location: "Pune",
    status: "Open",
  },
  {
    id: 7,
    jobTitle: "HR Specialist",
    department: "Human Resources",
    location: "Delhi",
    status: "Open",
  },
  {
    id: 8,
    jobTitle: "Marketing Executive",
    department: "Marketing",
    location: "Remote",
    status: "Closed",
  },
  {
    id: 9,
    jobTitle: "Business Analyst",
    department: "Business",
    location: "Chennai",
    status: "Open",
  },
  {
    id: 10,
    jobTitle: "Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    status: "Open",
  },
];


const JobListPage = () => {
  const [data, setData] = useState(defaultJobs);
  const [globalFilter, setGlobalFilter] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddJob = (newJob) => {
    setData((prev) => [...prev, { id: prev.length + 1, status: "Open", ...newJob }]);
    setOpenDialog(false);
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((job) => job.id !== id));
  };

  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "jobTitle",
        header: "Job Title",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "department",
        header: "Department",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => (
          <span
            className={`px-2 py-1 text-xs rounded ${
              info.getValue() === "Open"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {info.getValue()}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log("Edit Job", row.original)}
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
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <SidebarWrapper>
      <Card className="m-6">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <Input
              placeholder="Search jobs..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-60"
            />
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button onClick={() => setOpenDialog(true)}>+ Add Job</Button>
              </DialogTrigger>
              <AddJob open={openDialog} onOpenChange={setOpenDialog} onSubmit={handleAddJob} />
            </Dialog>
          </div>

          <div className="overflow-x-auto rounded-md">
            <table className="min-w-full border text-sm">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-muted">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="p-2 text-left cursor-pointer select-none"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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

          <div className="flex justify-between items-center mt-4">
            <div className="text-xs text-muted-foreground">
              Showing {table.getRowModel().rows.length} of {data.length} entries
            </div>
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

export default JobListPage;
