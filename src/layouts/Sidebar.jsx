import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen, isAdmin }) => {
  const location = useLocation();
  const activePage = location.pathname;

  const navItems = [
    { name: "Dashboard", path: "/dashboard", isAdmin: false },
    { name: "Jobs", path: "/jobs", isAdmin: false },
    { name: "Candidates", path: "/candidates", isAdmin: false },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r shadow-lg transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:z-0
        `}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
            className="text-gray-700 text-2xl"
          >
            <FiX />
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Navigation</h2>
          <nav>
            <ul className="space-y-2">
              {navItems.map((item) => {
                if (item.isAdmin && !isAdmin) return null;

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        activePage === item.path
                          ? "bg-indigo-100 text-indigo-700"
                          : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

// Parent component jahan sidebar toggle state handle hota hai
const SidebarWrapper = ({ isAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Toggle button for mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-4 md:hidden fixed top-2 left-2 z-50 bg-indigo-600 text-white rounded-md"
        aria-label="Open sidebar"
      >
        <FiMenu size={24} />
      </button>

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} isAdmin={isAdmin} />

      {/* Main content area */}
      <main className="flex-1 p-6 md:ml-64">
        <h1 className="text-3xl font-bold">Main Content Here</h1>
        <p>Page content goes here...</p>
      </main>
    </div>
  );
};

export default SidebarWrapper;
