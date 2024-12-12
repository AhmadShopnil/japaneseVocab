/* eslint-disable @typescript-eslint/no-explicit-any */
import { selectCurrentUser } from "@/redux/api/slices/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const CommonRoute = ({ children }: PrivateRouteProps) => {
  const user = useAppSelector(selectCurrentUser);
  const role = user?.role;

  if (user && role) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

export default CommonRoute;
