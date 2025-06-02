import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full fixed left-0 bottom-0 bg-gray-200 shadow-lg text-gray-800 px-4 py-4 z-20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-2">
        
        {/* Left: Branding */}
        <div className="flex items-center gap-1 font-semibold">
          <span>2025 ©</span>
          <Link to="/" className="hover:text-blue-500 transition-colors">
            NRT
          </Link>
        </div>

        {/* Right: Navigation Links */}
        <div className="flex flex-wrap gap-3 sm:gap-5 justify-center sm:justify-end font-semibold">
          <Link to="/docs" className="hover:text-blue-500 transition-colors">
            Docs
          </Link>
          <Link to="/purchase" className="hover:text-blue-500 transition-colors">
            Purchase
          </Link>
          <Link to="/faq" className="hover:text-blue-500 transition-colors">
            FAQ
          </Link>
          <Link to="/support" className="hover:text-blue-500 transition-colors">
            Support
          </Link>
          <Link to="/license" className="hover:text-blue-500 transition-colors">
            License
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
