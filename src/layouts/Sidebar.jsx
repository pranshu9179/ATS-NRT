import React, { Children, useState } from "react";
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { FiMenu } from "react-icons/fi";
import { Calendar, Home, Inbox, Search, Settings, User } from "lucide-react";
import NavBar from "./NavBar";
import { FiUsers } from "react-icons/fi";
import DashboardHome from "@/pages/dashboard/DashboardHome";
import { Link, Route } from "react-router-dom";
import { ROUTES } from "@/utils";
import { MdOutlineFeedback } from "react-icons/md";
import { Outlet } from "react-router-dom";

const Sidebar = () => {
  const items = [
    { title: "Dashbord", url: ROUTES?.DASHBOARD, icon: Home },
    { title: "User Management", url: ROUTES?.USER, icon: User },
    { title: "Feedback", url: "#", icon: MdOutlineFeedback },
    { title: "Calendar", url: "#", icon: Calendar },
    { title: "Search", url: "#", icon: Search },
    { title: "Settings", url: "#", icon: Settings },
  ];

  return (
    <ShadcnSidebar className="w-64 h-screen border-r shadow bg-white py-4">
      <SidebarContent>
        <SidebarGroup className="space-y-2 bg-white h-full ">
          <div className="flex flex-col justify-center items-center">
            <FiUsers className="text-2xl " />
            <SidebarGroupLabel
              className="text-lg font-semibold
          text-gray-950 "
            >
              Applicant Tracker
            </SidebarGroupLabel>
          </div>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center space-x-2">
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
    <SidebarProvider className=" w-full h-screen">
      <div className="bg-white">
        <Sidebar />
      </div>

      <div className=" w-full bg-gray-100">
        <div className="sticky top-0 shadow">
          <NavBar />
        </div>
        <div className="bg-white h-screen overflow-y-auto p-8 m-2">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SidebarWrapper;
