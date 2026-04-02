import { Link } from "react-router-dom";

const BrowseProductBtn = () => {
  return (
    <div>
      <Link
        to="/products"
        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-colors"
      >
        Browse All Products
      </Link>
    </div>
  );
};

export default BrowseProductBtn;
