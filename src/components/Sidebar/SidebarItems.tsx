import {
  LayoutDashboard,
  BookOpen,
  UserCog,
  CircleHelp,
  FileText,
} from "lucide-react";
import { TSidebarItem } from "../../interfaces";

export const adminMenuItem: TSidebarItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    name: "User Management",
    path: "/dashboard/admin/users",
    icon: UserCog,
  },
  {
    name: "Lesson Management",
    path: "/dashboard/admin/lessons",
    icon: BookOpen,
  },

  {
    name: "Vocabulary Management",
    path: "/dashboard/admin/vocabulary",
    icon: CircleHelp,
  },
  {
    name: "Tutorial Management",
    path: "/dashboard/admin/tutorials",
    icon: FileText,
  },
];

export const userMenuItem: TSidebarItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard/user",
    icon: LayoutDashboard,
  },
  {
    name: "Lessons",
    path: "/dashboard/user/lessons",
    icon: BookOpen,
  },
  {
    name: "Tutorials",
    path: "/dashboard/user/tutorials",
    icon: FileText,
  },
  // {
  //   name: "Vocabularies",
  //   path: "/dashboard/user/vocabularies",
  //   icon: FileText,
  // },
  {
    name: "Help",
    path: "/dashboard/user/help",
    icon: CircleHelp,
  },
];
