// // App.jsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AuthLayout from "./layouts/AuthLayout";
// import { ROUTES } from "./utils";
// import DashboardHome from "./pages/dashboard/DashboardHome";
// import SidebarWrapper from "./layouts/Sidebar";


// export default function App() {
//   return (
//     <Routes>
//       <Route exact path={ROUTES?.AUTH} element={<AuthLayout />} />
//       <Route exact path={ROUTES?.DASHBOARD} element={<DashboardHome />} />
//       <Route exact path={ROUTES?.SIDEBAR} element={<SidebarWrapper/>} />
//     </Routes>
//   );
// }

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import { ROUTES } from "./utils";
import DashboardHome from "./pages/dashboard/DashboardHome";
import SidebarWrapper from "./layouts/Sidebar";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(false);
//comment
  return (
      <Routes>
        <Route path={ROUTES.AUTH + "/*"} element={<AuthLayout />} />
        <Route path={ROUTES.DASHBOARD} element={<DashboardHome />} />
        <Route path={ROUTES.SIDEBAR} element={<SidebarWrapper />} />
      </Routes>
  );
}

export default App;
