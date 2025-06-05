import React, { useState } from "react";
import { FiSearch, FiFilter, FiMenu, FiX } from "react-icons/fi";

const Header = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // aap yahan search action kar sakte ho
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-200 shadow-md px-4 py-3 flex items-center justify-between w-full h-16">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-md hover:bg-gray-300"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <FiMenu className="w-6 h-6" />
      </button>

      {/* Title */}
      <div className="text-xl font-semibold text-gray-800 flex-1 text-center md:text-left md:flex-none">
        ATS Header
      </div>

      {/* Desktop Search & Controls */}
      <div className="hidden md:flex items-center gap-3 flex-1 justify-end max-w-2xl">
        {/* Search bar */}
        <div className="flex bg-gray-100 rounded-md shadow-inner overflow-hidden flex-grow">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="flex-grow px-3 py-2 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-sm"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            aria-label="Search input"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-3 hover:bg-blue-700 transition-colors flex items-center justify-center"
            aria-label="Search"
          >
            <FiSearch className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Button */}
        <button
          className="flex items-center gap-1 bg-gray-300 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-400 transition text-sm"
          onClick={() => console.log("Filter clicked")}
          aria-label="Filter"
        >
          <FiFilter className="w-5 h-5" />
          <span className="hidden sm:inline">Filter</span>
        </button>

        {/* Profile Circle */}
        <div
          className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm cursor-pointer hover:opacity-90 transition"
          aria-label="User profile"
        >
          PM
        </div>
      </div>

      {/* Mobile Search Button & Input */}
      <div className="md:hidden flex items-center space-x-2">
        {!showMobileSearch && (
          <button
            onClick={() => setShowMobileSearch(true)}
            aria-label="Open search"
            className="p-2 rounded-md hover:bg-gray-300"
          >
            <FiSearch className="w-6 h-6" />
          </button>
        )}

        {showMobileSearch && (
          <div className="flex items-center bg-gray-100 rounded-md shadow-inner overflow-hidden flex-grow max-w-xs">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="flex-grow px-3 py-2 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                  setShowMobileSearch(false);
                }
                if (e.key === "Escape") {
                  setShowMobileSearch(false);
                }
              }}
              autoFocus
              aria-label="Mobile search input"
            />
            <button
              onClick={() => {
                handleSearch();
                setShowMobileSearch(false);
              }}
              className="bg-blue-600 text-white px-3 hover:bg-blue-700 transition-colors flex items-center justify-center"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowMobileSearch(false)}
              className="p-2 text-gray-600 hover:text-gray-900"
              aria-label="Close search"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
