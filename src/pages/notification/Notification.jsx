// import React, { useState, useRef, useEffect } from "react";
// import { SlBell } from "react-icons/sl";
// import { PiDotOutlineFill } from "react-icons/pi";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";

// const Notification = () => {
//   const [open, setOpen] = useState(false);
//   const ref = useRef();
//   const navigate = useNavigate();

//   const notifications = [
//     {
//       id: 1,
//       title: "New Application Received",
//       time: "2 mins ago",
//       unread: true,
//     },
//     {
//       id: 2,
//       title: "Interview Scheduled",
//       time: "1 hour ago",
//       unread: false,
//     },
//     {
//       id: 3,
//       title: "Job Closed",
//       time: "Yesterday",
//       unread: true,
//     },
//     {
//       id: 4,
//       title: "Job Published",
//       time: "2 days ago",
//       unread: false,
//     },
//     {
//       id: 5,
//       title: "New User Registered",
//       time: "3 days ago",
//       unread: true,
//     },
//   ];

//   const unreadCount = notifications.filter((n) => n.unread).length;

//   // Only show first 3
//   const visibleNotifications = notifications.slice(0, 3);

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={ref}>
//       {/* Bell Icon */}
//       <div
//         onClick={() => setOpen((prev) => !prev)}
//         className="relative p-2 rounded-full hover:bg-muted transition cursor-pointer"
//         aria-label="Notifications"
//       >
//         <SlBell className="text-gray-900 dark:text-gray-100 text-lg" />
//         {unreadCount > 0 && (
//           <span className="absolute -top-1 left-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px]">
//             {unreadCount}
//           </span>
//         )}
//       </div>

//       {/* Notification Dropdown */}
//       {open && (
//         <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-900 rounded-xl shadow-xl z-50 border dark:border-zinc-700 animate-fade-in-down">
//           <div className="p-4 border-b dark:border-zinc-700">
//             <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
//               🔔 Notifications
//             </h3>
//           </div>

//           <div className="px-4 py-2 flex flex-col gap-3">
//             {visibleNotifications.map((notif) => (
//               <div
//                 key={notif.id}
//                 className={`flex items-start gap-2 p-2 rounded-md transition ${
//                   notif.unread ? "bg-muted hover:bg-muted/80" : "hover:bg-muted/60"
//                 }`}
//               >
//                 <PiDotOutlineFill
//                   size={18}
//                   className={`mt-1 ${
//                     notif.unread ? "text-blue-600" : "text-gray-400"
//                   }`}
//                 />
//                 <div className="flex flex-col">
//                   <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
//                     {notif.title}
//                   </p>
//                   <span className="text-xs text-muted-foreground">{notif.time}</span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="p-3 border-t dark:border-zinc-700 text-center">
//             <Button
//               variant="ghost"
//               size="sm"
//               className="text-blue-600 dark:text-blue-400 hover:bg-transparent text-sm"
//               onClick={() => {
//                 setOpen(false);
//                 navigate("/notifications");
//               }}
//             >
//               View All Notifications →
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Notification;





// src/pages/notification/Notification.jsx

// import React from "react";
// import { PiDotOutlineFill } from "react-icons/pi";
// import { Card } from "@/components/ui/card";

// const notifications = [
//   { id: 1, title: "New Application Received", message: "A new candidate has applied.", time: "2 mins ago" },
//   { id: 2, title: "Interview Scheduled", message: "Priya's interview scheduled.", time: "1 hour ago" },
//   { id: 3, title: "Job Closed", message: "UI/UX Designer role has been closed.", time: "Yesterday" },
//   { id: 4, title: "Job Published", message: "New Backend role published.", time: "2 days ago" },
//   { id: 5, title: "New User Registered", message: "A new user signed up.", time: "3 days ago" },
// ];

// const Notification = () => {
//   return (
//     <div className="p-6 md:p-10 space-y-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
//         🔔 All Notifications
//       </h2>

//       <div className="flex flex-col gap-4">
//         {notifications.map((notif) => (
//           <Card
//             key={notif.id}
//             className="flex items-start gap-4 p-4 border dark:border-zinc-700 hover:bg-muted/60 transition"
//           >
//             <PiDotOutlineFill className="text-blue-500 mt-1" size={18} />
//             <div className="flex-1">
//               <div className="flex justify-between items-center">
//                 <h4 className="text-base font-semibold text-gray-900 dark:text-white">
//                   {notif.title}
//                 </h4>
//                 <span className="text-xs text-muted-foreground whitespace-nowrap">
//                   {notif.time}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
//                 {notif.message}
//               </p>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Notification;



// NotificationList2.jsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const notifications = [
  { id: 1, title: "New Application Received", message: "A new candidate has applied.", time: "2 mins ago" },
  { id: 2, title: "Interview Scheduled", message: "Priya's interview scheduled.", time: "1 hour ago" },
  { id: 3, title: "Job Closed", message: "UI/UX Designer role has been closed.", time: "Yesterday" },
  { id: 4, title: "Job Published", message: "New Backend role published.", time: "2 days ago" },
  { id: 5, title: "New User Registered", message: "A new user signed up.", time: "3 days ago" },
];

const NotificationList2 = () => {
  return (
    <div className="p-6 md:p-10 space-y-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">🔔 All Notifications</h2>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <Card key={notif.id} className="bg-muted/30 rounded-xl p-4 hover:shadow-lg transition">
            <CardContent className="p-0">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{notif.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                  {notif.time}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NotificationList2;

