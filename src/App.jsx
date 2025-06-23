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
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import { ROUTES } from "./utils";
import DashboardHome from "./pages/dashboard/DashboardHome";
import SidebarWrapper from "./layouts/Sidebar";
import Candidate from "./pages/candidatesManagement/CandidateList";
import User from "./pages/userManagement/User";
import JobList from "./pages/jobManagement/JobList";
import NotFound from "./pages/notFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoutes";
import Permission from "./pages/roles&permissionManagement/Permissions";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(false);
//comment
  return (
    <Routes>
      {/* Public Auth Route */}

      <Route
        path={ROUTES?.AUTH + "/*"}
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      />
      {/* ✅ Protected Routes */}
      <Route
        path={ROUTES?.DASHBOARD}
        element={
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES?.CANDIDATE_MANAGEMENT}
        element={
          <ProtectedRoute>
            <Candidate />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES?.USER_MANAGEMENT}
        element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES?.JOB_MANAGEMENT}
        element={
          <ProtectedRoute>
            <JobList />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES?.SIDEBAR}
        element={
          <ProtectedRoute>
            <SidebarWrapper />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES?.PERMISSIONS}
        element={
          <ProtectedRoute>
            <Permission />
          </ProtectedRoute>
        }
      />

      {/* Optional: Not Found Page (not protected) */}
      <Route path={ROUTES?.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}

export default App;
