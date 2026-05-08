import React, { useState } from "react";
import { CreditCard, Truck, X, ShoppingBag } from "lucide-react";

function PaymentMethodModal({
  isOpen,
  onClose,
  onSelect,
  cartItems = [],
  totalPrice = 0,
}) {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleConfirm = () => {
    if (selectedMethod) {
      onSelect(selectedMethod);
      setSelectedMethod(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 overflow-hidden animate-fadeIn max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-linear-to-r from-orange-500 to-orange-600 p-6 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-white">Review Your Order</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-orange-700 p-1 rounded-full transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Order Summary Section */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag size={20} className="text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              Order Summary
            </h3>
          </div>

          {/* Cart Items */}
          <div className="bg-white rounded-lg p-4 mb-4 max-h-64 overflow-y-auto border border-gray-200">
            {cartItems && cartItems.length > 0 ? (
              <div className="space-y-3">
                {cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between pb-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {item.title || item.name || "Product"}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Qty:{" "}
                        <span className="font-medium">{item.quantity}</span> × $
                        <span className="font-medium">
                          {item.price.toFixed(2)}
                        </span>
                      </p>
                    </div>
                    <p className="font-bold text-orange-600 ml-4">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No items in cart</p>
            )}
          </div>

          {/* Total */}
          <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-gray-900">Total Amount:</p>
              <p className="text-3xl font-bold text-orange-600">
                ${parseFloat(totalPrice).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Select Payment Method
          </h3>
          <div className="space-y-3">
            {/* Card Payment Option */}
            <label
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedMethod === "card"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="card"
                checked={selectedMethod === "card"}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="w-5 h-5 text-orange-500 cursor-pointer"
              />
              <CreditCard className="ml-3 text-orange-500" size={24} />
              <div className="ml-4">
                <p className="font-semibold text-gray-800">Pay Now</p>
                <p className="text-sm text-gray-600">
                  Pay immediately using your credit/debit card
                </p>
              </div>
            </label>

            {/* Cash on Delivery Option */}
            <label
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedMethod === "cod"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={selectedMethod === "cod"}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="w-5 h-5 text-orange-500 cursor-pointer"
              />
              <Truck className="ml-3 text-green-600" size={24} />
              <div className="ml-4">
                <p className="font-semibold text-gray-800">Cash on Delivery</p>
                <p className="text-sm text-gray-600">
                  Pay when your order arrives at your doorstep
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end border-t border-gray-200 sticky bottom-0">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 cursor-pointer border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedMethod}
            className={`px-8 py-2 rounded-lg cursor-pointer font-bold text-white active:scale-95 transition-colors ${
              selectedMethod
                ? "bg-orange-500 hover:bg-orange-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethodModal;
