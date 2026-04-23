import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  // Check if user is admin from localStorage
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const token = localStorage.getItem("token");

  // If user is not authenticated or not an admin, redirect to home
  if (!isAdmin || !token) {
    return <Navigate to="/" replace />;
  }

  // If user is admin, render the admin page
  return children;
};

export default ProtectedAdminRoute;
