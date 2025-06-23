// import React, { useState } from "react";
// import { SidebarTrigger } from "@/components/ui/sidebar";
// import { SlBell } from "react-icons/sl";
// import { LuUserRound } from "react-icons/lu";
// import { IoMdLogOut } from "react-icons/io";
// import { ModeToggle } from "@/components/mode-toggle";

// const Header = () => {
  
//   return (
//     <>
//       <div className="flex justify-between items-center  gap-4 h-14  bg-white w-full p-4 ">
//         <div className="flex items-center  gap-3">
//           <SidebarTrigger className="" />
//           <div>
//             <span className="text-lg font-medium">Dashboard ATS</span>
//           </div>
//         </div>

//         <div className="flex items-center gap-4 px-4">
//           {/* Bell Icon */}
//           <div className="relative">
//             <SlBell className="text-gray-900 text-lg" />
//             <div
//               className=" absolute -top-2 left-2 
//              w-4 h-4 rounded-full bg-red-500 flex justify-center items-center"
//             >
//               <span className="text-[10px] text-white">0</span>
//             </div>
//           </div>

//           <ModeToggle />

//           <div className="relative group">
//             {/* Profile Circle */}
//             <div
//               className="w-9 h-9 rounded-full bg-yellow-500 text-white
//                flex items-center justify-center font-semibold text-sm cursor-pointer
//                 hover:opacity-90 transition"
//               aria-label="User profile"
//             >
//               PM
//             </div>

//             {/* Dropdown Menu */}
//             <div
//               className="absolute -right-6   w-28 bg-white 
//             border border-gray-200 rounded-md shadow-lg opacity-0 
//             group-hover:opacity-100 pointer-events-none
//              group-hover:pointer-events-auto transition-opacity duration-200 z-50"
//             >
//               <ul className="py-1  text-gray-700">
//                 <li
//                   className="px-2 py-2 hover:bg-gray-100 cursor-pointer  flex items-center
//                 gap-1"
//                 >
//                   <LuUserRound className=" text-base" />
//                   <span className="text-sm"> My Profile</span>
//                 </li>

//                 <li
//                   className="px-2 py-2 hover:bg-gray-100 cursor-pointer text-sm
//                 flex items-center gap-1"
//                 >
//                   <IoMdLogOut className="text-base" />
//                   <span className="text-sm"> Logout</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Header;


// import React from "react";
// import { SidebarTrigger } from "@/components/ui/sidebar";
// import { SlBell } from "react-icons/sl";
// import { LuUserRound } from "react-icons/lu";
// import { IoMdLogOut } from "react-icons/io";
// import { ModeToggle } from "@/components/mode-toggle";
// import { useNavigate } from "react-router-dom";
// import { ROUTES } from "@/utils";

// const Header = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // 1. Clear login state
//     localStorage.removeItem("isLoggedIn");

//     // 2. Navigate to login page
//     navigate(ROUTES.AUTH);
//   };

//   return (
//     <div className="flex justify-between items-center gap-4 h-14 bg-white w-full p-4">
//       <div className="flex items-center gap-3">
//         <SidebarTrigger />
//         <span className="text-lg font-medium">Dashboard ATS</span>
//       </div>

//       <div className="flex items-center gap-4 px-4">
//         {/* Notification Bell */}
//         <div className="relative">
//           <SlBell className="text-gray-900 text-lg" />
//           <div className="absolute -top-2 left-2 w-4 h-4 rounded-full bg-red-500 flex justify-center items-center">
//             <span className="text-[10px] text-white">0</span>
//           </div>
//         </div>

//         <ModeToggle />

//         <div className="relative group">
//           {/* Profile */}
//           <div
//             className="w-9 h-9 rounded-full bg-yellow-500 text-white flex items-center justify-center font-semibold text-sm cursor-pointer hover:opacity-90 transition"
//             aria-label="User profile"
//           >
//             PM
//           </div>

//           {/* Dropdown Menu */}
//           <div className="absolute -right-6 w-28 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50">
//             <ul className="py-1 text-gray-700">
//               <li className="px-2 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-1">
//                 <LuUserRound className="text-base" />
//                 <span className="text-sm">My Profile</span>
//               </li>

//               <li
//                 onClick={handleLogout}
//                 className="px-2 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-1"
//               >
//                 <IoMdLogOut className="text-base" />
//                 <span className="text-sm">Logout</span>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;


// 3333333333333333


import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SlBell } from "react-icons/sl";
import { LuUserRound } from "react-icons/lu";
import { IoMdLogOut } from "react-icons/io";
import { ModeToggle } from "@/components/mode-toggle"; // Toggle Button
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/utils";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate(ROUTES.AUTH);
  };

  return (
    <div className="flex justify-between items-center gap-4 h-14 bg-white dark:bg-zinc-900 w-full p-4 border-b dark:border-zinc-800">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <span className="text-lg font-medium text-black dark:text-white">
          Dashboard ATS
        </span>
      </div>

      <div className="flex items-center gap-4 px-4">
        {/* Notification Bell */}
        <div className="relative">
          <SlBell className="text-gray-900 dark:text-gray-100 text-lg" />
          <div className="absolute -top-2 left-2 w-4 h-4 rounded-full bg-red-500 flex justify-center items-center">
            <span className="text-[10px] text-white">0</span>
          </div>
        </div>

        {/* Mode Toggle (Dark/Light) */}
        <ModeToggle />

        {/* Profile Dropdown */}
        <div className="relative group">
          <div
            className="w-9 h-9 rounded-full bg-yellow-500 text-white flex items-center justify-center font-semibold text-sm cursor-pointer hover:opacity-90 transition"
            aria-label="User profile"
          >
            PM
          </div>

          <div className="absolute -right-6 w-28 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50">
            <ul className="py-1 text-gray-700 dark:text-gray-100">
              <li className="px-2 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer flex items-center gap-1">
                <LuUserRound className="text-base" />
                <span className="text-sm">My Profile</span>
              </li>

              <li
                onClick={handleLogout}
                className="px-2 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer flex items-center gap-1"
              >
                <IoMdLogOut className="text-base" />
                <span className="text-sm">Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
