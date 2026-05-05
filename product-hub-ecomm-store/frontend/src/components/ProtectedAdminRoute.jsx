import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";

const ProtectedAdminRoute = ({ children }) => {
  const { currentUser } = useShop();
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !currentUser || currentUser.role !== "admin") {
      navigate("/", { replace: true });
    }
  }, [token, currentUser, navigate]);

  // If user is not admin, don't render anything (component already navigated to home)
  if (!token || !currentUser || currentUser.role !== "admin") {
    return null;
  }

  // If user is admin, render the admin page
  return children;
};

export default ProtectedAdminRoute;
