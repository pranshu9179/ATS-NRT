import Header from "@/layouts/Header";
import SidebarWrapper from "@/layouts/Sidebar";
import React from "react";

const DashboardHome = () => {
  return (
    <>
      <Header />
      <SidebarWrapper />
      <div className="space-y-6 mt-8">
        {/* Welcome Message */}
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, Admin 👋
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-100 rounded-xl shadow p-4">
            <h2 className="text-blue-700 font-bold text-2xl">Total Jobs</h2>
            <p className="text-2xl font-bold text-indigo-900">24</p>
          </div>
          <div className="bg-blue-100 rounded-xl shadow p-4">
            <h2 className="text-blue-700 font-bold text-2xl">Applications</h2>
            <p className="text-2xl font-bold text-indigo-900">320</p>
          </div>
          <div className="bg-blue-100 rounded-xl shadow p-4">
            <h2 className="text-gray-500 text-sm">Interviews Today</h2>
            <p className="text-2xl font-bold text-indigo-600">6</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-gray-500 text-sm">New Hires</h2>
            <p className="text-2xl font-bold text-indigo-600">5</p>
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Upcoming Interviews
          </h2>
          <ul className="space-y-2">
            <li className="flex justify-between text-sm text-gray-700">
              <span>John Doe - Frontend Developer</span>
              <span>10:00 AM</span>
            </li>
            <li className="flex justify-between text-sm text-gray-700">
              <span>Jane Smith - Backend Developer</span>
              <span>11:30 AM</span>
            </li>
            <li className="flex justify-between text-sm text-gray-700">
              <span>Ravi Patel - UI/UX Designer</span>
              <span>2:00 PM</span>
            </li>
          </ul>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Recent Applications
          </h2>
          <table className="w-full text-sm text-gray-700">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Name</th>
                <th className="py-2">Position</th>
                <th className="py-2">Date</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">Amit Kumar</td>
                <td className="py-2">Full Stack Dev</td>
                <td className="py-2">May 27</td>
                <td className="py-2 text-green-600 font-medium">Shortlisted</td>
              </tr>
              <tr>
                <td className="py-2">Sarah Ali</td>
                <td className="py-2">QA Engineer</td>
                <td className="py-2">May 26</td>
                <td className="py-2 text-yellow-600 font-medium">
                  Under Review
                </td>
              </tr>
              <tr>
                <td className="py-2">Rohit Jain</td>
                <td className="py-2">DevOps Engineer</td>
                <td className="py-2">May 25</td>
                <td className="py-2 text-red-600 font-medium">Rejected</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;

// const DashboardHome = () => <h2 className="text-xl font-bold">Welcome to the Dashboard</h2>;
// export default DashboardHome;
