import { Navigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";

const ProtectedAdminRoute = ({ children }) => {
  const { currentUser } = useShop();
  const token = localStorage.getItem("authToken");

  // If user is not authenticated or not an admin, redirect to login
  if (!token || !currentUser || currentUser.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  // If user is admin, render the admin page
  return children;
};

export default ProtectedAdminRoute;
