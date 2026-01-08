import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  // Wait for session restoration to complete before redirecting
  if (loading) {
    return null; // or a loading spinner
  }

  if (!isAuthenticated) {
    // Save the current location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />; // REQUIRED
};

export default ProtectedRoute;
