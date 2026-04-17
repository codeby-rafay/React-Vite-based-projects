const CheckoutBtn = ({ handleCheckout, cartItems }) => {
  return (
    <div>
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
  );
};

export default CheckoutBtn;
