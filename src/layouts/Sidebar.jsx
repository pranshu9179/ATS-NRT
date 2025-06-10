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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { FiMenu } from "react-icons/fi";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import Header from "./Header";
import { FiUsers } from "react-icons/fi";
import DashboardHome from "@/pages/dashboard/DashboardHome";

const Sidebar = () => {
  const items = [
    { title: "Home", url: "#", icon: Home },
    { title: "Inbox", url: "#", icon: Inbox },
    { title: "Calendar", url: "#", icon: Calendar },
    { title: "Search", url: "#", icon: Search },
    { title: "Settings", url: "#", icon: Settings },
  ];

  return (
    <ShadcnSidebar className="w-64 h-screen border-r shadow bg-white py-4">
      <SidebarContent>
        <SidebarGroup className="space-y-2 bg-white h-full ">
          <div className="flex flex-col justify-center items-center">
            <FiUsers className="text-2xl " />
            <SidebarGroupLabel
              className="text-lg font-semibold
          text-gray-950 "
            >
              Applicant Tracker
            </SidebarGroupLabel>
          </div>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center space-x-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
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

const SidebarWrapper = () => {
  return (
    <SidebarProvider className=" w-full h-screen">
      <div className="bg-white">
        <Sidebar />
      </div>

      <div className=" w-full bg-gray-100">
        <div className="sticky top-0 shadow">
          <Header />
        </div>
        <div className="bg-white h-screen overflow-y-auto p-8 m-2">
          <DashboardHome />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SidebarWrapper;

// import React, { useState } from "react";
// import { FiMenu, FiX } from "react-icons/fi";
// import { Link, useLocation } from "react-router-dom";

// const Sidebar = ({ isOpen, setIsOpen, isAdmin }) => {
//   const location = useLocation();
//   const activePage = location.pathname;

//   const navItems = [
//     { name: "Dashboard", path: "/dashboard", isAdmin: false },
//     { name: "Jobs", path: "/jobs", isAdmin: false },
//     { name: "Candidates", path: "/candidates", isAdmin: false },
//   ];

//   return (
//     <>

//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//           onClick={() => setIsOpen(false)}
//         ></div>
//       )}

//       <div
//         className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r shadow-lg transform transition-transform duration-300 ease-in-out
//           ${isOpen ? "translate-x-0" : "-translate-x-full"}
//           md:translate-x-0 md:relative md:z-0
//         `}
//       >

//         <div className="md:hidden flex justify-end p-4">
//           <button
//             onClick={() => setIsOpen(false)}
//             aria-label="Close sidebar"
//             className="text-gray-700 text-2xl"
//           >
//             <FiX />
//           </button>
//         </div>

//         <div className="p-6">
//           <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Navigation</h2>
//           <nav>
//             <ul className="space-y-2">
//               {navItems.map((item) => {
//                 if (item.isAdmin && !isAdmin) return null;

//                 return (
//                   <li key={item.path}>
//                     <Link
//                       to={item.path}
//                       onClick={() => setIsOpen(false)}
//                       className={`flex items-center w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                         activePage === item.path
//                           ? "bg-indigo-100 text-indigo-700"
//                           : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
//                       }`}
//                     >
//                       {item.name}
//                     </Link>
//                   </li>
//                 );
//               })}
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </>
//   );
// };

// Parent component jahan sidebar toggle state handle hota hai
// const SidebarWrapper = ({ isAdmin }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="flex">

//       <button
//         onClick={() => setIsOpen(true)}
//         className="p-4 md:hidden fixed top-2 left-2 z-50 bg-indigo-600 text-white rounded-md"
//         aria-label="Open sidebar"
//       >
//         <FiMenu size={24} />
//       </button>

//       <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} isAdmin={isAdmin} />

//       {/* Main content area */}
//       <main className="flex-1 p-6 md:ml-64">
//         <h1 className="text-3xl font-bold">Main Content Here</h1>
//         <p>Page content goes here...</p>
//       </main>
//     </div>
//   );
// };

// export default SidebarWrapper;
