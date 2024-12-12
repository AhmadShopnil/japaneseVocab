import { useState, useRef, useEffect } from "react";
import { DashboardNav } from "@/components/Common/DashboardNav";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { MoveLeft, MoveRight } from "lucide-react";

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Close sidebar if click happens outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false); // Close the sidebar when clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex ">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300 fixed top-0 left-0 h-full bg-gray-800 z-50
         overflow-hidden lg:w-64`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 ml-0 transition-all duration-300 ">
        <DashboardNav />

        {/* Toggle Button */}
        <button onClick={toggleSidebar} className="lg:hidden p-4 ">
          {isSidebarOpen ? <MoveLeft size={22} /> : <MoveRight size={22} />}{" "}
        </button>

        <div className="p-4  h-full ml-0 lg:ml-64 transition-all duration-300">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
