import axios from "axios";
import { toast, Slide } from "react-toastify";
import { useShop } from "../context/ShopContext";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// AUTO LOGOUT IF TOKEN EXPIRES
axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      // remove saved user
      localStorage.removeItem("currentUser");

      toast.error("Session expired. Please login again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        transition: Slide,
      });

      // redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error); // forward error to catch block in api requests
  },
);

export default axiosInstance;
