// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { flexRender } from "@tanstack/react-table";
// import { Search, UserCog } from "lucide-react";
// import { FaEdit, FaPlus } from "react-icons/fa";
// import { MdDelete, MdRefresh, MdOutlineLockPerson } from "react-icons/md";
// import SidebarWrapper from "@/layouts/Sidebar";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// import CreateRoles from "./CreateRoles";
// import ViewRoles from "./ViewRoles";
// import { LuEye, LuUser } from "react-icons/lu";
// import { useLazyQuery } from "@apollo/client";
// import { ListRoles } from "@/Api/Query";
// import { formatDate } from "@/components/FormatDate";

// const initialData = [
//   {
//     name: "Ram verma",
//     userType: "HR",
//     createdAt: "2024-06-01T10:15:00Z",
//   },
//   {
//     name: "Rahul yadav",
//     userType: "Interviewer",
//     createdAt: "2024-06-02T14:20:00Z",
//   },
//   {
//     name: "Tanvi Verma ",
//     userType: "Candidate",
//     createdAt: "2024-06-03T08:10:00Z",
//   },
//   {
//     name: "Anjali Sharma",
//     userType: "Recruiter",
//     createdAt: "2024-06-04T09:00:00Z",
//   },
//   {
//     name: "Suresh verma",
//     userType: "Hiring Manager",
//     createdAt: "2024-06-05T17:45:00Z",
//   },
//   {
//     name: "Priya sharma",
//     userType: "Vendor",
//     createdAt: "2024-06-06T12:30:00Z",
//   },
//   {
//     name: "Karan  verma",
//     userType: "Admin",
//     createdAt: "2024-06-07T16:00:00Z",
//   },
// ];

// export default function Roles() {
//   const [sorting, setSorting] = useState([]);
//   const [columnFilters, setColumnFilters] = useState([]);
//   const [columnVisibility, setColumnVisibility] = useState({});
//   const [rowSelection, setRowSelection] = useState({});
//   const [open, setOpen] = useState(false);
//   const [openDeleteModel, setOpenDeleteModel] = useState(false);
//   const [selectedRoles, setselectedRoles] = useState(null);
//   const [RoleList, setRoleList] = useState(initialData);
//   const [openViewPage, setOpenViewPage] = useState(false);

//   const [listRoles, { data }] = useLazyQuery(ListRoles);

//   const mainData = data?.roles ?? [];

//   useEffect(() => {
//     listRoles();
//   }, []);

//   const handleView = (roles) => {
//     setselectedRoles(roles);
//     setOpenViewPage(true);
//   };

//   const columns = [
//     {
//       id: "select",
//       header: ({ table }) => (
//         <Checkbox
//           checked={table.getIsAllPageRowsSelected() ||
//             (table.getIsSomePageRowsSelected() && "indeterminate")}
//           onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//           aria-label="Select all" className={undefined}        />
//       ),
//       cell: ({ row }) => (
//         <Checkbox
//           checked={row.getIsSelected()}
//           onCheckedChange={(value) => row.toggleSelected(!!value)}
//           aria-label="Select row" className={undefined}        />
//       ),
//       enableSorting: false,
//       enableHiding: false,
//     },
//     {
//       accessorKey: "name",
//       header: "Name",
//       cell: ({ row }) => (
//         <div className="capitalize text-[14px]">{row?.original.name}</div>
//       ),
//     },
//     {
//       accessorKey: "userType",
//       header: "UserType",
//       cell: ({ row }) => (
//         <div className="capitalize text-[14px] cursor-pointer">
//           {row.original?.userType}
//         </div>
//       ),
//     },
//     {
//       accessorKey: "createdAt",
//       header: "Created At",
//       cell: ({ row }) => (
//         <div className="capitalize text-[14px] cursor-pointer">
//           {formatDate(row.original?.created_at)}
//         </div>
//       ),
//     },
//     {
//       id: "actions",
//       header: () => <div className="text-center font-medium">Actions</div>,
//       cell: ({ row }) => {
//         const user = row.original;
//         return (
//           <div className="flex justify-center items-center gap-2">
//             <button type="button">
//               <FaEdit
//                 size={18}
//                 className="text-blue-600 hover:text-blue-800 cursor-pointer"
//                 onClick={() => {
//                   console.log("Edit role:", user);
//                 }}
//               />
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setselectedRoles(user);
//                 setOpenViewPage(true);
//               }}
//             >
//               <LuEye
//                 size={18}
//                 className="text-blue-600 hover:text-blue-800 cursor-pointer"
//               />
//             </button>
//             <button type="button">
//               <MdDelete
//                 onClick={() => {
//                   setselectedRoles(user);
//                   setOpenDeleteModel(true);
//                 }}
//                 size={20}
//                 className="text-red-500 hover:text-red-700 cursor-pointer"
//               />
//             </button>
//           </div>
//         );
//       },
//     },
//   ];

//   const handleDelete = (userId) => {
//     const updatedRoles = RoleList.filter(
//       (role) => role.name !== selectedRoles.name
//     );
//     setRoleList(updatedRoles);
//     setOpenDeleteModel(false);
//   };

//   const handleRefresh = () => {
//     setRoleList([...initialData]);
//     setRowSelection({});
//     setSorting([]);
//     setColumnFilters([]);
//   };

//   const table = useReactTable({
//     data: mainData,
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
//       {/* Create Role Dialog */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="w-full max-w-5xl rounded-xl px-4 sm:px-6 py-4 shadow-2xl space-y-3">
//           <div className="flex items-center gap-4 sticky top-0 z-10 pb-2">
//             <UserCog className="text-[12px]" />
//             <h2 className="text-lg font-medium">Create Role</h2>
//           </div>
//           <div className="overflow-y-auto max-h-[70vh] pr-2">
//             <CreateRoles setOpen={setOpen} />
//           </div>
//         </DialogContent>

//         {/* View Role Dialog */}
//       </Dialog>
//       <Dialog open={openViewPage} onOpenChange={setOpenViewPage}>
//         <DialogContent className="w-full max-w-5xl rounded-xl px-4 sm:px-6 py-4 shadow-2xl space-y-3">
//           <div className="flex gap-2 items-center">
//             <LuUser className="text-xl" />
//             <h3 className="text-lg font-medium">User Detail</h3>
//           </div>
//           <ViewRoles roles={selectedRoles} setOpenViewPage={setOpenViewPage} />
//         </DialogContent>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={openDeleteModel} onOpenChange={setOpenDeleteModel}>
//         <DialogContent className="w-full max-w-5xl rounded-xl p-10 shadow-2xl space-y-3">
//           <div className="flex flex-col gap-4 items-center">
//             <MdOutlineLockPerson className="text-xl" />
//             <h3 className="text-lg font-medium">
//               Are you sure you want to delete this Role?
//             </h3>
//             <div className="space-x-2">
//               <button
//                 onClick={() => handleDelete(selectedRoles?.id)}
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
//         <h2 className="text-lg font-semibold">Roles</h2>
//         <div className="flex justify-between items-center py-4">
//           <div className="relative">
//             <Input
//               placeholder="Search...."
//               value={table.getColumn("name")?.getFilterValue() ?? ""}
//               onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
//               className="pl-8 w-96" type={undefined}            />
//             <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//           </div>

//           <div className="flex gap-3 items-center">
//             <button
//               onClick={() => setOpen(true)}
//               className="bg-black text-white px-4 py-[12px] rounded-lg shadow-md hover:bg-gray-800 transition duration-300 text-sm flex gap-1 items-center"
//               title="Add Role"
//             >
//               <FaPlus /> Add Role
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

//         {/* Updated Table Wrapper */}
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
//                       {header.column.getIsSorted() && {
//                         asc: " 🔼",
//                         desc: " 🔽",
//                       }[header.column.getIsSorted() as string] || ""}
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
//             <Pagination className={undefined}>
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
//                       } } className={undefined}                    >
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
// }

"use client";

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

const initialData = [
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
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [selectedRole, setselectedRole] = useState(null);
  const [RoleList, setRoleList] = useState(initialData);
  const [openViewPage, setOpenViewPage] = useState(false);

  const [listRoles, { data }] = useLazyQuery(ListRoles);

  const mainData = data?.rolesList?.data ?? [];

  useEffect(() => {
    listRoles();
  }, []);

  const handleView = (roles) => {
    setselectedRole(roles);
    setOpenViewPage(true);
  };

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
          className={undefined}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className={undefined}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize text-[14px]">{row?.original.name}</div>
      ),
    },
    {
      accessorKey: "userType",
      header: "UserType",
      cell: ({ row }) => (
        <div className="capitalize text-[14px] cursor-pointer">
          {row.original?.userType}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => (
        <div className="capitalize text-[14px] cursor-pointer">
          {formatDate(row.original?.created_at)}
        </div>
      ),
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
                onClick={() => {
                  console.log("Edit role:", user);
                }}
              />
            </button>
            <button
              type="button"
              onClick={() => {
                setselectedRole(user);
                setOpenViewPage(true);
              }}
            >
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

  const handleDelete = (userId) => {
    const updatedRoles = RoleList.filter(
      (role) => role.name !== selectedRole.name
    );
    setRoleList(updatedRoles);
    setOpenDeleteModel(false);
  };

  const handleRefresh = () => {
    setRoleList([...initialData]);
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
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <SidebarWrapper>
      {/* Create Role Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-5xl rounded-xl px-4 sm:px-6 py-4 shadow-2xl space-y-3">
          <div className="flex items-center gap-4 sticky top-0 z-10 pb-2">
            <UserCog className="text-[12px]" />
            <h2 className="text-lg font-medium">Create Role</h2>
          </div>
          <div className="overflow-y-auto max-h-[70vh] pr-2">
            <CreateRoles setOpen={setOpen} />
          </div>
        </DialogContent>

        {/* View Role Dialog */}
      </Dialog>
      <Dialog open={openViewPage} onOpenChange={setOpenViewPage}>
        <DialogContent className="w-full max-w-5xl rounded-xl px-4 sm:px-6 py-4 shadow-2xl space-y-3">
          <div className="flex gap-2 items-center">
            <LuUser className="text-xl" />
            <h3 className="text-lg font-medium">User Detail</h3>
          </div>
          <ViewRoles roles={selectedRole} setOpenViewPage={setOpenViewPage} />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteModel} onOpenChange={setOpenDeleteModel}>
        <DialogContent className="w-full max-w-5xl rounded-xl p-10 shadow-2xl space-y-3">
          <div className="flex flex-col gap-4 items-center">
            <MdOutlineLockPerson className="text-xl" />
            <h3 className="text-lg font-medium">
              Are you sure you want to delete this Role?
            </h3>
            <div className="space-x-2">
              <button
                onClick={() => handleDelete(selectedRole?.id)}
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

      <div className="w-full">
        <h2 className="text-lg font-semibold">Roles</h2>
        <div className="flex justify-between items-center py-4">
          <div className="relative">
            <Input
              placeholder="Search...."
              value={table.getColumn("name")?.getFilterValue() ?? ""}
              onChange={(e) =>
                table.getColumn("name")?.setFilterValue(e.target.value)
              }
              className="pl-8 w-96"
              type={undefined}
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="flex gap-3 items-center">
            <button
              onClick={() => setOpen(true)}
              className="bg-black text-white px-4 py-[12px] rounded-lg shadow-md hover:bg-gray-800 transition duration-300 text-sm flex gap-1 items-center"
              title="Add Role"
            >
              <FaPlus /> Add Role
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

        {/* Updated Table Wrapper */}
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
                      {(header.column.getIsSorted() &&
                        {
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string]) ||
                        ""}
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
                      }}
                      className={undefined}
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
}
