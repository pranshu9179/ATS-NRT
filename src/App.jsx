// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import { ROUTES } from "./utils";
import DashboardHome from "./pages/dashboard/DashboardHome";

export default function App() {
  return (
    <Routes>
      <Route exact path={ROUTES?.LOGIN} element={<Login />} />
      <Route exact path={ROUTES?.DASHBOARD} element={<DashboardHome />} />
    </Routes>
  );
}
