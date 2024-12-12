import { selectCurrentUser } from "@/redux/api/slices/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // You can optionally allow different roles
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const user = useAppSelector(selectCurrentUser);

  // const role = user?.role;

  if (user) {
    return <>{children}</>;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
