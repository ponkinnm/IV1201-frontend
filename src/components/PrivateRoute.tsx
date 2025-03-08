import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles: number[]; // Accepts an array of allowed role IDs
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const roleId = Number(localStorage.getItem("role_id")); // Convert to number

  if (!isLoggedIn) {
    return <Navigate to="/" replace />; // Redirect unauthorized users to home
  }
    if(isLoggedIn &&  !allowedRoles.includes(roleId)){
    return <Navigate to="/user" replace />; 
    }

  return children;
};

export default PrivateRoute;