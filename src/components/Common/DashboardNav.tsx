// import { Bell, Search, User } from "lucide-react";
import { Link } from "react-router-dom";

export function DashboardNav() {
  return (
    <div className="flex items-center py-4 w-screen ">
      {/* left side */}
      <div className="flex">
        <div className="flex items-center">{/* add logo here */}</div>
        {/* menus start */}
        <div className="hidden md:flex gap-3 items-center space-x-4">
          <Link to="/">Home</Link>
          <Link to="/">Lessons</Link>
          <Link to="/">Tutorials</Link>
        </div>
        {/* menus End */}
      </div>

      {/* right side */}
      {/* <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 px-4 py-2 pl-10 text-sm bg-gray-100 border border-transparent rounded-md focus:outline-none focus:bg-white focus:border-gray-300"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <User className="h-5 w-5" />
              <span className="sr-only">User Profile</span>
            </button>
          </div> */}
    </div>
  );
}
