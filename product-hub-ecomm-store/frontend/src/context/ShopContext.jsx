import { createContext, useContext, useState, useEffect } from "react";
import { toast, Slide } from "react-toastify";

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export function ShopProvider({ children }) {
  // if user is already logged in or not
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // each user gets separate data
  const getCartKey = (userId) => `cart_${userId}`;
  const getSavedItemsKey = (userId) => `savedItems_${userId}`;

  // this function runs after user successfully login
  const login = (userData, token) => {
    localStorage.setItem("currentUser", JSON.stringify(userData));
    localStorage.setItem("authToken", token);
    setCurrentUser(userData);

    const userCart = localStorage.getItem(getCartKey(userData.id));
    const userSavedItems = localStorage.getItem(getSavedItemsKey(userData.id));

    setCartItems(userCart ? JSON.parse(userCart) : []);
    setSavedItems(userSavedItems ? JSON.parse(userSavedItems) : []);
  };

  // called when user Sign out
  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    setCurrentUser(null);
    setCartItems([]);
    setSavedItems([]);
  };

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

  // TOAST NOTIFICATIONS
  const addtocartToast = () => {
    toast.success("Product Added to Cart!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
      transition: Slide,
    });
  };

  const saveToast = () => {
    toast.success("Product Saved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
      transition: Slide,
    });
  };

  const unsaveToast = () => {
    toast.success("Product Removed!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
      transition: Slide,
    });
  };

  const FillAllFieldsToast = () => {
    toast.error("Please fill in all fields", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      transition: Slide,
    });
  };

  const EnterValidEmailToast = () => {
    toast.error("Please enter a valid email", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      transition: Slide,
    });
  };

  return (
    <ShopContext.Provider
      value={{
        currentUser,
        login,
        logout,
        cartItems,
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
        addtocartToast,
        saveToast,
        unsaveToast,
        FillAllFieldsToast,
        EnterValidEmailToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
