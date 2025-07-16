
import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete, MdRefresh, MdOutlineLockPerson } from "react-icons/md";
import { LuEye, LuUser } from "react-icons/lu";
import { Search, UserCog } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import SidebarWrapper from "@/layouts/Sidebar";
import CreateRoles from "./CreateRoles";
import ViewRoles from "./ViewRoles";
import { ListRoles } from "@/Api/Query";
import { formatDate } from "@/components/FormatDate";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

export default function Roles() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [open, setOpen] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [openViewPage, setOpenViewPage] = useState(false);

  const [listRoles, { data }] = useLazyQuery(ListRoles, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    listRoles();
  }, []);

  const mainData = data?.rolesList?.data ?? [];

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} className={undefined}        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)} className={undefined}        />
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="capitalize text-sm">{row.original.name}</div>,
    },
    {
      accessorKey: "userType",
      header: "User Type",
      cell: ({ row }) => <div className="capitalize text-sm">{row.original.userType}</div>,
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => <div className="text-sm">{formatDate(row.original.created_at)}</div>,
    },
    {
      id: "actions",
      header: () => <div className="text-center font-medium">Actions</div>,
      cell: ({ row }) => {
        const role = row.original;
        return (
          <div className="flex justify-center items-center gap-2">
            <FaEdit
              onClick={() => {
                setSelectedRole(role);
                setOpen(true);
              }}
              className="text-blue-600 hover:text-blue-800 cursor-pointer"
              size={18}
            />
            <LuEye
              onClick={() => {
                setSelectedRole(role);
                setOpenViewPage(true);
              }}
              className="text-green-600 hover:text-green-800 cursor-pointer"
              size={18}
            />
            <MdDelete
              onClick={() => {
                setSelectedRole(role);
                setOpenDeleteModel(true);
              }}
              className="text-red-500 hover:text-red-700 cursor-pointer"
              size={20}
            />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: mainData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    initialState: {
      pagination: { pageSize: 5 },
    },
  });

  const handleRefresh = () => {
    listRoles();
    setRowSelection({});
    setSorting([]);
    setColumnFilters([]);
  };

  return (
    <SidebarWrapper>
      {/* Create Role Dialog */}
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent
    className="!w-[90vw] !max-w-none !p-6 !rounded-lg"
    style={{ width: "90vw", maxWidth: "none" }} // ✅ force inline style too
  >
    <DialogHeader className={undefined}>
      <DialogTitle className={undefined}>Create Role</DialogTitle>
      <DialogDescription className={undefined}>Define role permissions below</DialogDescription>
    </DialogHeader>

    {/* Ensure this div isn't restricting width */}
    <div className="w-full h-full overflow-y-auto max-h-[70vh]">
      <CreateRoles setOpen={setOpen} selectedRole={selectedRole} />
    </div>
  </DialogContent>
</Dialog>



      {/* View Role Dialog */}
      <Dialog open={openViewPage} onOpenChange={setOpenViewPage}>
        <DialogContent className="max-w-4xl">
          <DialogHeader className={undefined}>
            <DialogTitle className="flex items-center gap-2">
              <LuUser className="w-5 h-5" />
              View Role
            </DialogTitle>
            <DialogDescription className={undefined}>Details of the selected role.</DialogDescription>
          </DialogHeader>
          <ViewRoles roles={selectedRole} setOpenViewPage={setOpenViewPage} />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={openDeleteModel} onOpenChange={setOpenDeleteModel}>
        <DialogContent className="max-w-md">
          <DialogHeader className={undefined}>
            <DialogTitle className="flex items-center gap-2 justify-center">
              <MdOutlineLockPerson className="w-5 h-5" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-center">
              Are you sure you want to delete this role?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setOpenDeleteModel(false)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
            >
              Confirm
            </button>
            <button
              onClick={() => setOpenDeleteModel(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Page Header */}
      <div className="flex justify-between items-center py-4">
        <h2 className="text-xl font-semibold">Roles</h2>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setSelectedRole(null);
              setOpen(true);
            }}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center gap-2"
          >
            <FaPlus /> Add Role
          </button>
          <div className="p-2 border rounded bg-gray-100">
            <MdRefresh
              onClick={handleRefresh}
              className="cursor-pointer text-gray-700 hover:text-orange-700"
            />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Input
          placeholder="Search by name..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
          className="pl-8 w-96" type={undefined}        />
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full text-sm border">
          <thead className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-2 text-left cursor-pointer"
                    onClick={header.column.getToggleSortingHandler?.()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted()
                      ? header.column.getIsSorted() === "asc"
                        ? " 🔼"
                        : " 🔽"
                      : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`border-b hover:bg-accent ${
                    row.getIsSelected() ? "bg-accent/30" : ""
                  }`}
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
                <td colSpan={columns.length} className="text-center p-4">
                  No roles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center py-4">
        <span className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} selected
        </span>
        <Pagination className={undefined}>
          <PaginationContent className="flex-wrap justify-end">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  table.previousPage();
                }}
                className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : ""}
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
                  } } className={undefined}                >
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
                className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </SidebarWrapper>
  );
}













// // ✅ Full Updated Roles Component with Font Size & Justified Filters

// import React, { useEffect, useState } from "react";
// import { useLazyQuery } from "@apollo/client";
// import { FaEdit, FaPlus } from "react-icons/fa";
// import { MdDelete, MdRefresh, MdOutlineLockPerson } from "react-icons/md";
// import { LuEye, LuUser } from "react-icons/lu";
// import { Search, UserCog } from "lucide-react";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// import SidebarWrapper from "@/layouts/Sidebar";
// import CreateRoles from "./CreateRoles";
// import ViewRoles from "./ViewRoles";
// import { ListRoles } from "@/Api/Query";
// import { formatDate } from "@/components/FormatDate";

// import {
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
//   flexRender,
// } from "@tanstack/react-table";

// export default function Roles() {
//   const [sorting, setSorting] = useState([]);
//   const [columnFilters, setColumnFilters] = useState([]);
//   const [rowSelection, setRowSelection] = useState({});
//   const [open, setOpen] = useState(false);
//   const [openDeleteModel, setOpenDeleteModel] = useState(false);
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [openViewPage, setOpenViewPage] = useState(false);

//   const [listRoles, { data }] = useLazyQuery(ListRoles, {
//     fetchPolicy: "network-only",
//   });

//   useEffect(() => {
//     listRoles();
//   }, []);

//   const mainData = data?.rolesList?.data ?? [];

//   const columns = [
//     {
//       id: "select",
//       header: ({ table }) => (
//         <Checkbox
//           checked={table.getIsAllPageRowsSelected()}
//           onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} className={undefined}        />
//       ),
//       cell: ({ row }) => (
//         <Checkbox
//           checked={row.getIsSelected()}
//           onCheckedChange={(value) => row.toggleSelected(!!value)} className={undefined}        />
//       ),
//     },
//     {
//       accessorKey: "name",
//       header: "Name",
//       cell: ({ row }) => <div className="capitalize text-sm">{row.original.name}</div>,
//     },
//     {
//       accessorKey: "userType",
//       header: "User Type",
//       cell: ({ row }) => <div className="capitalize text-sm">{row.original.userType}</div>,
//     },
//     {
//       accessorKey: "created_at",
//       header: "Created At",
//       cell: ({ row }) => <div className="text-sm">{formatDate(row.original.created_at)}</div>,
//     },
//     {
//       id: "actions",
//       header: () => <div className="text-center font-medium">Actions</div>,
//       cell: ({ row }) => {
//         const role = row.original;
//         return (
//           <div className="flex justify-center items-center gap-2">
//             <FaEdit
//               onClick={() => {
//                 setSelectedRole(role);
//                 setOpen(true);
//               }}
//               className="text-blue-600 hover:text-blue-800 cursor-pointer"
//               size={18}
//             />
//             <LuEye
//               onClick={() => {
//                 setSelectedRole(role);
//                 setOpenViewPage(true);
//               }}
//               className="text-green-600 hover:text-green-800 cursor-pointer"
//               size={18}
//             />
//             <MdDelete
//               onClick={() => {
//                 setSelectedRole(role);
//                 setOpenDeleteModel(true);
//               }}
//               className="text-red-500 hover:text-red-700 cursor-pointer"
//               size={20}
//             />
//           </div>
//         );
//       },
//     },
//   ];

//   const table = useReactTable({
//     data: mainData,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       rowSelection,
//     },
//     initialState: {
//       pagination: { pageSize: 5 },
//     },
//   });

//   const handleRefresh = () => {
//     listRoles();
//     setRowSelection({});
//     setSorting([]);
//     setColumnFilters([]);
//   };

//   return (
//     <SidebarWrapper>
//       {/* Create Role Dialog */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent
//           className="!w-[90vw] !max-w-none !p-6 !rounded-lg text-xl"
//           style={{ width: "90vw", maxWidth: "none" }}
//         >
//           <DialogHeader className={undefined}>
//             <DialogTitle className={undefined}>Create Role</DialogTitle>
//             <DialogDescription className={undefined}>Define role permissions below</DialogDescription>
//           </DialogHeader>
//           <div className="w-full h-full overflow-y-auto max-h-[70vh]">
//             <CreateRoles setOpen={setOpen} selectedRole={selectedRole} />
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* View Role Dialog */}
//       <Dialog open={openViewPage} onOpenChange={setOpenViewPage}>
//         <DialogContent className="max-w-4xl">
//           <DialogHeader className={undefined}>
//             <DialogTitle className="flex items-center gap-2">
//               <LuUser className="w-5 h-5" /> View Role
//             </DialogTitle>
//             <DialogDescription className={undefined}>Details of the selected role.</DialogDescription>
//           </DialogHeader>
//           <ViewRoles roles={selectedRole} setOpenViewPage={setOpenViewPage} />
//         </DialogContent>
//       </Dialog>

//       {/* Delete Confirmation */}
//       <Dialog open={openDeleteModel} onOpenChange={setOpenDeleteModel}>
//         <DialogContent className="max-w-md">
//           <DialogHeader className={undefined}>
//             <DialogTitle className="flex items-center gap-2 justify-center">
//               <MdOutlineLockPerson className="w-5 h-5" /> Confirm Deletion
//             </DialogTitle>
//             <DialogDescription className="text-center">
//               Are you sure you want to delete this role?
//             </DialogDescription>
//           </DialogHeader>
//           <div className="flex justify-center gap-4 mt-4">
//             <button
//               onClick={() => setOpenDeleteModel(false)}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
//             >
//               Confirm
//             </button>
//             <button
//               onClick={() => setOpenDeleteModel(false)}
//               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
//             >
//               Cancel
//             </button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Header */}
//       <div className="flex justify-between items-center py-4">
//         <h2 className="text-xl font-semibold">Roles</h2>
//         <div className="flex gap-3">
//           <button
//             onClick={() => {
//               setSelectedRole(null);
//               setOpen(true);
//             }}
//             className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center gap-2"
//           >
//             <FaPlus /> Add Role
//           </button>
//           <div className="p-2 border rounded bg-gray-100">
//             <MdRefresh
//               onClick={handleRefresh}
//               className="cursor-pointer text-gray-700 hover:text-orange-700"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Search + Filter */}
//       <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
//         <div className="relative w-full sm:w-1/2 max-w-md">
//           <Input
//             placeholder="Search by name..."
//             value={table.getColumn("name")?.getFilterValue() ?? ""}
//             onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
//             className="pl-8" type={undefined}          />
//           <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//         </div>

//         <div className="w-full sm:w-1/3 max-w-xs">
//           <select
//             className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
//             onChange={(e) => {
//               table.getColumn("userType")?.setFilterValue(e.target.value || undefined);
//             }}
//           >
//             <option value="">All User Types</option>
//             <option value="HR">HR</option>
//             <option value="Admin">Admin</option>
//             <option value="Interviewer">Interviewer</option>
//           </select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto border rounded-md">
//         <table className="min-w-full text-sm border">
//           <thead className="bg-muted">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <th
//                     key={header.id}
//                     className="p-2 text-left cursor-pointer"
//                     onClick={header.column.getToggleSortingHandler?.()}
//                   >
//                     {flexRender(header.column.columnDef.header, header.getContext())}
//                     {header.column.getIsSorted()
//                       ? header.column.getIsSorted() === "asc"
//                         ? " 🔼"
//                         : " 🔽"
//                       : ""}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody>
//             {table.getRowModel().rows.length > 0 ? (
//               table.getRowModel().rows.map((row) => (
//                 <tr
//                   key={row.id}
//                   className={`border-b hover:bg-accent ${
//                     row.getIsSelected() ? "bg-accent/30" : ""
//                   }`}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <td key={cell.id} className="p-2">
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={columns.length} className="text-center p-4">
//                   No roles found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex flex-col sm:flex-row justify-between items-center py-4">
//         <span className="text-sm text-muted-foreground">
//           {table.getFilteredSelectedRowModel().rows.length} of {" "}
//           {table.getFilteredRowModel().rows.length} selected
//         </span>
//         <Pagination className={undefined}>
//           <PaginationContent className="flex-wrap justify-end">
//             <PaginationItem>
//               <PaginationPrevious
//                 href="#"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   table.previousPage();
//                 }}
//                 className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : ""}
//               />
//             </PaginationItem>
//             {Array.from({ length: table.getPageCount() }, (_, index) => (
//               <PaginationItem key={index}>
//                 <PaginationLink
//                   href="#"
//                   isActive={table.getState().pagination.pageIndex === index}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     table.setPageIndex(index);
//                   } } className={undefined}                >
//                   {index + 1}
//                 </PaginationLink>
//               </PaginationItem>
//             ))}
//             <PaginationItem>
//               <PaginationNext
//                 href="#"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   table.nextPage();
//                 }}
//                 className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : ""}
//               />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
//       </div>
//     </SidebarWrapper>
//   );
// }
