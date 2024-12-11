// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
// } from "@/components/ui/sidebar";
// import DynamicMenus from "./DynamicMenus";
// import { TSidebarItem } from "@/interfaces";
// import { useEffect, useState } from "react";
// import { adminMenuItem, userMenuItem } from "./SidebarItems";

// export function DashboardSidebar() {
//   const [menuItems, setMenuItems] = useState<TSidebarItem[]>([]);

//   // const user: string = "user";
//   const user: string = "admin";

//   useEffect(() => {
//     if (user === "admin") {
//       setMenuItems(adminMenuItem);
//     } else {
//       setMenuItems(userMenuItem);
//     }
//   }, [user]);

//   return (
//     <Sidebar>
//       <SidebarHeader>
//         <h2 className="px-6 text-lg font-semibold tracking-tight">Dashboard</h2>
//       </SidebarHeader>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Menu</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {/* Use the DynamicMenus component */}
//               <DynamicMenus menuItems={menuItems} />
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }
