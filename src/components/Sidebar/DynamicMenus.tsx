import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { TSidebarItem } from "../../interfaces"; // Assuming you have an interface defined

const DynamicMenus = ({ menuItems }: { menuItems: TSidebarItem[] }) => {
  const location = useLocation();
  const [activePath, setActivePath] = useState<string>(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const handleClick = (path: string) => {
    setActivePath(path);
  };

  return (
    <ul className="space-y-2">
      {menuItems.map((item, index) => {
        const isActive = activePath === item.path;

        return (
          <li key={index}>
            <Link
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out ${
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
              to={item.path}
              onClick={() => handleClick(item.path)}
            >
              <item.icon
                className={`h-5 w-5 mr-3 ${
                  isActive ? "text-blue-500" : "text-gray-400"
                }`}
              />
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DynamicMenus;
