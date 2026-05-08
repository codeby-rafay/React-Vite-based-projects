// import { createContext, useContext, useState, useEffect } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { useNavigate } from "react-router-dom";
// import { toast, Slide } from "react-toastify";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export function AuthProvider({ children }) {
//   const navigate = useNavigate();

//   // if user is already logged in or not
//   const [currentUser, setCurrentUser] = useState(() => {
//     const savedUser = localStorage.getItem("currentUser");
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   // Check Auth/Verify User on LOAD
//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const checkAuth = async () => {
//     if (!currentUser) return;

//     try {
//       await axiosInstance.get("/check-auth");
//     } catch (error) {
//       logout();
//     }
//   };

//   // this function runs after user successful login
//   const login = (userData, token) => {
//     // Decode JWT to get expiry time
//     const decoded = JSON.parse(atob(token.split(".")[1]));

//     const expiryTime = decoded.exp * 1000; // convert to milliseconds

//     // Save user + token + expiry
//     localStorage.setItem("currentUser", JSON.stringify(userData));
//     localStorage.setItem("token", token);
//     localStorage.setItem("tokenExpiry", expiryTime);

//     setCurrentUser(userData);
//   };

//   // LOGOUT
//   const logout = async () => {
//     try {
//       await axiosInstance.post("/logout");
//     } catch (err) {}

//     localStorage.removeItem("currentUser");
//     localStorage.removeItem("token");
//     localStorage.removeItem("tokenExpiry");

//     setCurrentUser(null);

//     toast.error("Logged out", {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: false,
//       pauseOnHover: false,
//       draggable: true,
//       transition: Slide,
//     });

//     navigate("/login", { replace: true });
//   };

//   // auto logout when token expires
//   useEffect(() => {
//     const expiry = localStorage.getItem("tokenExpiry");

//     if (!expiry) return;

//     const timeLeft = Number(expiry) - Date.now();

//     if (timeLeft <= 0) {
//       logout();

//       setTimeout(() => {
//         navigate("/login", { replace: true });
//       }, 800);

//       return;
//     }

//     const timer = setTimeout(() => {
//       toast.error("Session expired. Please login again.", {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: false,
//         draggable: true,
//         transition: Slide,
//       });

//       logout();

//       setTimeout(() => {
//         navigate("/login", { replace: true });
//       }, 800);
//     }, timeLeft);

//     return () => clearTimeout(timer);
//   }, [currentUser]);

//   return (
//     <AuthContext.Provider
//       value={{
//         currentUser,
//         setCurrentUser,
//         login,
//         logout,
//         checkAuth,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }
