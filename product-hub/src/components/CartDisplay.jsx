import { useState } from "react";
import { ShoppingCart, X, Trash2, Plus, Minus } from "lucide-react";
import { useShop } from "../context/ShopContext";

function CartDisplay() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { cartItems, cartCount, removeFromCart, increaseQty, decreaseQty } =
    useShop();

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200);
  };

  const handleCheckout = () => {
    alert("Checkout functionality coming soon!");
  };

  // Calculate total price of all items in cart
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-orange-500 hover:bg-orange-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors cursor-pointer"
      >
        <ShoppingCart size={24} />
        {/* Red badge with item count */}
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      {/* Cart Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Dark background - click to close */}
          <div
            className={`flex-1 bg-black/40 ${
              isClosing ? "animate-fadeOut" : "animate-fadeIn"
            }`}
            onClick={handleClose}
          />

          {/* Cart Panel */}
          <div
            className={`w-80 bg-white h-full flex flex-col shadow-2xl ${
              isClosing ? "animate-slideOutRight" : "animate-slideInRight"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                My Cart{" "}
                {cartCount > 0 && (
                  <span className="text-orange-500">({cartCount})</span>
                )}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors hover:bg-gray-200 rounded-md cursor-pointer"
              >
                <X size={22} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                /* Empty state message */
                <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                  <ShoppingCart size={48} className="text-gray-200" />
                  <p className="text-gray-400 font-medium">No items in cart</p>
                  <p className="text-gray-300 text-sm">
                    Go to a product and click Add to Cart
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onRemove={removeFromCart}
                      onIncrease={increaseQty}
                      onDecrease={decreaseQty}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Footer: total price */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-500 text-sm">
                    {cartCount} item{cartCount !== 1 ? "s" : ""}
                  </span>
                  <span className="text-gray-400 text-xs">incl. taxes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-bold text-lg">Total</span>
                  <span className="text-orange-500 font-bold text-2xl">
                    ${totalPrice}
                  </span>
                </div>
              </div>
            )}
            {/* Checkout Button */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold cursor-pointer py-3 px-4 rounded-lg transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Single cart item with + and - buttons
function CartItem({ item, onRemove, onIncrease, onDecrease }) {
  const stockLeft = item.originalStock - item.quantity;

  return (
    <div className="bg-gray-50 rounded-xl p-3 hover:border-orange-600 transition-colors border border-transparent">
      <div className="flex items-start gap-3">
        {/* Product image */}
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-14 h-14 rounded-lg object-cover shrink-0"
        />

        <div className="flex-1 min-w-0">
          {/* Product name */}
          <p className="text-sm font-semibold text-gray-800 line-clamp-1">
            {item.title}
          </p>

          {/* Price per item */}
          <p className="text-xs text-gray-400 mt-0.5">${item.price} each</p>

          {/* Stock remaining info */}
          <p className="text-xs text-gray-400 mt-0.5">
            {stockLeft} left in stock
          </p>
        </div>

        {/* Remove button */}
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:bg-red-200 px-1 py-1 rounded-md transition-colors shrink-0"
        >
          <Trash2 size={15} />
        </button>
      </div>

      {/* Bottom row: + - buttons and subtotal */}
      <div className="flex items-center justify-between mt-3">
        {/* Quantity controls */}
        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-2 py-1">
          {/* Minus button */}
          <button
            onClick={() => onDecrease(item.id)}
            className="text-gray-500 hover:text-orange-500 transition-colors bg-gray-100 rounded-md w-5 h-5 flex items-center justify-center"
          >
            <Minus size={14} />
          </button>

          {/* Current quantity */}
          <span className="text-sm font-bold text-gray-800 w-5 text-center">
            {item.quantity}
          </span>

          {/* Plus button — disabled if quantity = original stock */}
          <button
            onClick={() => onIncrease(item.id)}
            disabled={item.quantity >= item.originalStock}
            className={`transition-colors w-5 h-5 flex items-center justify-center bg-gray-100 rounded-md ${
              item.quantity >= item.originalStock
                ? "text-gray-200 cursor-not-allowed"
                : "text-gray-500 hover:text-orange-500"
            }`}
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Subtotal for this item */}
        <span className="text-orange-500 font-bold text-sm">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default CartDisplay;
