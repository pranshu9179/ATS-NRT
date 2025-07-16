import React, { useState } from "react";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { FiUsers } from "react-icons/fi";
import { Calendar, Home, Settings, User, UserCog, Users } from "lucide-react";
import NavBar from "./NavBar";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/utils";
import { MdOutlineFeedback, MdOutlineLockPerson } from "react-icons/md";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { LuSquareUserRound, LuUsersRound } from "react-icons/lu";

const Sidebar = () => {
  const location = useLocation();

  const items = [
    {
      title: "Dashboard",
      url: ROUTES?.DASHBOARD,
      icon: Home,
    },
    {
      title: "User Management",
      url: ROUTES?.USER_MANAGEMENT,
      icon: LuUsersRound,
    },
    {
      title: "Roles",
      url: ROUTES.ROLES,
      icon: UserCog,
    },
    {
      title: "Permission",
      url: ROUTES.PERMISSION,
      icon: MdOutlineLockPerson,
    },
    {
      title: "Candidate Management",
      url: ROUTES?.CANDIDATE_MANAGEMENT,
      icon: LuSquareUserRound,
    },
    {
      title: "Job Management",
      url: ROUTES?.JOB_MANAGEMENT,
      icon: MdOutlineFeedback,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    { title: "Feedback", url: ROUTES?.Feedback, icon :User},

  ];

  return (
    <ShadcnSidebar className="w-64 h-screen border-r shadow bg-white dark:bg-zinc-900 dark:border-white/10 py-4">
      <SidebarContent>
        <SidebarGroup className="space-y-2 h-full bg-white dark:bg-zinc-900">
          <div className="flex flex-col justify-center items-center">
            <FiUsers className="text-2xl text-gray-800 dark:text-white" />
            <SidebarGroupLabel className="text-lg font-semibold text-gray-950 dark:text-white">
              Applicant Tracker
            </SidebarGroupLabel>
          </div>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className={`flex items-center space-x-2 px-3 py-2 rounded ${
                        location.pathname === item.url
                          ? "text-blue-600 font-semibold bg-gray-200 dark:bg-zinc-800"
                          : "text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </ShadcnSidebar>
  );
};

const SidebarWrapper = ({ children }) => {
  return (
    <SidebarProvider className="w-full h-screen flex bg-gray-100 dark:bg-zinc-950 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <div className="bg-white dark:bg-zinc-900">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col bg-gray-100 dark:bg-zinc-950">
        {/* Top Nav */}
        <div className="sticky top-0 shadow bg-white dark:bg-zinc-900 z-50">
          <NavBar />
        </div>

        {/* Page Content */}
        <div className="bg-white dark:bg-zinc-900 h-screen overflow-y-auto p-8 m-2 rounded shadow">
          {children}
        </div>

        {/* Footer */}
        <div className="bg-white dark:bg-zinc-900">
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SidebarWrapper;
