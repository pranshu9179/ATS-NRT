// // import React, { useMemo, useState } from "react";
// // import {
// //   flexRender,
// //   getCoreRowModel,
// //   getFilteredRowModel,
// //   getPaginationRowModel,
// //   getSortedRowModel,
// //   useReactTable,
// // } from "@tanstack/react-table";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent } from "@/components/ui/card";
// // import {
// //   Dialog,
// //   DialogTrigger,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/components/ui/dialog";
// // import { Checkbox } from "@/components/ui/checkbox";
// // import SidebarWrapper from "@/layouts/Sidebar";
// // import { AddJob } from "./AddJob";

// // const defaultJobs = [
// //   {
// //     id: 1,
// //     jobTitle: "Frontend Developer",
// //     department: "Engineering",
// //     location: "Remote",
// //     status: "Open",
// //   },
// //   {
// //     id: 2,
// //     jobTitle: "Backend Developer",
// //     department: "Engineering",
// //     location: "On-site",
// //     status: "Closed",
// //   },
// // ];

// // const JobListPage = () => {
// //   const [data, setData] = useState(defaultJobs);
// //   const [globalFilter, setGlobalFilter] = useState("");
// //   const [openDialog, setOpenDialog] = useState(false);

// //   const handleAddJob = (newJob) => {
// //     setData((prev) => [...prev, { id: prev.length + 1, ...newJob }]);
// //     setOpenDialog(false);
// //   };

// //   const handleDelete = (id) => {
// //     setData((prev) => prev.filter((job) => job.id !== id));
// //   };

// //   const columns = useMemo(
// //     () => [
// //       {
// //         id: "select",
// //         header: ({ table }) => (
// //           <Checkbox
// //             checked={table.getIsAllRowsSelected()}
// //             onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
// //           />
// //         ),
// //         cell: ({ row }) => (
// //           <Checkbox
// //             checked={row.getIsSelected()}
// //             onCheckedChange={(value) => row.toggleSelected(!!value)}
// //           />
// //         ),
// //         enableSorting: false,
// //         enableHiding: false,
// //       },
// //       {
// //         accessorKey: "jobTitle",
// //         header: "Job Title",
// //         cell: (info) => info.getValue(),
// //       },
// //       {
// //         accessorKey: "department",
// //         header: "Department",
// //         cell: (info) => info.getValue(),
// //       },
// //       {
// //         accessorKey: "location",
// //         header: "Location",
// //         cell: (info) => info.getValue(),
// //       },
// //       {
// //         accessorKey: "status",
// //         header: "Status",
// //         cell: (info) => (
// //           <span
// //             className={`px-2 py-1 text-xs rounded ${
// //               info.getValue() === "Open"
// //                 ? "bg-green-100 text-green-700"
// //                 : "bg-red-100 text-red-700"
// //             }`}
// //           >
// //             {info.getValue()}
// //           </span>
// //         ),
// //       },
// //       {
// //         id: "actions",
// //         header: "Actions",
// //         cell: ({ row }) => (
// //           <div className="flex gap-2">
// //             <Button
// //               variant="outline"
// //               size="sm"
// //               onClick={() => console.log("Edit Job", row.original)}
// //             >
// //               Edit
// //             </Button>
// //             <Button
// //               variant="destructive"
// //               size="sm"
// //               onClick={() => handleDelete(row.original.id)}
// //             >
// //               Delete
// //             </Button>
// //           </div>
// //         ),
// //         enableSorting: false,
// //         enableHiding: false,
// //       },
// //     ],
// //     []
// //   );

// //   const table = useReactTable({
// //     data,
// //     columns,
// //     state: {
// //       globalFilter,
// //     },
// //     onGlobalFilterChange: setGlobalFilter,
// //     getCoreRowModel: getCoreRowModel(),
// //     getFilteredRowModel: getFilteredRowModel(),
// //     getSortedRowModel: getSortedRowModel(),
// //     getPaginationRowModel: getPaginationRowModel(),
// //   });

// //   return (
// //     <SidebarWrapper>
// //       <Card className="m-6">
// //         <CardContent className="p-4">
// //           <div className="flex justify-between items-center mb-4">
// //             <Input
// //               placeholder="Search jobs..."
// //               value={globalFilter}
// //               onChange={(e) => setGlobalFilter(e.target.value)}
// //               className="w-60"
// //             />
// //             <Dialog open={openDialog} onOpenChange={setOpenDialog}>
// //               <DialogTrigger asChild>
// //                 <Button onClick={() => setOpenDialog(true)}>+ Add Job</Button>
// //               </DialogTrigger>
// //               <DialogContent>
// //                 <DialogHeader>
// //                   <DialogTitle>Add New Job</DialogTitle>
// //                 </DialogHeader>
// //                 <AddJob open={openDialog} onOpenChange={setOpenDialog} onSubmit={handleAddJob} />
// //               </DialogContent>
// //             </Dialog>
// //           </div>

// //           <div className="overflow-x-auto rounded-md">
// //             <table className="min-w-full border text-sm">
// //               <thead>
// //                 {table.getHeaderGroups().map((headerGroup) => (
// //                   <tr key={headerGroup.id} className="bg-muted">
// //                     {headerGroup.headers.map((header) => (
// //                       <th
// //                         key={header.id}
// //                         className="p-2 text-left cursor-pointer select-none"
// //                         onClick={header.column.getToggleSortingHandler()}
// //                       >
// //                         {flexRender(
// //                           header.column.columnDef.header,
// //                           header.getContext()
// //                         )}
// //                         {{
// //                           asc: " 🔼",
// //                           desc: " 🔽",
// //                         }[header.column.getIsSorted()] ?? ""}
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 ))}
// //               </thead>
// //               <tbody>
// //                 {table.getRowModel().rows.map((row) => (
// //                   <tr
// //                     key={row.id}
// //                     className={`border-b hover:bg-accent ${
// //                       row.getIsSelected() ? "bg-accent/30" : ""
// //                     }`}
// //                   >
// //                     {row.getVisibleCells().map((cell) => (
// //                       <td key={cell.id} className="p-2">
// //                         {flexRender(
// //                           cell.column.columnDef.cell,
// //                           cell.getContext()
// //                         )}
// //                       </td>
// //                     ))}
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>

// //           <div className="flex justify-between items-center mt-4">
// //             <div className="text-xs text-muted-foreground">
// //               Showing {table.getRowModel().rows.length} of {data.length} entries
// //             </div>
// //             <div className="space-x-2">
// //               <Button
// //                 variant="outline"
// //                 size="sm"
// //                 onClick={() => table.previousPage()}
// //                 disabled={!table.getCanPreviousPage()}
// //               >
// //                 Prev
// //               </Button>
// //               <Button
// //                 variant="outline"
// //                 size="sm"
// //                 onClick={() => table.nextPage()}
// //                 disabled={!table.getCanNextPage()}
// //               >
// //                 Next
// //               </Button>
// //             </div>
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </SidebarWrapper>
// //   );
// // };

// // export default JobListPage;

// "use client";
// import React, { useMemo, useState } from "react";
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { Search, PlusCircle } from "lucide-react";

// import SidebarWrapper from "@/layouts/Sidebar";
// import { AddJob } from "./AddJob";
// import { FiUserPlus } from "react-icons/fi";
// import { LuEye, LuSquarePen, LuUser } from "react-icons/lu";
// import ViewJob from "./ViewJob";
// import { FaUserPlus } from "react-icons/fa";
// import { MdDelete, MdRefresh } from "react-icons/md";

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
//   const [open, setOpen] = useState(false);
//   const [openViewPage, setOpenViewPage] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [openDeleteModel, setOpenDeleteModel] = useState(false);

//   const handleRefresh = () => {
//     setUserList([...data]);
//     setRowSelection({});
//     setSorting([]);
//     setColumnFilters([]);
//   };

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
//         cell: ({ row }) => (
//           <div className="capitalize text-sm font-medium">
//             {row.getValue("jobTitle")}
//           </div>
//         ),
//       },
//       {
//         accessorKey: "department",
//         header: "Department",
//         cell: ({ row }) => (
//           <div className="capitalize text-sm">{row.getValue("department")}</div>
//         ),
//       },
//       {
//         accessorKey: "location",
//         header: "Location",
//         cell: ({ row }) => (
//           <div className="capitalize text-sm">{row.getValue("location")}</div>
//         ),
//       },
//       {
//         accessorKey: "status",
//         header: "Status",
//         cell: ({ row }) => (
//           <span
//             className={`px-2 py-1 text-xs rounded font-semibold ${
//               row.getValue("status") === "Open"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-red-100 text-red-700"
//             }`}
//           >
//             {row.getValue("status")}
//           </span>
//         ),
//       },
//      {
//   id: "actions",
//   header: () => (
//     <div className="text-center font-bold capitalize text-[14px]">Actions</div>
//   ),
//   cell: ({ row }) => {
//     const job = row.original;
//     return (
//       <div className="flex justify-center items-center gap-2">
//         <button
//           type="button"
//           onClick={() => console.log("Edit", job)}
//           title="Edit Job"
//         >
//           <LuSquarePen
//             size={18}
//             className="text-blue-600 hover:text-blue-800 cursor-pointer"
//           />
//         </button>

//         <button
//           type="button"
//           onClick={() => console.log("View", job)}
//           title="View Job"
//         >
//           <LuEye
//             size={18}
//             className="text-blue-600 hover:text-blue-800 cursor-pointer"
//           />
//         </button>

//         <button
//           type="button"
//           onClick={() => handleDelete(job.id)}
//           title="Delete Job"
//         >
//           <MdDelete
//             size={20}
//             className="text-red-500 hover:text-red-700 cursor-pointer"
//           />
//         </button>
//       </div>
//     );
//   },
//   enableSorting: false,
//   enableHiding: false,
// }
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
//     initialState: {
//       pagination: {
//         pageSize: 5,
//       },
//     },
//   });

//   return (
//     <SidebarWrapper>
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="w-full max-w-5xl rounded-xl px-4 sm:px-6 py-4 shadow-2xl space-y-3">
//           <div className="flex gap-2 items-center">
//             <FiUserPlus className="text-[12px]" />
//             <h2 className="text-xl font-semibold">Create User</h2>
//           </div>
//           <div className="overflow-y-auto max-h-[70vh] pr-2">
//             <AddJob setOpen={setOpen} />
//           </div>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={openViewPage} onOpenChange={setOpenViewPage}>
//         <DialogContent className="w-full max-w-5xl rounded-xl px-4 sm:px-6 py-4 shadow-2xl space-y-3">
//           <div className="flex gap-2 items-center">
//             <LuUser className="text-xl" />
//             <h3 className="text-lg font-medium">User Detail</h3>
//           </div>
//           <ViewJob user={selectedUser} setOpenViewPage={setOpenViewPage} />
//         </DialogContent>
//       </Dialog>

//       <Dialog open={openDeleteModel} onOpenChange={setOpenDeleteModel}>
//         <DialogContent className="w-full max-w-5xl rounded-xl p-6 sm:p-10 shadow-2xl space-y-3">
//           <div className="flex flex-col gap-4 items-center">
//             <LuUser className="text-xl" />
//             <h3 className="text-lg font-medium">
//               Are you sure you want to delete this user?
//             </h3>
//             <div className="space-x-2">
//               <button
//                 onClick={() => handleDelete(selectedUser?.id)}
//                 className="bg-green-500 text-white px-4 py-[8px] rounded-lg shadow-md hover:bg-green-800 transition duration-300 text-sm font-medium"
//               >
//                 Delete
//               </button>
//               <button
//                 onClick={() => setOpenDeleteModel(false)}
//                 className="bg-red-500 text-white px-4 py-[8px] rounded-lg shadow-md hover:bg-red-800 transition duration-300 text-sm font-medium"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       <div className="w-full">
//         <h2 className="text-lg font-semibold">Job Management</h2>
//         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 py-4">
//           <div className="relative w-full sm:w-auto">
//             <Input
//               placeholder="Filter emails..."
//               value={table.getColumn("email")?.getFilterValue() ?? ""}
//               onChange={(event) =>
//                 table.getColumn("email")?.setFilterValue(event.target.value)
//               }
//               className="pl-8 w-full sm:w-96"
//             />
//             <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//           </div>
//           <div className="flex gap-3 items-center">
//             <button
//               onClick={() => setOpen(true)}
//               className="bg-black text-white px-4  py-[12px] rounded-lg shadow-md hover:bg-gray-800 transition duration-300 text-sm flex gap-1 items-center"
//               title="Add User"
//             >
//               <FaUserPlus />
//               Add Job
//             </button>
//             <div className="border border-black/10 rounded-xl p-2 bg-gray-100 hover:text-gray-500">
//               <MdRefresh
//                 onClick={handleRefresh}
//                 size={20}
//                 className="cursor-pointer text-gray-900 hover:text-orange-700"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="w-full overflow-x-auto rounded-md border max-w-full">
//           <table className="min-w-full border text-sm">
//             <thead className="bg-muted">
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <tr key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => (
//                     <th
//                       key={header.id}
//                       className="p-2 text-left cursor-pointer select-none"
//                       onClick={header.column.getToggleSortingHandler?.()}
//                     >
//                       {flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                       {{
//                         asc: " 🔼",
//                         desc: " 🔽",
//                       }[header.column.getIsSorted?.()] ?? ""}
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody>
//               {table.getRowModel().rows.length ? (
//                 table.getRowModel().rows.map((row) => (
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
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={table.getAllColumns().length}
//                     className="h-24 text-center"
//                   >
//                     No results.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-4">
//           <div className="text-muted-foreground text-sm">
//             {table.getFilteredSelectedRowModel().rows.length} of{" "}
//             {table.getFilteredRowModel().rows.length} row(s) selected.
//           </div>
//           <div className="w-full sm:w-auto flex justify-end">
//             <Pagination>
//               <PaginationContent className="flex-wrap sm:justify-end">
//                 <PaginationItem>
//                   <PaginationPrevious
//                     href="#"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       table.previousPage();
//                     }}
//                     className={
//                       table.getCanPreviousPage()
//                         ? ""
//                         : "pointer-events-none opacity-50"
//                     }
//                   />
//                 </PaginationItem>
//                 {Array.from({ length: table.getPageCount() }, (_, index) => (
//                   <PaginationItem key={index}>
//                     <PaginationLink
//                       href="#"
//                       isActive={table.getState().pagination.pageIndex === index}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         table.setPageIndex(index);
//                       }}
//                     >
//                       {index + 1}
//                     </PaginationLink>
//                   </PaginationItem>
//                 ))}
//                 <PaginationItem>
//                   <PaginationNext
//                     href="#"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       table.nextPage();
//                     }}
//                     className={
//                       table.getCanNextPage()
//                         ? ""
//                         : "pointer-events-none opacity-50"
//                     }
//                   />
//                 </PaginationItem>
//               </PaginationContent>
//             </Pagination>
//           </div>
//         </div>
//       </div>
//     </SidebarWrapper>
//   );
// };

// export default JobListPage;

// "use client";
// import React, { useMemo, useState } from "react";
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

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
// import { AddJob } from "./AddJob";
// import { FiUserPlus } from "react-icons/fi";
// import { LuEye, LuSquarePen, LuUser } from "react-icons/lu";
// import ViewJob from "./ViewJob";
// import { FaUserPlus } from "react-icons/fa";
// import { MdDelete, MdRefresh } from "react-icons/md";

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
//   const [open, setOpen] = useState(false);
//   const [openViewPage, setOpenViewPage] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [openDeleteModel, setOpenDeleteModel] = useState(false);
//   const [jobsList, setJobList] = useState(data);
//   const [columnFilters, setColumnFilters] = useState([]);
//   const [sorting, setSorting] = useState([]);
//   const [rowSelection, setRowSelection] = useState({});
//   const [columnVisibility, setColumnVisibility] = useState({});

//   const handleAddJob = (newJob) => {
//     setData((prev) => [...prev, { id: prev.length + 1, ...newJob }]);
//     setOpen(false);
//   };

//   const handleDelete = (id) => {
//     setData((prev) => prev.filter((job) => job.id !== id));
//   };

//   const handleRefresh = () => {
//     setJobList([...defaultJobs]);
//     setRowSelection({});
//     setSorting([]);
//     setColumnFilters([]);
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
//         cell: ({ row }) => (
//           <div className="capitalize text-sm font-medium">
//             {row.getValue("jobTitle")}
//           </div>
//         ),
//       },
//       {
//         accessorKey: "department",
//         header: "Department",
//         cell: ({ row }) => (
//           <div className="capitalize text-sm">{row.getValue("department")}</div>
//         ),
//       },
//       {
//         accessorKey: "location",
//         header: "Location",
//         cell: ({ row }) => (
//           <div className="capitalize text-sm">{row.getValue("location")}</div>
//         ),
//       },
//       {
//         accessorKey: "status",
//         header: "Status",
//         cell: ({ row }) => (
//           <span
//             className={`px-2 py-1 text-xs rounded font-semibold ${
//               row.getValue("status") === "Open"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-red-100 text-red-700"
//             }`}
//           >
//             {row.getValue("status")}
//           </span>
//         ),
//       },
//       {
//         id: "actions",
//         header: () => (
//           <div className="text-center font-bold capitalize text-[14px]">
//             Actions
//           </div>
//         ),
//         cell: ({ row }) => {
//           const job = row.original;
//           return (
//             <div className="flex justify-center items-center gap-2">
//               <button
//                 type="button"
//                 onClick={() => console.log("Edit", job)}
//                 title="Edit Job"
//               >
//                 <LuSquarePen
//                   size={18}
//                   className="text-blue-600 hover:text-blue-800 cursor-pointer"
//                 />
//               </button>

//               <button
//                 type="button"
//                 onClick={() => {
//                   setSelectedUser(job);
//                   setOpenViewPage(true);
//                 }}
//                 title="View Job"
//               >
//                 <LuEye
//                   size={18}
//                   className="text-blue-600 hover:text-blue-800 cursor-pointer"
//                 />
//               </button>

//               <button
//                 type="button"
//                 onClick={() => {
//                   setSelectedUser(job);
//                   setOpenDeleteModel(true);
//                 }}
//                 title="Delete Job"
//               >
//                 <MdDelete
//                   size={20}
//                   className="text-red-500 hover:text-red-700 cursor-pointer"
//                 />
//               </button>
//             </div>
//           );
//         },
//         enableSorting: false,
//         enableHiding: false,
//       },
//     ],
//     []
//   );

//   const table = useReactTable({
//     data: jobsList,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//     initialState: {
//       pagination: {
//         pageSize: 5,
//       },
//     },
//   });

//   return (
//     <SidebarWrapper>
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="w-full max-w-5xl rounded-xl px-4 sm:px-6 py-4 shadow-2xl space-y-3">
//           <div className="flex gap-2 items-center">
//             <FiUserPlus className="text-[12px]" />
//             <h2 className="text-xl font-semibold">Create Job</h2>
//           </div>
//           <div className="overflow-y-auto max-h-[70vh] pr-2">
//             <AddJob
//               open={open}
//               onOpenChange={setOpen}
//               onSubmit={handleAddJob}
//             />
//           </div>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={openViewPage} onOpenChange={setOpenViewPage}>
//         <DialogContent className="w-full max-w-5xl rounded-xl px-4 sm:px-6 py-4 shadow-2xl space-y-3">
//           <div className="flex gap-2 items-center">
//             <LuUser className="text-xl" />
//             <h3 className="text-lg font-medium">Job Detail</h3>
//           </div>
//           <ViewJob user={selectedUser} setOpenViewPage={setOpenViewPage} />
//         </DialogContent>
//       </Dialog>

//       <Dialog open={openDeleteModel} onOpenChange={setOpenDeleteModel}>
//         <DialogContent className="w-full max-w-5xl rounded-xl p-6 sm:p-10 shadow-2xl space-y-3">
//           <div className="flex flex-col gap-4 items-center">
//             <LuUser className="text-xl" />
//             <h3 className="text-lg font-medium">
//               Are you sure you want to delete this job?
//             </h3>
//             <div className="space-x-2">
//               <button
//                 onClick={() => {
//                   handleDelete(selectedUser?.id);
//                   setOpenDeleteModel(false);
//                 }}
//                 className="bg-green-500 text-white px-4 py-[8px] rounded-lg shadow-md hover:bg-green-800 transition duration-300 text-sm font-medium"
//               >
//                 Delete
//               </button>
//               <button
//                 onClick={() => setOpenDeleteModel(false)}
//                 className="bg-red-500 text-white px-4 py-[8px] rounded-lg shadow-md hover:bg-red-800 transition duration-300 text-sm font-medium"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       <div className="w-full">
//         <h2 className="text-lg font-semibold">Job Management</h2>
//         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 py-4">
//           <div className="relative w-full sm:w-auto">
//             <Input
//               placeholder="Search jobs..."
//               value={globalFilter}
//               onChange={(e) => setGlobalFilter(e.target.value)}
//               className="pl-8 w-full sm:w-96"
//             />
//             <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//           </div>
//           <div className="flex gap-3 items-center">
//             <button
//               onClick={() => setOpen(true)}
//               className="bg-black text-white px-4  py-[12px] rounded-lg shadow-md hover:bg-gray-800 transition duration-300 text-sm flex gap-1 items-center"
//               title="Add Job"
//             >
//               <FaUserPlus />
//               Add Job
//             </button>
//             <div className="border border-black/10 rounded-xl p-2 bg-gray-100 hover:text-gray-500">
//               <MdRefresh
//                 onClick={handleRefresh}
//                 size={20}
//                 className="cursor-pointer text-gray-900 hover:text-orange-700"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="w-full overflow-x-auto rounded-md border max-w-full">
//           <table className="min-w-full border text-sm">
//             <thead className="bg-muted">
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <tr key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => (
//                     <th
//                       key={header.id}
//                       className="p-2 text-left cursor-pointer select-none"
//                       onClick={header.column.getToggleSortingHandler?.()}
//                     >
//                       {flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                       {{
//                         asc: " 🔼",
//                         desc: " 🔽",
//                       }[header.column.getIsSorted?.()] ?? ""}
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody>
//               {table.getRowModel().rows.length ? (
//                 table.getRowModel().rows.map((row) => (
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
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={table.getAllColumns().length}
//                     className="h-24 text-center"
//                   >
//                     No results.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-4">
//           <div className="text-muted-foreground text-sm">
//             {table.getFilteredSelectedRowModel().rows.length} of{" "}
//             {table.getFilteredRowModel().rows.length} row(s) selected.
//           </div>
//           <div className="w-full sm:w-auto flex justify-end">
//             <Pagination>
//               <PaginationContent className="flex-wrap sm:justify-end">
//                 <PaginationItem>
//                   <PaginationPrevious
//                     href="#"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       table.previousPage();
//                     }}
//                     className={
//                       table.getCanPreviousPage()
//                         ? ""
//                         : "pointer-events-none opacity-50"
//                     }
//                   />
//                 </PaginationItem>
//                 {Array.from({ length: table.getPageCount() }, (_, index) => (
//                   <PaginationItem key={index}>
//                     <PaginationLink
//                       href="#"
//                       isActive={table.getState().pagination.pageIndex === index}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         table.setPageIndex(index);
//                       }}
//                     >
//                       {index + 1}
//                     </PaginationLink>
//                   </PaginationItem>
//                 ))}
//                 <PaginationItem>
//                   <PaginationNext
//                     href="#"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       table.nextPage();
//                     }}
//                     className={
//                       table.getCanNextPage()
//                         ? ""
//                         : "pointer-events-none opacity-50"
//                     }
//                   />
//                 </PaginationItem>
//               </PaginationContent>
//             </Pagination>
//           </div>
//         </div>
//       </div>
//     </SidebarWrapper>
//   );
// };

// export default JobListPage;


"use client";
import React, { useMemo, useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
import { AddJob } from "./AddJob";
import { FiUserPlus } from "react-icons/fi";
import { LuEye, LuSquarePen, LuUser } from "react-icons/lu";
// import ViewJob from "./ViewJob";
import { FaUserPlus } from "react-icons/fa";
import { MdDelete, MdRefresh } from "react-icons/md";

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
];

const JobListPage = () => {
  const [data, setData] = useState(defaultJobs);
  const [globalFilter, setGlobalFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [openViewPage, setOpenViewPage] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [jobsList, setJobList] = useState(data);
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});

  const handleAddJob = (newJob) => {
    setData((prev) => [...prev, { id: prev.length + 1, ...newJob }]);
    setOpen(false);
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((job) => job.id !== id));
  };

  const handleRefresh = () => {
    setData([...defaultJobs]);
    setRowSelection({});
    setSorting([]);
    setColumnFilters([]);
    setGlobalFilter("");
  };

  // 🔍 Filter the job list when data or search query changes
  useEffect(() => {
    const filtered = data.filter((job) =>
      Object.values(job)
        .join(" ")
        .toLowerCase()
        .includes(globalFilter.toLowerCase())
    );
    setJobList(filtered);
  }, [data, globalFilter]);

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
        cell: ({ row }) => (
          <div className="capitalize text-sm font-medium">
            {row.getValue("jobTitle")}
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
              row.getValue("status") === "Open"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {row.getValue("status")}
          </span>
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
                onClick={() => console.log("Edit", job)}
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
                  setSelectedUser(job);
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
                  setSelectedUser(job);
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
    data: jobsList,
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
      {/* Add Job Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-5xl rounded-xl px-4 sm:px-6 py-4 shadow-2xl space-y-3">
          <div className="flex gap-2 items-center">
            <FiUserPlus className="text-[12px]" />
            <h2 className="text-xl font-semibold">Create Job</h2>
          </div>
          <div className="overflow-y-auto max-h-[70vh] pr-2">
            <AddJob open={open} onOpenChange={setOpen} onSubmit={handleAddJob} />
          </div>
        </DialogContent>
      </Dialog>

      {/* View Job Dialog */}
      <Dialog open={openViewPage} onOpenChange={setOpenViewPage}>
        <DialogContent className="w-full max-w-5xl rounded-xl px-4 sm:px-6 py-4 shadow-2xl space-y-3">
          <div className="flex gap-2 items-center">
            <LuUser className="text-xl" />
            <h3 className="text-lg font-medium">Job Detail</h3>
          </div>
          {/* <ViewJob user={selectedUser} setOpenViewPage={setOpenViewPage} /> */}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteModel} onOpenChange={setOpenDeleteModel}>
        <DialogContent className="w-full max-w-5xl rounded-xl p-6 sm:p-10 shadow-2xl space-y-3">
          <div className="flex flex-col gap-4 items-center">
            <LuUser className="text-xl" />
            <h3 className="text-lg font-medium">
              Are you sure you want to delete this job?
            </h3>
            <div className="space-x-2">
              <button
                onClick={() => {
                  handleDelete(selectedUser?.id);
                  setOpenDeleteModel(false);
                }}
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

      {/* Main Table Layout */}
      <div className="w-full">
        <h2 className="text-lg font-semibold">Job Management</h2>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 py-4">
          <div className="relative w-full sm:w-auto">
            <Input
              placeholder="Search jobs..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-8 w-full sm:w-96"
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setOpen(true)}
              className="bg-black text-white dark:bg-gray-200 dark:text-black px-4 py-[12px] rounded-lg shadow-md hover:bg-gray-800 transition duration-300 text-sm flex gap-1 items-center"
              title="Add Job"
            >
              <FaUserPlus />
              Add Job
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

        {/* Table Display */}
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

        {/* Pagination */}
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

export default JobListPage;
