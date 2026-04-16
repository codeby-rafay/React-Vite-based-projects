import { createContext, useContext, useState, useEffect } from "react";
import { toast, Slide } from "react-toastify";

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export function ShopProvider({ children }) {
  // Load cart data from localStorage if exists, otherwise start with empty array
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Load saved items from localStorage if exists, otherwise start with empty array
  const [savedItems, setSavedItems] = useState(() => {
    const saved = localStorage.getItem("savedItems");
    return saved ? JSON.parse(saved) : [];
  });

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Save saved items to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
  }, [savedItems]);

  // Add product to cart (quantity starts at 1)
  // We also store the original stock so we can calculate what is left
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev; // if the product is already in cart, then don't add again
      return [
        ...prev,
        {
          ...product,
          quantity: 1,
          originalStock: product.stock, // save original stock once added to cart
        },
      ];
    });
  };

  // Increase quantity by 1 (but not more than original stock)
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

  // Decrease quantity by 1 - if it reaches 0, remove the item from cart
  const decreaseQty = (productId) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.id === productId);
      if (!item) return prev;
      if (item.quantity === 1) {
        // Remove item completely when quantity become 0
        return prev.filter((i) => i.id !== productId);
      }
      return prev.map((i) =>
        i.id === productId ? { ...i, quantity: i.quantity - 1 } : i,
      );
    });
  };

  // Remove item completely from cart
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Total number of items in cart (sum of all quantities)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Check if product is in cart
  const isInCart = (productId) =>
    cartItems.some((item) => item.id === productId);

  // How many of this product are in the cart (used to reduce stock display)
  const getQtyInCart = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };

  // save/unsave products
  const toggleSave = (product) => {
    setSavedItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev.filter((item) => item.id !== product.id);
      return [...prev, product];
    });
  };

  const isSaved = (productId) =>
    savedItems.some((item) => item.id === productId);

  // Toaster for add to cart
  const addtocartToast = () => {
    toast.success("Product Added to Cart!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
  };

  // Toaster for save/unsave product
  const saveToast = () => {
    toast.success("Product Saved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
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
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
  };

  return (
    <ShopContext.Provider
      value={{
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
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
