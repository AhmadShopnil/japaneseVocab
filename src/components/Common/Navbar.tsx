import { logout, selectCurrentUser } from "@/redux/api/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeUser } from "@/services/authServices";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const handleLogOut = () => {
    removeUser();
    dispatch(logout());
    // router.push("/");
  };
  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          日本 Learn
        </Link>
        <ul className="flex space-x-4">
          {user ? (
            <>
              <li>
                <Link to="/lessons">Lessons</Link>
              </li>
              <li>
                <Link to="/tutorials">Tutorials</Link>
              </li>
              {user.role === "admin" && (
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              )}
              <li>
                <button
                  onClick={handleLogOut}
                  className="bg-red-500 px-2 py-1 rounded"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
