import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { Users } from "lucide-react";
import { FaRegClock } from "react-icons/fa";
import { ClipboardList } from "lucide-react";

const DashboardHome = () => {
  return (
    <>
      <div className=" space-y-5">
        <h1 className="text-lg font-medium">Welcome back, Admin 👋</h1>
        {/* Summaray card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          <div
            className="border border-black/10 p-4
          flex flex-col justify-center items-center rounded-sm hover:scale-105 duration-300"
          >
            <div
              className=" bg-purple-100 w-12 h-12 rounded-full
           flex justify-center items-center gap-2"
            >
              <FaUserPlus className="text-lg text-purple-700" />
            </div>
            <span className="font-medium text-lg">20</span>
            <span className=" text-sm"> Open Positions</span>
          </div>

          <div
            className="border border-black/10 p-4
          flex flex-col justify-center items-center rounded-sm hover:scale-105 duration-300"
          >
            <div
              className=" bg-pink-100 w-12 h-12 rounded-full
           flex justify-center items-center gap-2"
            >
              <Users className="text-sm text-pink-700" />
            </div>
            <span className="font-medium text-lg">18</span>
            <span className=" text-sm"> New Applicants</span>
          </div>

          <div
            className="border border-black/10 p-4
          flex flex-col justify-center items-center rounded-sm hover:scale-105 duration-300"
          >
            <div
              className=" bg-green-100 w-12 h-12 rounded-full
           flex justify-center items-center gap-2"
            >
              <FaRegClock className="text-lg text-green-700" />
            </div>
            <span className="font-medium text-lg">20</span>
            <span className=" text-sm"> Interviews Scheduled</span>
          </div>

          <div
            className="border border-black/10 p-4
          flex flex-col justify-center items-center rounded-sm hover:scale-105 duration-300"
          >
            <div
              className=" bg-teal-100 w-12 h-12 rounded-full
           flex justify-center items-center gap-2"
            >
              <ClipboardList className="text-lg text-teal-700" />
            </div>
            <span className="font-medium text-lg">20</span>
            <span className=" text-sm">Total Jobs</span>
          </div>
        </div>
        {/* Upcoming Intervoiews */}
        <div className="bg-white ">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Upcoming Interviews
          </h2>
          <div className="grid grid-cols-4 gap-2">
            <div
              className=" border border-cyan-500/40
             px-4 py-4
           rounded-sm space-y-2"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full">
                  <img
                    className="w-full h-full rounded-full"
                    src="https://img.freepik.com/free-photo/horizontal-portrait-smiling-happy-young-pleasant-looking-female-wears-denim-shirt-stylish-glasses-with-straight-blonde-hair-expresses-positiveness-poses_176420-13176.jpg?semt=ais_hybrid&w=740"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-800">Tanvii Vermaa</span>
                  <apn className="text-sm text-gray-900 font-medium">
                    Full Stack Develper
                  </apn>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Interview: 10:00 AM, June 10
              </p>
            </div>
            <div
              className=" border border-pink-500/40
             px-4 py-4
           rounded-sm space-y-2"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full">
                  <img
                    className="w-full h-full rounded-full"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-800">Ravi Patel</span>
                  <apn className="text-sm text-gray-900 font-medium">
                    Full Stack Develper
                  </apn>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Interview: 10:00 AM, June 10
              </p>
            </div>
            <div
              className=" border border-cyan-500/40
             px-4 py-4
           rounded-sm space-y-2"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full">
                  <img
                    className="w-full h-full rounded-full"
                    src="https://d2gwgwt9a7yxle.cloudfront.net/what_is_user_id_in_net_banking_mobile_871b681e52.jpg"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-800">Ragav Vermaa</span>
                  <apn className="text-sm text-gray-900 font-medium">
                    Backend Develper
                  </apn>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Interview: 10:00 AM, June 10
              </p>
            </div>
            <div
              className=" border border-pink-500/40
             px-4 py-4
           rounded-sm space-y-2"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full">
                  <img
                    className="w-full h-full rounded-full"
                    src="https://img.freepik.com/free-photo/smiley-businesswoman-using-smartphone-credit-card-outdoors_23-2148767012.jpg?semt=ais_hybrid&w=740"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-800">Anvi Vermaa</span>
                  <apn className="text-sm text-gray-900 font-medium">
                    Frontend Develper
                  </apn>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Interview: 10:00 AM, June 10
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;

// import React from "react";

// const DashboardHome = () => {
//   return (
//     <div className="space-y-6">
//       {/* Welcome Message */}
//       <h1 className="text-2xl font-bold text-gray-800">Welcome back, Admin 👋</h1>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-blue-100 rounded-xl shadow p-4">
//           <h2 className="text-blue-700 font-bold text-2xl">Total Jobs</h2>
//           <p className="text-2xl font-bold text-indigo-900">24</p>
//         </div>
//         <div className="bg-blue-100 rounded-xl shadow p-4">
//           <h2 className="text-blue-700 font-bold text-2xl">Applications</h2>
//           <p className="text-2xl font-bold text-indigo-900">320</p>
//         </div>
//         <div className="bg-blue-100 rounded-xl shadow p-4">
//           <h2 className="text-gray-500 text-sm">Interviews Today</h2>
//           <p className="text-2xl font-bold text-indigo-600">6</p>
//         </div>
//         <div className="bg-white rounded-xl shadow p-4">
//           <h2 className="text-gray-500 text-sm">New Hires</h2>
//           <p className="text-2xl font-bold text-indigo-600">5</p>
//         </div>
//       </div>

//       {/* Upcoming Interviews */}
//       <div className="bg-white rounded-xl shadow p-4">
//         <h2 className="text-lg font-semibold mb-4 text-gray-800">Upcoming Interviews</h2>
//         <ul className="space-y-2">
//           <li className="flex justify-between text-sm text-gray-700">
//             <span>John Doe - Frontend Developer</span>
//             <span>10:00 AM</span>
//           </li>
//           <li className="flex justify-between text-sm text-gray-700">
//             <span>Jane Smith - Backend Developer</span>
//             <span>11:30 AM</span>
//           </li>
//           <li className="flex justify-between text-sm text-gray-700">
//             <span>Ravi Patel - UI/UX Designer</span>
//             <span>2:00 PM</span>
//           </li>
//         </ul>
//       </div>

//       {/* Recent Applications */}
//       <div className="bg-white rounded-xl shadow p-4">
//         <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Applications</h2>
//         <table className="w-full text-sm text-gray-700">
//           <thead>
//             <tr className="border-b text-left">
//               <th className="py-2">Name</th>
//               <th className="py-2">Position</th>
//               <th className="py-2">Date</th>
//               <th className="py-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="py-2">Amit Kumar</td>
//               <td className="py-2">Full Stack Dev</td>
//               <td className="py-2">May 27</td>
//               <td className="py-2 text-green-600 font-medium">Shortlisted</td>
//             </tr>
//             <tr>
//               <td className="py-2">Sarah Ali</td>
//               <td className="py-2">QA Engineer</td>
//               <td className="py-2">May 26</td>
//               <td className="py-2 text-yellow-600 font-medium">Under Review</td>
//             </tr>
//             <tr>
//               <td className="py-2">Rohit Jain</td>
//               <td className="py-2">DevOps Engineer</td>
//               <td className="py-2">May 25</td>
//               <td className="py-2 text-red-600 font-medium">Rejected</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DashboardHome;

// // const DashboardHome = () => <h2 className="text-xl font-bold">Welcome to the Dashboard</h2>;
// // export default DashboardHome;
