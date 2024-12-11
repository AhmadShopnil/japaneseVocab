import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // You can optionally allow different roles
}

const PrivateRoutes = ({
  children,
  allowedRoles = ["user"],
}: PrivateRouteProps) => {
  const user = {
    // role:'admin'
    role: "user",
  };
  const role = user?.role;

  if (role && allowedRoles.includes(role)) {
    return <>{children}</>;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoutes;
