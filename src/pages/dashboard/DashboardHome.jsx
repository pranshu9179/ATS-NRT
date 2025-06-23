// import Header from "@/layouts/NavBar";
// import SidebarWrapper from "@/layouts/Sidebar";
// import React from "react";
// import { FaUserPlus } from "react-icons/fa";
// import { Users } from "lucide-react";
// import { FaRegClock } from "react-icons/fa";
// import { ClipboardList } from "lucide-react";
// import NavBar from "@/layouts/NavBar";

// const DashboardHome = () => {
//   return (
//     <>
//       <SidebarWrapper>
//         <div className=" space-y-5 ">
//           <h1 className="text-lg font-medium">Welcome back, Admin 👋</h1>
//           {/* Summaray card */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
//             <div
//               className="border border-black/10 p-4
//           flex flex-col justify-center items-center rounded-sm hover:scale-105 duration-300"
//             >
//               <div
//                 className=" bg-purple-100 w-12 h-12 rounded-full
//            flex justify-center items-center gap-2"
//               >
//                 <FaUserPlus className="text-lg text-purple-700" />
//               </div>
//               <span className="font-medium text-lg">20</span>
//               <span className=" text-sm"> Open Positions</span>
//             </div>

//             <div
//               className="border border-black/10 p-4
//           flex flex-col justify-center items-center rounded-sm hover:scale-105 duration-300"
//             >
//               <div
//                 className=" bg-pink-100 w-12 h-12 rounded-full
//            flex justify-center items-center gap-2"
//               >
//                 <Users className="text-sm text-pink-700" />
//               </div>
//               <span className="font-medium text-lg">18</span>
//               <span className=" text-sm"> New Applicants</span>
//             </div>

//             <div
//               className="border border-black/10 p-4
//           flex flex-col justify-center items-center rounded-sm hover:scale-105 duration-300"
//             >
//               <div
//                 className=" bg-green-100 w-12 h-12 rounded-full
//            flex justify-center items-center gap-2"
//               >
//                 <FaRegClock className="text-lg text-green-700" />
//               </div>
//               <span className="font-medium text-lg">20</span>
//               <span className=" text-sm"> Interviews Scheduled</span>
//             </div>

//             <div
//               className="border border-black/10 p-4
//           flex flex-col justify-center items-center rounded-sm hover:scale-105 duration-300"
//             >
//               <div
//                 className=" bg-teal-100 w-12 h-12 rounded-full
//            flex justify-center items-center gap-2"
//               >
//                 <ClipboardList className="text-lg text-teal-700" />
//               </div>
//               <span className="font-medium text-lg">20</span>
//               <span className=" text-sm">Total Jobs</span>
//             </div>
//           </div>
//           {/* Upcoming Intervoiews */}
//           <div className="bg-white ">
//             <h2 className="text-lg font-semibold mb-4 text-gray-800">
//               Upcoming Interviews
//             </h2>
//             <div className="grid grid-cols-4 gap-2">
//               <div
//                 className=" border border-cyan-500/40
//              px-4 py-4
//            rounded-sm space-y-2"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full">
//                     <img
//                       className="w-full h-full rounded-full"
//                       src="https://img.freepik.com/free-photo/horizontal-portrait-smiling-happy-young-pleasant-looking-female-wears-denim-shirt-stylish-glasses-with-straight-blonde-hair-expresses-positiveness-poses_176420-13176.jpg?semt=ais_hybrid&w=740"
//                     />
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="text-sm text-gray-800">Tanvi Verma</span>
//                     <span className="text-sm text-gray-900 font-medium">
//                       Full Stack Developer
//                     </span>
//                   </div>
//                 </div>
//                 <p className="text-xs text-gray-500">
//                   Interview: 10:00 AM, June 10
//                 </p>
//               </div>
//               <div
//                 className=" border border-pink-500/40
//              px-4 py-4
//            rounded-sm space-y-2"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full">
//                     <img
//                       className="w-full h-full rounded-full"
//                       src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
//                     />
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="text-sm text-gray-800">Ravi Patel</span>
//                     <span className="text-sm text-gray-900 font-medium">
//                       Full Stack Develper
//                     </span>
//                   </div>
//                 </div>
//                 <p className="text-xs text-gray-500">
//                   Interview: 10:00 AM, June 10
//                 </p>
//               </div>
//               <div
//                 className=" border border-cyan-500/40
//              px-4 py-4
//            rounded-sm space-y-2"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full">
//                     <img
//                       className="w-full h-full rounded-full"
//                       src="https://d2gwgwt9a7yxle.cloudfront.net/what_is_user_id_in_net_banking_mobile_871b681e52.jpg"
//                     />
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="text-sm text-gray-800">Ragav Vermaa</span>
//                     <span className="text-sm text-gray-900 font-medium">
//                       Backend Develper
//                     </span>
//                   </div>
//                 </div>
//                 <p className="text-xs text-gray-500">
//                   Interview: 10:00 AM, June 10
//                 </p>
//               </div>
//               <div
//                 className=" border border-pink-500/40
//              px-4 py-4
//            rounded-sm space-y-2"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full">
//                     <img
//                       className="w-full h-full rounded-full"
//                       src="https://img.freepik.com/free-photo/smiley-businesswoman-using-smartphone-credit-card-outdoors_23-2148767012.jpg?semt=ais_hybrid&w=740"
//                     />
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="text-sm text-gray-800">Anvi Verma</span>
//                     <span className="text-sm text-gray-900 font-medium">
//                       Frontend Developer
//                     </span>
//                   </div>
//                 </div>
//                 <p className="text-xs text-gray-500">
//                   Interview: 10:00 AM, June 10
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </SidebarWrapper>
//     </>
//   );
// };

// export default DashboardHome;





// 2222222
import Header from "@/layouts/NavBar";
import SidebarWrapper from "@/layouts/Sidebar";
import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { Users } from "lucide-react";
import { FaRegClock } from "react-icons/fa";
import { ClipboardList } from "lucide-react";

const DashboardHome = () => {
  return (
    <>
      <SidebarWrapper>
        <div className="space-y-5">
          <h1 className="text-lg font-medium text-gray-900 dark:text-white">
            Welcome back, Admin 👋
          </h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {[
              {
                icon: <FaUserPlus className="text-lg text-purple-700" />,
                bg: "bg-purple-100",
                count: "20",
                label: "Open Positions",
              },
              {
                icon: <Users className="text-sm text-pink-700" />,
                bg: "bg-pink-100",
                count: "18",
                label: "New Applicants",
              },
              {
                icon: <FaRegClock className="text-lg text-green-700" />,
                bg: "bg-green-100",
                count: "20",
                label: "Interviews Scheduled",
              },
              {
                icon: <ClipboardList className="text-lg text-teal-700" />,
                bg: "bg-teal-100",
                count: "20",
                label: "Total Jobs",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="border border-black/10 dark:border-white/10 dark:bg-zinc-900 p-4 flex flex-col justify-center items-center rounded-sm hover:scale-105 duration-300"
              >
                <div className={`w-12 h-12 rounded-full flex justify-center items-center ${item.bg}`}>
                  {item.icon}
                </div>
                <span className="font-medium text-lg text-gray-900 dark:text-white">
                  {item.count}
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Upcoming Interviews */}
          <div className="bg-white dark:bg-zinc-900 rounded p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Upcoming Interviews
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {[
                {
                  name: "Tanvi Verma",
                  title: "Full Stack Developer",
                  time: "10:00 AM, June 10",
                  img: "https://img.freepik.com/free-photo/horizontal-portrait-smiling-happy-young-pleasant-looking-female-wears-denim-shirt-stylish-glasses-with-straight-blonde-hair-expresses-positiveness-poses_176420-13176.jpg?semt=ais_hybrid&w=740",
                  border: "border-cyan-500/40",
                },
                {
                  name: "Ravi Patel",
                  title: "Full Stack Developer",
                  time: "10:00 AM, June 10",
                  img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000",
                  border: "border-pink-500/40",
                },
                {
                  name: "Ragav Vermaa",
                  title: "Backend Developer",
                  time: "10:00 AM, June 10",
                  img: "https://d2gwgwt9a7yxle.cloudfront.net/what_is_user_id_in_net_banking_mobile_871b681e52.jpg",
                  border: "border-cyan-500/40",
                },
                {
                  name: "Anvi Verma",
                  title: "Frontend Developer",
                  time: "10:00 AM, June 10",
                  img: "https://img.freepik.com/free-photo/smiley-businesswoman-using-smartphone-credit-card-outdoors_23-2148767012.jpg?semt=ais_hybrid&w=740",
                  border: "border-pink-500/40",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`border ${item.border} dark:border-white/10 px-4 py-4 rounded-sm space-y-2 bg-white dark:bg-zinc-800`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={item.img}
                        alt={item.name}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-800 dark:text-white">
                        {item.name}
                      </span>
                      <span className="text-sm text-gray-900 font-medium dark:text-gray-300">
                        {item.title}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Interview: {item.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SidebarWrapper>
    </>
  );
};

export default DashboardHome;
