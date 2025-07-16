// import SidebarWrapper from '@/layouts/Sidebar'
// import React from 'react'

// function Candidate() {
//   console.log(Candidate,"Candidate");

//   return (
//     <>
//       <SidebarWrapper>
//         <h1>Candidate</h1>
//       </SidebarWrapper>
//     </>
//   )
// }
// export default Candidate

// import React, { useMemo, useState } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getSortedRowModel,
//   getPaginationRowModel,
//   flexRender,
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
// import { CreateCandidate } from "./CreateCandidate";

// // Mock candidate data
// const defaultCandidates = [
//   { id: 1, name: "John Doe", email: "john@example.com", status: "applied" },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane@example.com",
//     status: "interviewing",
//   },
//   {
//     id: 3,
//     name: "Alice Johnson",
//     email: "alice@example.com",
//     status: "offered",
//   },
//   { id: 4, name: "Bob Brown", email: "bob@example.com", status: "rejected" },
//   {
//     id: 5,
//     name: "Charlie Lee",
//     email: "charlie@example.com",
//     status: "applied",
//   },
//   {
//     id: 6,
//     name: "Emily Green",
//     email: "emily@example.com",
//     status: "interviewing",
//   },
//   {
//     id: 7,
//     name: "Michael Scott",
//     email: "michael@example.com",
//     status: "hired",
//   },
//   {
//     id: 8,
//     name: "Angela White",
//     email: "angela@example.com",
//     status: "applied",
//   },
// ];

// const CandidateList = () => {
//   const [data, setData] = useState(defaultCandidates);
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [openDialog, setOpenDialog] = useState(false);

//   const handleDelete = (id) => {
//     setData((prev) => prev.filter((candidate) => candidate.id !== id));
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
//         accessorKey: "name",
//         header: "Name",
//         cell: (info) => info.getValue(),
//       },
//       {
//         accessorKey: "email",
//         header: "Email",
//         cell: (info) => info.getValue(),
//       },
//       {
//         accessorKey: "status",
//         header: "Status",
//         cell: (info) => (
//           <span
//             className={`px-2 py-1 text-xs rounded ${
//               info.getValue() === "applied"
//                 ? "bg-blue-100 text-blue-700"
//                 : info.getValue() === "interviewing"
//                 ? "bg-yellow-100 text-yellow-700"
//                 : info.getValue() === "offered"
//                 ? "bg-green-100 text-green-700"
//                 : info.getValue() === "hired"
//                 ? "bg-green-200 text-green-800"
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
//               onClick={() => setOpenDialog(true)}
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
//     <SidebarWrapper>kjnjkhnl
//       <Card className="m-6">jkbjbkj
//         <CardContent className="p-4">
//           {/* Top Toolbar */}
//           <div className="flex justify-between items-center mb-4">
//             <Input
//               placeholder="Search candidates..."
//               value={globalFilter}
//               onChange={(e) => setGlobalFilter(e.target.value)}
//               className="w-60"
//             />
//             <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//               <DialogTrigger asChild>
//                 <Button className={'bg-black text-white'} onClick={() => setOpenDialog(true)}>
//                   + Add Candidate
//                 </Button>
//               </DialogTrigger>
//               <CreateCandidate open={openDialog} onOpenChange={setOpenDialog} />
//             </Dialog>
//           </div>

//           {/* Table */}
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
//                         {{ asc: " 🔼", desc: " 🔽" }[
//                           header.column.getIsSorted()
//                         ] ?? ""}
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

//           {/* Footer Pagination */}
//           <div className="flex justify-between items-center mt-4">
//             <div className="text-xs text-muted-foreground">
//               Showing {table.getRowModel().rows.length} of {data.length}{" "}
//               candidates
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

// export default CandidateList;


import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import SidebarWrapper from "@/layouts/Sidebar";
import { CreateCandidate } from "./CreateCandidate";

const defaultCandidates = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "applied" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "interviewing" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "offered" },
  { id: 4, name: "Bob Brown", email: "bob@example.com", status: "rejected" },
  { id: 5, name: "Charlie Lee", email: "charlie@example.com", status: "applied" },
  { id: 6, name: "Emily Green", email: "emily@example.com", status: "interviewing" },
  { id: 7, name: "Michael Scott", email: "michael@example.com", status: "hired" },
  { id: 8, name: "Angela White", email: "angela@example.com", status: "applied" },
];

const CandidateList = () => {
  const [data, setData] = useState(defaultCandidates);
  const [globalFilter, setGlobalFilter] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = (id) => {
    setData((prev) => prev.filter((candidate) => candidate.id !== id));
  };

  const columns = useMemo(() => [
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
      accessorKey: "name",
      header: "Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => (
        <span
          className={`px-2 py-1 text-xs rounded ${
            info.getValue() === "applied"
              ? "bg-blue-100 text-blue-700"
              : info.getValue() === "interviewing"
              ? "bg-yellow-100 text-yellow-700"
              : info.getValue() === "offered"
              ? "bg-green-100 text-green-700"
              : info.getValue() === "hired"
              ? "bg-green-200 text-green-800"
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
          <Button variant="outline" size="sm" onClick={() => setOpenDialog(true)}>
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => handleDelete(row.original.id)}>
            Delete
          </Button>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ], []);

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
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="w-full max-w-5xl rounded-xl px-4 sm:px-6 py-4 shadow-2xl space-y-3">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Candidate Form</DialogTitle>
          </DialogHeader>
          <CreateCandidate open={openDialog} onOpenChange={setOpenDialog} />
        </DialogContent>
      </Dialog>

      <Card className="m-6">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <Input
              placeholder="Search candidates..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-60"
            />
            <Button
  className="bg-black text-white dark:bg-gray-200 dark:text-black"
  onClick={() => setOpenDialog(true)}
>
  + Add Candidate
</Button>

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
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{ asc: " 🔼", desc: " 🔽" }[header.column.getIsSorted()] ?? ""}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-b hover:bg-accent ${row.getIsSelected() ? "bg-accent/30" : ""}`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-2">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-xs text-muted-foreground">
              Showing {table.getRowModel().rows.length} of {data.length} candidates
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

export default CandidateList;
