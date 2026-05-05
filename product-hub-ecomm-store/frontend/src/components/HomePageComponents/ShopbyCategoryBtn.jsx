import { Link } from "react-router-dom";

const ShopbyCategoryBtn = () => {
  return (
    <div>
      <Link
        to="/categories"
        className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-4 sm:px-8 py-3.5 rounded-xl font-semibold text-sm transition-colors whitespace-nowrap"
      >
        Shop by Category
      </Link>
    </div>
  );
};

export default ShopbyCategoryBtn ;
