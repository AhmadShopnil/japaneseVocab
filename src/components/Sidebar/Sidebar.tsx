import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { adminMenuItem, userMenuItem } from "./SidebarItems";
import { TSidebarItem } from "../../interfaces";
import DynamicMenus from "./DynamicMenus";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/api/slices/authSlice";

const Sidebar = () => {
  const [menuItems, setMenuItems] = useState<TSidebarItem[]>([]);
  // get user info from redux store
  const user = useAppSelector(selectCurrentUser);
  const role = user?.role;

  console.log(role);

  useEffect(() => {
    if (role === "admin") {
      setMenuItems(adminMenuItem);
    } else {
      setMenuItems(userMenuItem);
    }
  }, [user, role]);

  return (
    <div className="bg-black text-white  border-r h-full">
      <div className="flex items-center justify-center h-14 border-b">
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
