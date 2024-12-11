import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { adminMenuItem, userMenuItem } from "./SidebarItems";
import { TSidebarItem } from "../../interfaces";
import DynamicMenus from "./DynamicMenus";

const Sidebar = () => {
  const [menuItems, setMenuItems] = useState<TSidebarItem[]>([]);

  const user: string = "user";
  // const user: string = "admin";

  useEffect(() => {
    if (user === "admin") {
      setMenuItems(adminMenuItem);
    } else {
      setMenuItems(userMenuItem);
    }
  }, [user]);

  return (
    <div className="bg-black text-white  border-r h-screen">
      <div className="flex items-center justify-center h-16 border-b">
        <Link className="text-2xl font-bold " to="/">
          Bike Rent
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="mt-5 px-2">
          <DynamicMenus menuItems={menuItems} />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
