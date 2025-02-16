/**
 *  Protected route checks if a user have been authenticated before returning child components that are protected.
 **/
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

/**
 * Check if user is authenticated and return a path to the next page.
 * 
 * @returns route to child if user is authenticated, otherwise routes the user back to the home page.
 **/
const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;