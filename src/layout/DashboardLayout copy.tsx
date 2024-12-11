"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "@/components/Sidebar/DashboardSidebar";

export function DashboardLayout() {
  return (
    <div className="h-screen">
      <SidebarProvider>
        <div className="flex h-full">
          {/* Sidebar */}
          <DashboardSidebar />

          {/* Main Content */}
          <SidebarInset className="flex-1 flex flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
              <SidebarTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Sidebar</span>
                </Button>
              </SidebarTrigger>
            </header>
            <main className="flex-1 overflow-y-auto p-6 bg-green-500">
              <div className="">
                <Outlet />
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
