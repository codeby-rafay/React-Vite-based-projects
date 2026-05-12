import axios from "axios";
import { toast, Slide } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // allow browser to send cookies, jwt tokens, session data with every requests (without it backend won't receive cookies and won't be able to authenticate user)
});

// AUTO LOGOUT IF TOKEN EXPIRES
axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
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

      window.location.href = "/login";
    }

    return Promise.reject(error); // forward error to catch block in api requests
  },
);

export default axiosInstance;
