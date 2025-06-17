// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
      <h1 className="text-5xl font-bold text-gray-800">404</h1>
      <p className="text-lg text-gray-600">Page Not Found</p>
      <Link
        to="/dashboard"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
