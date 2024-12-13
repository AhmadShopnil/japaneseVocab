// import { Bell, Search, User } from "lucide-react";
import { logout, selectCurrentUser } from "@/redux/api/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeUser } from "@/services/authServices";
import { Bell, LogOut, Search, User } from "lucide-react";

export function DashboardNav() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const handleLogOut = () => {
    removeUser();
    dispatch(logout());
  };

  return (
    <div className="flex items-center gap-2 justify-end py-3 border-b h-14 bg-gray-100 pr-4  ">
      <div className="relative hidden md:block mr-2">
        <input
          type="text"
          placeholder="Search..."
          className="w-64 px-4 py-2 pl-10 text-sm bg-white border
           border-transparent rounded-md focus:outline-none focus:bg-white focus:border-gray-300"
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
      {user && (
        <button onClick={handleLogOut} className=" text-center">
          <LogOut className={`text-xl mx-auto text-red-500`} />
          {/* <LogOut /> */}
        </button>
      )}
    </div>
  );
}
