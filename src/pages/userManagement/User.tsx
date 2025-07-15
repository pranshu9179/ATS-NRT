// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
//   flexRender,
// } from "@tanstack/react-table";
// import { useLazyQuery } from "@apollo/client";
// import { UsersList } from "@/Api/Query";

// import { Search } from "lucide-react";
// import { FaUserPlus } from "react-icons/fa";
// import { MdDelete, MdRefresh } from "react-icons/md";
// import { LuSquarePen, LuEye } from "react-icons/lu";

// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import SidebarWrapper from "@/layouts/Sidebar";
// import AddUser from "./AddUser";
// import ViewUser from "./ViewUser";

// const User = () => {
//   const [sorting, setSorting] = useState([]);
//   const [columnFilters, setColumnFilters] = useState([]);
//   const [columnVisibility, setColumnVisibility] = useState({});
//   const [rowSelection, setRowSelection] = useState({});
//   const [open, setOpen] = useState(false);
//   const [openViewPage, setOpenViewPage] = useState(false);
//   const [openDeleteModel, setOpenDeleteModel] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [userslist, setUserList] = useState([]);

//   const [fetchUsers, { data: userData }] = useLazyQuery(UsersList, {
//     fetchPolicy: "network-only",
//   });

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     if (userData?.usersList?.data) {
//       console.log("✅ API Data:", userData.usersList.data);
//       setUserList(userData.usersList.data);
//     }
//   }, [userData]);

//   const columns = [
//     {
//       id: "select",
//       header: ({ table }) => (
//         <Checkbox
//           checked={
//             table.getIsAllPageRowsSelected() ||
//             (table.getIsSomePageRowsSelected() && "indeterminate")
//           }
//           onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//           aria-label="Select all"
//           className={undefined}
//         />
//       ),
//       cell: ({ row }) => (
//         <Checkbox
//           checked={row.getIsSelected()}
//           onCheckedChange={(value) => row.toggleSelected(!!value)}
//           aria-label="Select row"
//           className={undefined}
//         />
//       ),
//       enableSorting: false,
//       enableHiding: false,
//     },
//     {
//       accessorKey: "name",
//       header: "Name",
//       cell: ({ row }) => (
//         <div className="capitalize text-[14px] cursor-pointer">
//           {row.original?.firstName} {row.original?.lastName}
//         </div>
//       ),
//     },
//     {
//       accessorKey: "email",
//       header: "Email",
//       cell: ({ row }) => (
//         <div className="text-[14px]">{row.original?.email}</div>
//       ),
//     },
//     {
//       accessorKey: "role_names",
//       header: "Role",
//       cell: ({ row }) => (
//         <div className="capitalize text-[14px]">
//           {row.original?.role_names?.[0] || "N/A"}
//         </div>
//       ),
//     },
//     {
//       accessorKey: "userType",
//       header: "User Type",
//       cell: ({ row }) => (
//         <div className="capitalize text-[14px] cursor-pointer">
//           {row.original?.userType}
//         </div>
//       ),
//     },
//     {
//       id: "actions",
//       header: () => <div className="text-center font-bold">Actions</div>,
//       cell: ({ row }) => {
//         const user = row.original;
//         return (
//           <div className="flex justify-center gap-2">
//             <LuSquarePen
//               size={18}
//               className="text-blue-600 hover:text-blue-800 cursor-pointer"
//             />
//             <LuEye
//               size={18}
//               className="text-blue-600 hover:text-blue-800 cursor-pointer"
//               onClick={() => {
//                 setSelectedUser(user);
//                 setOpenViewPage(true);
//               }}
//             />
//             <MdDelete
//               size={20}
//               className="text-red-500 hover:text-red-700 cursor-pointer"
//               onClick={() => {
//                 setSelectedUser(user);
//                 setOpenDeleteModel(true);
//               }}
//             />
//           </div>
//         );
//       },
//     },
//   ];

//   const table = useReactTable({
//     data: userslist,
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
//         <DialogContent className={undefined}>
//           {/* ✅ Pass refetchUsers */}
//           <AddUser setOpen={setOpen} refetchUsers={fetchUsers} />
//         </DialogContent>
//       </Dialog>

//       <Dialog open={openViewPage} onOpenChange={setOpenViewPage}>
//         <DialogContent className={undefined}>
//           <ViewUser user={selectedUser} setOpenViewPage={setOpenViewPage} />
//         </DialogContent>
//       </Dialog>

//       <div className="w-full">
//         <h2 className="text-lg font-semibold">User Management</h2>

//         <div className="flex justify-between py-4">
//           <div className="relative">
//             <Input
//               placeholder="Filter emails..."
//               value={table.getColumn("email")?.getFilterValue() ?? ""}
//               onChange={(e) =>
//                 table.getColumn("email")?.setFilterValue(e.target.value)
//               }
//               className="pl-8 w-96"
//               type={undefined}
//             />
//             <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//           </div>

//           <div className="flex gap-3 items-center">
//             <Button
//               onClick={() => setOpen(true)}
//               className={undefined}
//               variant={undefined}
//               size={undefined}
//             >
//               <FaUserPlus className="mr-1" /> Add User
//             </Button>
//             <div className="border rounded p-2">
//               <MdRefresh
//                 onClick={() => fetchUsers()}
//                 size={20}
//                 className="cursor-pointer text-gray-900"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="w-full overflow-x-auto border rounded">
//           <table className="min-w-full text-sm">
//             <thead className="bg-muted">
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <tr key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => (
//                     <th
//                       key={header.id}
//                       onClick={header.column.getToggleSortingHandler?.()}
//                       className="p-2 text-left cursor-pointer"
//                     >
//                       {flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                       {header.column.getIsSorted() === "asc"
//                         ? " 🔼"
//                         : header.column.getIsSorted() === "desc"
//                         ? " 🔽"
//                         : ""}
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody>
//               {table.getRowModel().rows.length ? (
//                 table.getRowModel().rows.map((row) => (
//                   <tr key={row.id} className="border-b">
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
//                   <td colSpan={columns.length} className="text-center p-4">
//                     No users found.
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
//                       }}
//                       className={undefined}
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

// export default User;



"use client";
import React, { useEffect, useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { useLazyQuery } from "@apollo/client";
import { UsersList } from "@/Api/Query";

import { Search } from "lucide-react";
import { FaUserPlus } from "react-icons/fa";
import { MdDelete, MdRefresh } from "react-icons/md";
import { LuSquarePen, LuEye } from "react-icons/lu";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SidebarWrapper from "@/layouts/Sidebar";
import AddUser from "./AddUser";
import ViewUser from "./ViewUser";

const User = () => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [open, setOpen] = useState(false);
  const [openViewPage, setOpenViewPage] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userslist, setUserList] = useState([]);

  const [fetchUsers, { data: userData }] = useLazyQuery(UsersList, {
    fetchPolicy: "network-only",
  });

  const table = useReactTable({
    data: userslist,
    columns: [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all" className={undefined}          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row" className={undefined}          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="capitalize text-[14px] cursor-pointer">
            {row.original?.firstName} {row.original?.lastName}
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div className="text-[14px]">{row.original?.email}</div>
        ),
      },
      {
        accessorKey: "role_names",
        header: "Role",
        cell: ({ row }) => (
          <div className="capitalize text-[14px]">
            {row.original?.role_names?.[0] || "N/A"}
          </div>
        ),
      },
      {
        accessorKey: "userType",
        header: "User Type",
        cell: ({ row }) => (
          <div className="capitalize text-[14px] cursor-pointer">
            {row.original?.userType}
          </div>
        ),
      },
      {
        id: "actions",
        header: () => <div className="text-center font-bold">Actions</div>,
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex justify-center gap-2">
              <LuSquarePen
                size={18}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
              />
              <LuEye
                size={18}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={() => {
                  setSelectedUser(user);
                  setOpenViewPage(true);
                }}
              />
              <MdDelete
                size={20}
                className="text-red-500 hover:text-red-700 cursor-pointer"
                onClick={() => {
                  setSelectedUser(user);
                  setOpenDeleteModel(true);
                }}
              />
            </div>
          );
        },
      },
    ],
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

  // 🔍 Get table state values
  const pageIndex = table.getState().pagination.pageIndex + 1; // GraphQL is 1-based
  const pageSize = table.getState().pagination.pageSize;
  const emailFilter = columnFilters.find((filter) => filter.id === "email");
  const searchValue = emailFilter?.value || "";

  // 🔁 Fetch data from API whenever pagination or filters change
  useEffect(() => {
    fetchUsers({
      variables: {
        page: pageIndex,
        limit: pageSize,
        search: searchValue,
      },
    });
  }, [pageIndex, pageSize, searchValue]);

  useEffect(() => {
    if (userData?.usersList?.data) {
      setUserList(userData.usersList.data);
    }
  }, [userData]);

  return (
    <SidebarWrapper>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={undefined} >
          <AddUser setOpen={setOpen} refetchUsers={fetchUsers} />
        </DialogContent>
      </Dialog>

      <Dialog open={openViewPage} onOpenChange={setOpenViewPage}>
        <DialogContent className={undefined} >
          <ViewUser user={selectedUser} setOpenViewPage={setOpenViewPage} />
        </DialogContent>
      </Dialog>

      <div className="w-full">
        <h2 className="text-lg font-semibold">User Management</h2>

        <div className="flex justify-between py-4">
          <div className="relative">
            <Input
              placeholder="Filter emails..."
              value={table.getColumn("email")?.getFilterValue() ?? ""}
              onChange={(e) => table.getColumn("email")?.setFilterValue(e.target.value)}
              className="pl-8 w-96" type={undefined}            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <div className="flex gap-3 items-center">
            <Button onClick={() => setOpen(true)} className={undefined} variant={undefined} size={undefined}>
              <FaUserPlus className="mr-1" /> Add User
            </Button>
            <div className="border rounded p-2">
              <MdRefresh
                onClick={() => {
                  fetchUsers({
                    variables: {
                      page: pageIndex,
                      limit: pageSize,
                      search: searchValue,
                    },
                  });
                }}
                size={20}
                className="cursor-pointer text-gray-900"
              />
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto border rounded">
          <table className="min-w-full text-sm">
            <thead className="bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler?.()}
                      className="p-2 text-left cursor-pointer"
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
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b">
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
                  <td colSpan={table.getAllColumns().length} className="text-center p-4">
                    No users found.
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
      </div>
    </SidebarWrapper>
  );
};

export default User;
