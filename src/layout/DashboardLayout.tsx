"use client";

import Navbar from "@/components/Common/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

// import { MoveRight, Undo2 } from "lucide-react";
import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  return (
    <div className="flex">
      <div className="w-1/5  h-full">
        <Sidebar />
      </div>
      <div className="w-4/5 bg-gray-100 ">
        <Navbar />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
