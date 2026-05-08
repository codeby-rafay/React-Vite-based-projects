import { createContext, useContext, useState, useEffect } from "react";
import { toast, Slide } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export function ShopProvider({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      if (!currentUser) return;

      try {
        await axiosInstance.get("/check-auth");
      } catch (error) {
        logout();
      }
    };
    verifyUser();
  }, []);

  // if user is already logged in or not
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // each user gets separate data
  const getCartKey = (userId) => `cart_${userId}`;
  const getSavedItemsKey = (userId) => `savedItems_${userId}`;

  // this function runs after user successful login
  const login = (userData, token) => {
    // Decode JWT to get expiry time
    const decoded = JSON.parse(atob(token.split(".")[1]));

    const expiryTime = decoded.exp * 1000; // convert to milliseconds

    // Save user + token + expiry
    localStorage.setItem("currentUser", JSON.stringify(userData));
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiry", expiryTime);

    setCurrentUser(userData);

    // restore user-specific data
    const userCart = localStorage.getItem(getCartKey(userData.id));
    const userSavedItems = localStorage.getItem(getSavedItemsKey(userData.id));

    setCartItems(userCart ? JSON.parse(userCart) : []);
    setSavedItems(userSavedItems ? JSON.parse(userSavedItems) : []);
  };

  // called when user Sign out
  const logout = async () => {
    try {
      await axiosInstance.post("/logout");
    } catch (error) {}

    localStorage.removeItem("currentUser");

    setCurrentUser(null);

    setCartItems([]);

    setSavedItems([]);
  };

  // auto logout when token expires
  useEffect(() => {
    const expiry = localStorage.getItem("tokenExpiry");

    if (!expiry) return;

    const timeLeft = Number(expiry) - Date.now();

    if (timeLeft <= 0) {
      logout();

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 800);

      return;
    }

    const timer = setTimeout(() => {
      toast.error("Session expired. Please login again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        transition: Slide,
      });

      logout();

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 800);
    }, timeLeft);

    return () => clearTimeout(timer);
  }, [currentUser]);

  // cart state
  const [cartItems, setCartItems] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (!savedUser) return [];
    const user = JSON.parse(savedUser);
    const saved = localStorage.getItem(getCartKey(user.id));
    return saved ? JSON.parse(saved) : [];
  });

  // saved items state
  const [savedItems, setSavedItems] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (!savedUser) return [];
    const user = JSON.parse(savedUser);
    const saved = localStorage.getItem(getSavedItemsKey(user.id));
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        getCartKey(currentUser.id),
        JSON.stringify(cartItems),
      );
    }
  }, [cartItems, currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        getSavedItemsKey(currentUser.id),
        JSON.stringify(savedItems),
      );
    }
  }, [savedItems, currentUser]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev;
      return [
        ...prev,
        { ...product, quantity: 1, originalStock: product.stock },
      ];
    });
  };

  const increaseQty = (productId) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === productId && item.quantity < item.originalStock) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      }),
    );
  };

  const decreaseQty = (productId) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.id === productId);
      if (!item) return prev;
      if (item.quantity === 1) return prev.filter((i) => i.id !== productId);
      return prev.map((i) =>
        i.id === productId ? { ...i, quantity: i.quantity - 1 } : i,
      );
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const isInCart = (productId) =>
    cartItems.some((item) => item.id === productId);

  const getQtyInCart = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };

  const toggleSave = (product) => {
    setSavedItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev.filter((item) => item.id !== product.id);
      return [...prev, product];
    });
  };

  const isSaved = (productId) =>
    savedItems.some((item) => item.id === productId);

  return (
    <ShopContext.Provider
      value={{
        currentUser,
        login,
        logout,
        cartItems,
        setCartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        cartCount,
        isInCart,
        getQtyInCart,
        savedItems,
        toggleSave,
        isSaved,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
