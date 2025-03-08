import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn) {
    return <Navigate to="/user" replace />; // Redirect logged-in users
  }

  return children;
};

export default PublicRoute;