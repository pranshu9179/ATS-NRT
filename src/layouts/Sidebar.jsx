// import React, { Children, useState } from "react";
// import {
//   Sidebar as ShadcnSidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { FiMenu } from "react-icons/fi";
// import {
//   Calendar,
//   Group,
//   Home,
//   Inbox,
//   LucideUserRoundPlus,
//   Search,
//   Settings,
// } from "lucide-react";
// import NavBar from "./NavBar";
// import { FiUsers } from "react-icons/fi";
// import DashboardHome from "@/pages/dashboard/DashboardHome";
// import { Link, Route } from "react-router-dom";
// import { ROUTES } from "@/utils";
// import { MdOutlineFeedback } from "react-icons/md";
// import Footer from "./Footer";
// import { LuSquareUserRound, LuUsersRound } from "react-icons/lu";

// const Sidebar = () => {
//   const items = [
//     { title: "Dashboard", url: ROUTES?.DASHBOARD, icon: Home },
//     {
//       title: "User Management",
//       url: ROUTES?.USER_MANAGEMENT,
//       icon: LuUsersRound,
//     },
//     { title: "Permissions", url: ROUTES?.PERMISSIONS, icon: LuUsersRound },
//     {
//       title: "Candidate Management",
//       url: ROUTES?.CANDIDATE_MANAGEMENT,
//       icon: LuSquareUserRound,
//     },
//     {
//       title: "Job Management",
//       url: ROUTES?.JOB_MANAGEMENT,
//       icon: MdOutlineFeedback,
//     },
//     { title: "Calendar", url: "#", icon: Calendar },
//     { title: "Settings", url: "#", icon: Settings },
//   ];

//   return (
//     <ShadcnSidebar className="w-64 h-screen border-r shadow bg-white py-4">
//       <SidebarContent>
//         <SidebarGroup className="space-y-2 bg-white h-full ">
//           <div className="flex flex-col justify-center items-center">
//             <FiUsers className="text-2xl " />
//             <SidebarGroupLabel
//               className="text-lg font-semibold
//           text-gray-950 "
//             >
//               Applicant Tracker
//             </SidebarGroupLabel>
//           </div>

//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <Link to={item.url} className="flex items-center space-x-2">
//                       <item.icon className="w-4 h-4" />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </ShadcnSidebar>
//   );
// };
// const SidebarWrapper = ({ children }) => {
//   return (
//     <SidebarProvider className=" w-full h-screen">
//       <div className="bg-white">
//         <Sidebar />
//       </div>

//       <div className=" w-full bg-gray-100">
//         <div className="sticky top-0 shadow">
//           <NavBar />
//         </div>
//         <div className="bg-white h-screen overflow-y-auto p-8 m-4 rounded-2xl ">
//           {children}
//         </div>

//         <div className="bg-white ">
        
//            <Footer />
//       </div>
//       </div>




      
//     </SidebarProvider>
//   );
// };

// export default SidebarWrapper;





// // // new

import React, { useState } from "react";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { FiUsers } from "react-icons/fi";
import {
  Calendar,
  Home,
  Settings,
} from "lucide-react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import { ROUTES } from "@/utils";
import { MdOutlineFeedback } from "react-icons/md";
import { LuSquareUserRound, LuUsersRound } from "react-icons/lu";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { MdOutlineLockPerson } from "react-icons/md";
import { UserCog, Users } from "lucide-react";

const Sidebar = () => {
  const items = [
    { title: "Dashboard", url: ROUTES?.DASHBOARD, icon: Home },
    {
      title: "User Management",
      url: ROUTES?.USER_MANAGEMENT,
      icon: LuUsersRound,
    },
// { title: "Permissions", url:ROUTES?.ROLES_PERMISSIONS, icon: LuUsersRound  },
{ title: "Roles", url: ROUTES.ROLES, icon: UserCog },
{ title: "Permission", url: ROUTES.PERMISSION, icon: MdOutlineLockPerson },
    {
      title: "Candidate Management",
      url: ROUTES?.CANDIDATE_MANAGEMENT,
      icon: LuSquareUserRound,
    },
    {
      title: "Job Management",
      url: ROUTES?.JOB_MANAGEMENT,
      icon: MdOutlineFeedback,
    },
    { title: "Calendar", url: "#", icon: Calendar },


// const Sidebar = () => {
//   const items = [
//     { title: "Dashbord", url: ROUTES?.DASHBOARD, icon: Home },
//     { title: "User Management", url: ROUTES?.USER, icon: User },

//     { title: "Search", url: "#", icon: Search },
//     { title: "Settings", url: "#", icon: Settings },
  ];

  return (
    <ShadcnSidebar className="w-64 h-screen border-r shadow bg-white dark:bg-zinc-900 dark:border-white/10 py-4">
      <SidebarContent>
        <SidebarGroup className="space-y-2 h-full bg-white dark:bg-zinc-900">
          <div className="flex flex-col justify-center items-center">
            <FiUsers className="text-2xl text-gray-800 dark:text-white" />
            <SidebarGroupLabel className="text-lg font-semibold text-gray-950 dark:text-white">
              Applicant Tracker
            </SidebarGroupLabel>
          </div>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className="flex items-center space-x-2 text-gray-800 dark:text-gray-200"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </ShadcnSidebar>
  );
};

const SidebarWrapper = ({ children }) => {
  return (
    <SidebarProvider className="w-full h-screen flex bg-gray-100 dark:bg-zinc-950 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <div className="bg-white dark:bg-zinc-900">
    {/* <SidebarProvider className=" w-full min-h-screen"> */}
      {/* <div className="bg-white"> */}
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col bg-gray-100 dark:bg-zinc-950">
        {/* Top Nav */}
        <div className="sticky top-0 shadow bg-white dark:bg-zinc-900 z-50">
          <NavBar />
        </div>

        {/* Page Content */}
        <div className="bg-white dark:bg-zinc-900 h-screen overflow-y-auto p-8 m-2 rounded shadow">
        {/* <div className="bg-white p-8 m-2"> */}
          {children}
        </div>

        {/* Footer */}
        <div className="bg-white dark:bg-zinc-900">
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SidebarWrapper;
