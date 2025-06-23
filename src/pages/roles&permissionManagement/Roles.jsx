// // import React, { useMemo, useState, useEffect } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Card } from "@/components/ui/card";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow
// // } from "@/components/ui/table";
// // // import AddRole from "./AddRole";
// // // import EditRollInfo from "./EditRollInfo";
// // // import ViewRollInfo from "./ViewRoleInfo";
// // import SidebarWrapper from "@/layouts/Sidebar";

// // // 🔧 Mock role data (no backend needed)
// // const mockRoleList = [
// //   {
// //     id: 1,
// //     name: "Admin",
// //     userType: "superadmin",
// //     description: "Full access to all features",
// //     created_at: "2024-01-15T12:34:56Z",
// //     permissions: [
// //       { id: 101, name: "Manage Users", group: "User Management" },
// //       { id: 102, name: "View Reports", group: "Analytics" }
// //     ]
// //   },
// //   {
// //     id: 2,
// //     name: "HR",
// //     userType: "hr",
// //     description: "Access to manage candidates and interviews",
// //     created_at: "2024-02-01T10:22:30Z",
// //     permissions: [
// //       { id: 103, name: "Manage Candidates", group: "Recruitment" },
// //       { id: 104, name: "Schedule Interviews", group: "Recruitment" }
// //     ]
// //   }
// // ];

// // const RolePermissionsPage = () => {
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [roles, setRoles] = useState([]);

// //   const fetchRoleData = async () => {
// //     try {
// //       const data = mockRoleList;
// //       const formattedRoles = data.map(role => ({
// //         id: role.id,
// //         name: role.name,
// //         userType: role.userType,
// //         description: role.description,
// //         createdat: role.created_at,
// //         permissions: Object.values(
// //           role.permissions.reduce((acc, permission) => {
// //             if (!acc[permission.group]) {
// //               acc[permission.group] = {
// //                 permission_group: permission.group,
// //                 permissions: []
// //               };
// //             }
// //             acc[permission.group].permissions.push({
// //               permissionname: permission.name,
// //               id: permission.id
// //             });
// //             return acc;
// //           }, {})
// //         )
// //       }));
// //       setRoles(formattedRoles);
// //     } catch (error) {
// //       console.error("Error fetching mock role data:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchRoleData();
// //   }, []);

// //   const filteredRoles = useMemo(() => {
// //     return roles.filter(role =>
// //       Object.values(role).some(value =>
// //         value.toString().toLowerCase().includes(searchTerm.toLowerCase())
// //       )
// //     );
// //   }, [roles, searchTerm]);

// //   return (
// //     <SidebarWrapper>
// //     <Card className="p-6 mt-6">
// //       <div className="flex items-center justify-between mb-4">
// //         <Input
// //           placeholder="Search roles"
// //           className="w-1/3"
// //           value={searchTerm}
// //           onChange={e => setSearchTerm(e.target.value)}
// //         />
// //         {/* <AddRole onSuccess={fetchRoleData} /> */}
// //       </div>
// //       <Table>
// //         <TableHeader>
// //           <TableRow>
// //             <TableHead className="w-[80px]">ID</TableHead>
// //             <TableHead>Role Name</TableHead>
// //             <TableHead>User Type</TableHead>
// //             <TableHead>Created At</TableHead>
// //             <TableHead className="text-center">Actions</TableHead>
// //           </TableRow>
// //         </TableHeader>
// //         <TableBody>
// //           {filteredRoles.map(role => (
// //             <TableRow key={role.id}>
// //               <TableCell>{role.id}</TableCell>
// //               <TableCell>{role.name}</TableCell>
// //               <TableCell>{role.userType}</TableCell>
// //               <TableCell>{new Date(role.createdat).toDateString()}</TableCell>
// //               <TableCell className="flex gap-2 justify-center">
// //                 {/* <EditRollInfo roleData={role} onSuccess={fetchRoleData} /> */}
// //                 {/* <ViewRollInfo roleData={role} /> */}
// //                 <Button
// //                   variant="destructive"
// //                   className="h-8 w-8 p-0 text-white"
// //                 >
// //                   <i className="tabler-square-off text-lg" />
// //                 </Button>
// //               </TableCell>
// //             </TableRow>
// //           ))}
// //         </TableBody>
// //       </Table>
// //     </Card>
// //     </SidebarWrapper>
// //   );
// // };

// // export default RolePermissionsPage;

// "use client";

// import React, { useMemo, useState, useEffect } from "react";
// import {
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
//   flexRender,
// } from "@tanstack/react-table";
// import { LuEye, LuSquarePen } from "react-icons/lu";
// import { MdDelete } from "react-icons/md";
// import { Search } from "lucide-react";

// import SidebarWrapper from "@/layouts/Sidebar";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// const mockRoles = [
//   {
//     id: 1,
//     name: "Admin",
//     userType: "superadmin",
//     createdat: "2024-01-15T12:34:56Z",
//   },
//   {
//     id: 2,
//     name: "HR",
//     userType: "hr",
//     createdat: "2024-02-01T10:22:30Z",
//   },
// ];

// const RolePermissionsPage = () => {
//   const [roles, setRoles] = useState(mockRoles);
//   const [searchTerm, setSearchTerm] = useState("");

//   const columns = [
//     {
//       id: "select",
//       header: ({ table }) => (
//         <Checkbox
//           checked={table.getIsAllPageRowsSelected()}
//           onCheckedChange={(value) =>
//             table.toggleAllPageRowsSelected(!!value)
//           }
//           aria-label="Select all"
//         />
//       ),
//       cell: ({ row }) => (
//         <Checkbox
//           checked={row.getIsSelected()}
//           onCheckedChange={(value) => row.toggleSelected(!!value)}
//           aria-label="Select row"
//         />
//       ),
//     },
//     {
//       accessorKey: "name",
//       header: "Role Name",
//       cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
//     },
//     {
//       accessorKey: "userType",
//       header: "User Type",
//       cell: ({ row }) => <div className="capitalize">{row.getValue("userType")}</div>,
//     },
//     {
//       accessorKey: "createdat",
//       header: "Created At",
//       cell: ({ row }) => (
//         <div>{new Date(row.getValue("createdat")).toDateString()}</div>
//       ),
//     },
//     {
//       id: "actions",
//       header: () => <div className="text-center font-semibold">Actions</div>,
//       cell: ({ row }) => (
//         <div className="flex justify-center items-center gap-2">
//           <Button variant="ghost" size="sm">
//             <LuSquarePen size={18} className="text-blue-600" />
//           </Button>
//           <Button variant="ghost" size="sm">
//             <LuEye size={18} className="text-green-600" />
//           </Button>
//           <Button variant="ghost" size="sm">
//             <MdDelete size={18} className="text-red-600" />
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   const table = useReactTable({
//     data: roles,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     state: {
//       globalFilter: searchTerm,
//     },
//     onGlobalFilterChange: setSearchTerm,
//   });

//   return (
//     <SidebarWrapper>
//       <div className="p-6">uiyuy
//         <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 mb-6">
//           <h2 className="text-xl font-semibold">Role & Permissions</h2>
//           <div className="relative w-full sm:w-96">
//             <Input
//               placeholder="Search roles..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-8"
//             />
//             <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//           </div>
//         </div>

//         <div className="overflow-x-auto rounded-md border">
//           <table className="min-w-full text-sm">
//             <thead className="bg-muted">
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <tr key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => (
//                     <th key={header.id} className="p-2 text-left">
//                       {flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody>
//               {table.getRowModel().rows.map((row) => (
//                 <tr key={row.id} className="border-b hover:bg-accent">
//                   {row.getVisibleCells().map((cell) => (
//                     <td key={cell.id} className="p-2">
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 mt-4">
//           <div className="text-muted-foreground text-sm">
//             {table.getFilteredRowModel().rows.length} role(s) found.
//           </div>
//           <Pagination>
//             <PaginationContent>
//               <PaginationItem>
//                 <PaginationPrevious
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     table.previousPage();
//                   }}
//                   className={
//                     table.getCanPreviousPage() ? "" : "pointer-events-none opacity-50"
//                   }
//                 />
//               </PaginationItem>
//               {Array.from({ length: table.getPageCount() }, (_, index) => (
//                 <PaginationItem key={index}>
//                   <PaginationLink
//                     href="#"
//                     isActive={table.getState().pagination.pageIndex === index}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       table.setPageIndex(index);
//                     }}
//                   >
//                     {index + 1}
//                   </PaginationLink>
//                 </PaginationItem>
//               ))}
//               <PaginationItem>
//                 <PaginationNext
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     table.nextPage();
//                   }}
//                   className={
//                     table.getCanNextPage() ? "" : "pointer-events-none opacity-50"
//                   }
//                 />
//               </PaginationItem>
//             </PaginationContent>
//           </Pagination>
//         </div>
//       </div>
//     </SidebarWrapper>
//   );
// };

// export default RolePermissionsPage;



// "use client";
// import React, { useState } from "react";
// import {
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
//   flexRender,
// } from "@tanstack/react-table";
// import { LucideDelete, LucideView, Search } from "lucide-react";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { FaUserPlus, FaEdit } from "react-icons/fa";
// import { MdDelete, MdRefresh } from "react-icons/md";
// import { FiUserPlus } from "react-icons/fi";
// import { LuDelete, LuEye, LuSquarePen, LuUser, LuView } from "react-icons/lu";

// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import SidebarWrapper from "@/layouts/Sidebar";
// import AddRole from "./AddRole";
// // import ViewUser from "./ViewUser";
// // import { IconName } from "react-icons/lu";

// const data = [
//   {
//     id: "5kma53ae",
//     name: "Silas Rhodes",
//     email: "silas22@example.com",
//     role: "DevOps Engineer",
//     experience: 4,
//     location: "Berlin, Germany",
//     appliedDate: "2025-06-08",
//     status: "success",
//   },
//   {
//     id: "f8kd90wl",
//     name: "Isla Rivera",
//     email: "isla.rivera@example.com",
//     role: "Full Stack Developer",
//     experience: 4,
//     location: "Delhi, India",
//     appliedDate: "2025-06-06",
//     status: "success",
//   },
//   {
//     id: "x7nq29dj",
//     name: "Leah Matthews",
//     email: "leah.matthews@example.com",
//     role: "Backend Developer",
//     experience: 6,
//     location: "London, UK",
//     appliedDate: "2025-06-10",
//     status: "success",
//   },
//   {
//     id: "q1lz77jk",
//     name: "Damon Frye",
//     email: "damon.frye@example.com",
//     role: "UI Designer",
//     experience: 2,
//     location: "Austin, USA",
//     appliedDate: "2025-06-11",
//     status: "failed",
//   },
//   {
//     id: "e0wz35mn",
//     name: "Rhea Singh",
//     email: "rhea.singh@example.com",
//     role: "Product Designer",
//     experience: 5,
//     location: "Mumbai, India",
//     appliedDate: "2025-06-08",
//     status: "success",
//   },
// ];

// const RolePermissionsPage = () => {
//   const [sorting, setSorting] = useState([]);
//   const [columnFilters, setColumnFilters] = useState([]);
//   const [columnVisibility, setColumnVisibility] = useState({});
//   const [rowSelection, setRowSelection] = useState({});
//   const [open, setOpen] = useState(false);
//   const [openViewPage, setOpenViewPage] = useState(false);
//   const [openDeleteModel, setOpenDeleteModel] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [userslist, setUserList] = useState(data);

//   const handleView = (user) => {
//     setSelectedUser(user);
//     setOpenViewPage(true);
//   };

//   const handleDelete = (userId) => {
//     console.log(userId);
//     setOpenDeleteModel(false);
//   };

//   const handleRefresh = () => {
//     setUserList([...data]);
//     setRowSelection({});
//     setSorting([]);
//     setColumnFilters([]);
//   };

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
//         />
//       ),
//       cell: ({ row }) => (
//         <Checkbox
//           checked={row.getIsSelected()}
//           onCheckedChange={(value) => row.toggleSelected(!!value)}
//           aria-label="Select row"
//         />
//       ),
//       enableSorting: false,
//       enableHiding: false,
//     },
//     {
//       accessorKey: "name",
//       header: "Role Name",
//       cell: ({ row }) => (
//         <div
//           onClick={() => handleView(row.original)}
//           className="capitalize text-[14px] hover:underline cursor-pointer hover:text-cyan-500"
//         >
//           {row.getValue("name")}
//         </div>
//       ),
//     },
//     // {
//     //   accessorKey: "email",
//     //   header: ({ column }) => (
//     //     <Button
//     //       variant="ghost"
//     //       className={"font-bold"}
//     //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//     //     >
//     //       Email
//     //     </Button>
//     //   ),
//     //   cell: ({ row }) => (
//     //     <div className="capitalize  text-[14px]">{row.getValue("email")}</div>
//     //   ),
//     // },
//     {
//       accessorKey: "role",
//       header: "User Type",
//       cell: ({ row }) => (
//         <div className="capitalize text-[14px]">{row.getValue("role")}</div>
//       ),
//     },
    
//     {
//       accessorKey: "experience",
//       header: "Created At",
//       cell: ({ row }) => (
//         <div className="capitalize text-[14px]">
//           {row.getValue("experience")}
//         </div>
//       ),
//     },
//     // {
//     //   accessorKey: "status",
//     //   header: "Status",
//     //   cell: ({ row }) => (
//     //     <div className="capitalize text-[14px]">{row.getValue("status")}</div>
//     //   ),
//     // },
//     {
//       id: "actions",
//       header: () => (
//         <div className="text-center font-bold capitalize text-[14px]">
//           Actions
//         </div>
//       ),
//       cell: ({ row }) => {
//         const user = row.original;
//         return (
//           <div className="flex justify-center items-center gap-2">
//             <button type="button">
//               <LuSquarePen
//                 size={18}
//                 className="text-blue-600 hover:text-blue-800 cursor-pointer"
//               />
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setSelectedUser(user);
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
//                   setSelectedUser(user);
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
//       <Dialog open={open} onOpenChange={setOpen} >
//         <DialogContent className="w-full max-w-5xl rounded-xl px-4 sm:px-6 py-4 shadow-2xl space-y-3">
//           <div className="flex gap-2 items-center">
//             <FiUserPlus className="text-xl" />
//             <h3 className="text-xl font-semibold">Create User</h3>
//           </div>
//           <AddRole setOpen={setOpen} />
//         </DialogContent>
//       </Dialog>

//       {/* <Dialog open={openViewPage} onOpenChange={setOpenViewPage}>
//         <DialogContent className="w-full max-w-5xl rounded-xl px-4 sm:px-6 py-4 shadow-2xl space-y-3">
//           <div className="flex gap-2 items-center">
//             <LuUser className="text-xl" />
//             <h3 className="text-lg font-medium">User Detail</h3>
//           </div>
//           {/* <ViewUser user={selectedUser} setOpenViewPage={setOpenViewPage} /> */}
//         {/* </DialogContent> 
//       </Dialog> */}

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
//         <h2 className="text-lg font-semibold">Role & Permissions</h2>
//         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 py-4">
//           <div className="relative w-full sm:w-auto">
//             <Input
//               placeholder="Filter emails..."
//               // value={table.getColumn("email")?.getFilterValue() ?? ""}
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
//              Create Role
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

// export default RolePermissionsPage;


// 'use client';

// import React, { useState } from 'react';
// import {
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
//   flexRender,
// } from '@tanstack/react-table';

// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from '@/components/ui/pagination';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Dialog, DialogContent } from '@/components/ui/dialog';
// import { MdDelete, MdRefresh } from 'react-icons/md';
// import { FaUserPlus } from 'react-icons/fa';
// import { LuEye, LuSquarePen } from 'react-icons/lu';
// import { Search } from 'lucide-react';

// import SidebarWrapper from '@/layouts/Sidebar';
// import AddRole from './AddRole';

// // ✅ Fields aligned with AddRole.jsx
// const data = [
//   {
//     id: '1',
//     name: 'HR Manager',
//     userType: 'hr',
//     description: 'Handles all hiring processes and onboarding',
//   },
//   {
//     id: '2',
//     name: 'Admin Executive',
//     userType: 'superadmin',
//     description: 'Manages system settings and user access',
//   },
//   {
//     id: '3',
//     name: 'Tech Interviewer',
//     userType: 'interviewer',
//     description: 'Conducts technical interviews and evaluations',
//   },
// ];

// const RolePermissionsPage = () => {
//   const [sorting, setSorting] = useState([]);
//   const [columnFilters, setColumnFilters] = useState([]);
//   const [columnVisibility, setColumnVisibility] = useState({});
//   const [open, setOpen] = useState(false);
//   const [openDeleteModel, setOpenDeleteModel] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [userslist, setUserList] = useState(data);

//   const handleRefresh = () => {
//     setUserList([...data]);
//     setSorting([]);
//     setColumnFilters([]);
//   };

//   const columns = [
//         {
//           id: "select",
//           header: ({ table }) => (
//             <Checkbox
//               checked={
//                 table.getIsAllPageRowsSelected() ||
//                 (table.getIsSomePageRowsSelected() && "indeterminate")
//               }
//               onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//               aria-label="Select all"
//             />
//           ),
//           cell: ({ row }) => (
//             <Checkbox
//               checked={row.getIsSelected()}
//               onCheckedChange={(value) => row.toggleSelected(!!value)}
//               aria-label="Select row"
//             />
//           ),
//           enableSorting: false,
//           enableHiding: false,
//         },
//     {
//       accessorKey: 'name',
//       header: 'Role Name',
//       cell: ({ row }) => (
//         <div className="capitalize text-[14px]">{row.getValue('name')}</div>
//       ),
//     },
//     {
//       accessorKey: 'userType',
//       header: 'User Type',
//       cell: ({ row }) => (
//         <div className="capitalize text-[14px]">{row.getValue('userType')}</div>
//       ),
//     },
//     {
//       accessorKey: 'description',
//       header: 'Description',
//       cell: ({ row }) => (
//         <div className="text-[14px]">{row.getValue('description')}</div>
//       ),
//     },
//     {
//       id: 'actions',
//       header: () => (
//         <div className="text-center font-bold capitalize text-[14px]">
//           Actions
//         </div>
//       ),
//       cell: ({ row }) => {
//         const user = row.original;
//         return (
//           <div className="flex justify-center items-center gap-2">
//             <LuSquarePen
//               size={18}
//               className="text-blue-600 hover:text-blue-800 cursor-pointer"
//             />
//             <LuEye
//               size={18}
//               className="text-blue-600 hover:text-blue-800 cursor-pointer"
//               onClick={() => {}}
//             />
//             <MdDelete
//               onClick={() => {
//                 setSelectedUser(user);
//                 setOpenDeleteModel(true);
//               }}
//               size={20}
//               className="text-red-500 hover:text-red-700 cursor-pointer"
//             />
//           </div>
//         );
//       },
//     },
//   ];

//   const table = useReactTable({
//     data: userslist,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//     },
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     onColumnVisibilityChange: setColumnVisibility,
//     initialState: {
//       pagination: {
//         pageSize: 5,
//       },
//     },
//   });

//   return (
//     <SidebarWrapper>
//       {/* 🔹 Add Role Dialog */}
//       <AddRole open={open} setOpen={setOpen} onSuccess={handleRefresh} />

//       {/* 🔹 Delete Confirmation Dialog */}
//       <Dialog open={openDeleteModel} onOpenChange={setOpenDeleteModel}>
//         <DialogContent className="max-w-md p-6 space-y-4">
//           <div className="text-center space-y-2">
//             <LuEye className="mx-auto text-3xl" />
//             <h3 className="text-lg font-semibold">
//               Are you sure you want to delete this role?
//             </h3>
//           </div>
//           <div className="flex justify-center gap-4">
//             <Button
//               onClick={() => {
//                 console.log('Deleted:', selectedUser?.id);
//                 setOpenDeleteModel(false);
//               }}
//               className="bg-green-600 hover:bg-green-800 text-white"
//             >
//               Delete
//             </Button>
//             <Button
//               onClick={() => setOpenDeleteModel(false)}
//               variant="destructive"
//             >
//               Cancel
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       <div className="w-full">
//         <h2 className="text-lg font-semibold mb-4">Role & Permissions</h2>

//         {/* 🔹 Filter + Actions */}
//         <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
//           <div className="relative w-full sm:w-96">
//             <Input
//               placeholder="Search roles..."
//               onChange={(event) =>
//                 table.getColumn('name')?.setFilterValue(event.target.value)
//               }
//               className="pl-8"
//             />
//             <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//           </div>

//           <div className="flex gap-3 items-center">
//             <Button onClick={() => setOpen(true)} className="gap-2">
//               <FaUserPlus /> Create Role
//             </Button>
//             <div className="border p-2 rounded-md bg-gray-100 hover:text-gray-500">
//               <MdRefresh
//                 onClick={handleRefresh}
//                 size={20}
//                 className="cursor-pointer text-gray-900 hover:text-orange-700"
//               />
//             </div>
//           </div>
//         </div>

//         {/* 🔹 Table */}
//         <div className="overflow-x-auto border rounded-md">
//           <table className="min-w-full text-sm">
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
//                       {header.column.getIsSorted() === 'asc'
//                         ? ' 🔼'
//                         : header.column.getIsSorted() === 'desc'
//                         ? ' 🔽'
//                         : ''}
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody>
//               {table.getRowModel().rows.length ? (
//                 table.getRowModel().rows.map((row) => (
//                   <tr key={row.id} className="border-b hover:bg-accent/50">
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
//                     No roles found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* 🔹 Pagination */}
//         {/* <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 py-4">
//           <div className="text-muted-foreground text-sm">
//             {table.getFilteredRowModel().rows.length} role(s) found.
//           </div>

//           <Pagination>
//             <PaginationContent className="flex-wrap">
//               <PaginationItem>
//                 <PaginationPrevious
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     table.previousPage();
//                   }}
//                   className={
//                     table.getCanPreviousPage()
//                       ? ''
//                       : 'pointer-events-none opacity-50'
//                   }
//                 />
//               </PaginationItem>
//               {Array.from({ length: table.getPageCount() }, (_, i) => (
//                 <PaginationItem key={i}>
//                   <PaginationLink
//                     href="#"
//                     isActive={table.getState().pagination.pageIndex === i}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       table.setPageIndex(i);
//                     }}
//                   >
//                     {i + 1}
//                   </PaginationLink>
//                 </PaginationItem>
//               ))}
//               <PaginationItem>
//                 <PaginationNext
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     table.nextPage();
//                   }}
//                   className={
//                     table.getCanNextPage()
//                       ? ''
//                       : 'pointer-events-none opacity-50'
//                   }
//                 />
//               </PaginationItem>
//             </PaginationContent>
//           </Pagination>
//         </div> */}
//         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-4">
//                   <div className="text-muted-foreground text-sm">
//                     {table.getFilteredSelectedRowModel().rows.length} of{" "}
//                     {table.getFilteredRowModel().rows.length} row(s) selected.
//                   </div>
//                   <div className="w-full sm:w-auto flex justify-end">
//                     <Pagination>
//                       <PaginationContent className="flex-wrap sm:justify-end">
//                         <PaginationItem>
//                           <PaginationPrevious
//                             href="#"
//                             onClick={(e) => {
//                               e.preventDefault();
//                               table.previousPage();
//                             }}
//                             className={
//                               table.getCanPreviousPage()
//                                 ? ""
//                                 : "pointer-events-none opacity-50"
//                             }
//                           />
//                         </PaginationItem>
//                         {Array.from({ length: table.getPageCount() }, (_, index) => (
//                           <PaginationItem key={index}>
//                             <PaginationLink
//                               href="#"
//                               isActive={table.getState().pagination.pageIndex === index}
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 table.setPageIndex(index);
//                               }}
//                             >
//                               {index + 1}
//                             </PaginationLink>
//                           </PaginationItem>
//                         ))}
//                         <PaginationItem>
//                           <PaginationNext
//                             href="#"
//                             onClick={(e) => {
//                               e.preventDefault();
//                               table.nextPage();
//                             }}
//                             className={
//                               table.getCanNextPage()
//                                 ? ""
//                                 : "pointer-events-none opacity-50"
//                             }
//                           />
//                         </PaginationItem>
//                       </PaginationContent>
//                     </Pagination>
//                   </div>
//                 </div>
//       </div>
//     </SidebarWrapper>
//   );
// };

// export default RolePermissionsPage;


'use client';

import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MdDelete, MdRefresh } from 'react-icons/md';
import { FaUserPlus } from 'react-icons/fa';
import { LuEye, LuSquarePen, LuUser } from 'react-icons/lu';
import { Search } from 'lucide-react';

import SidebarWrapper from '@/layouts/Sidebar';
import AddRole from './AddRole';

const data = [
  {
    id: '1',
    name: 'HR Manager',
    userType: 'hr',
    description: 'Handles all hiring processes and onboarding',
  },
  {
    id: '2',
    name: 'Admin Executive',
    userType: 'superadmin',
    description: 'Manages system settings and user access',
  },
  {
    id: '3',
    name: 'Tech Interviewer',
    userType: 'interviewer',
    description: 'Conducts technical interviews and evaluations',
  },
];

const RolePermissionsPage = () => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [open, setOpen] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userslist, setUserList] = useState(data);

  const handleRefresh = () => {
    setUserList([...data]);
    setSorting([]);
    setColumnFilters([]);
    setRowSelection({});
  };

  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
      accessorKey: 'name',
      header: 'Role Name',
      cell: ({ row }) => (
        <div className="capitalize text-[14px]">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'userType',
      header: 'User Type',
      cell: ({ row }) => (
        <div className="capitalize text-[14px]">{row.getValue('userType')}</div>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => (
        <div className="text-[14px]">{row.getValue('description')}</div>
      ),
    },
    {
      id: 'actions',
      header: () => (
        <div className="text-center font-bold capitalize text-[14px]">
          Actions
        </div>
      ),
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex justify-center items-center gap-2">
            <LuSquarePen
              size={18}
              className="text-blue-600 hover:text-blue-800 cursor-pointer"
            />
            <LuEye
              size={18}
              className="text-blue-600 hover:text-blue-800 cursor-pointer"
              onClick={() => {}}
            />
            <MdDelete
              onClick={() => {
                setSelectedUser(user);
                setOpenDeleteModel(true);
              }}
              size={20}
              className="text-red-500 hover:text-red-700 cursor-pointer"
            />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: userslist,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
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
      {/* Add Role */}
      <AddRole open={open} setOpen={setOpen} onSuccess={handleRefresh} />

      {/* Delete Confirmation */}
      <Dialog open={openDeleteModel} onOpenChange={setOpenDeleteModel}>
        <DialogContent className="max-w-md p-6 space-y-4">
          <div className="text-center space-y-2">
            <LuUser className="mx-auto text-3xl" />
            <h3 className="text-lg font-semibold">
              Are you sure you want to delete this role?
            </h3>
          </div>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => {
                console.log('Deleted:', selectedUser?.id);
                setOpenDeleteModel(false);
              }}
              className="bg-green-600 hover:bg-green-800 text-white"
            >
              Delete
            </Button>
            <Button
              onClick={() => setOpenDeleteModel(false)}
              variant="destructive"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="w-full">
        <h2 className="text-lg font-semibold mb-4">Role & Permissions</h2>

        {/* Filter and Actions */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
          <div className="relative w-full sm:w-96">
            <Input
              placeholder="Search roles..."
              onChange={(e) =>
                table.getColumn('name')?.setFilterValue(e.target.value)
              }
              className="pl-8"
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="flex gap-3 items-center">
            <Button onClick={() => setOpen(true)} className="gap-2">
              <FaUserPlus /> Create Role
            </Button>
            <div className="border p-2 rounded-md bg-gray-100 hover:text-gray-500">
              <MdRefresh
                onClick={handleRefresh}
                size={20}
                className="cursor-pointer text-gray-900 hover:text-orange-700"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-md">
          <table className="min-w-full text-sm">
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
                      {header.column.getIsSorted() === 'asc'
                        ? ' 🔼'
                        : header.column.getIsSorted() === 'desc'
                        ? ' 🔽'
                        : ''}
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
                      row.getIsSelected() ? 'bg-accent/40' : ''
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
                    No roles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination & Selection Info */}
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

export default RolePermissionsPage;
