import { DashboardNav } from "@/components/Common/DashboardNav";
import Sidebar from "@/components/Sidebar/Sidebar";

// import { MoveRight, Undo2 } from "lucide-react";
import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  return (
    <div className="flex">
      <div className="w-1/5  ">
        <Sidebar />
      </div>
      <div className="w-4/5  ">
        <DashboardNav />

        <div className="p-4 bg-gray-100 h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
