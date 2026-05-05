import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";

const ProtectedAdminRoute = ({ children }) => {
  const { currentUser } = useShop();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/login", { replace: true });
    }
  }, [currentUser, navigate]);

  // If user is not admin, don't render anything (component already navigated to home)
  if (!currentUser || currentUser.role !== "admin") {
    return null;
  }

  // If user is admin, render the admin page
  return children;
};

export default ProtectedAdminRoute;
