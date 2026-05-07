import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const SeeAllProducts = () => {
  return (
    <div className="text-center mt-10 flex justify-center">
      <Link
        to="/products"
        className="btn bg-orange-500 hover:bg-orange-700 w-1/5 justify-center text-white px-10 py-3 rounded-xl flex items-center gap-2 font-semibold text-md transition-colors"
      >
        See All Products <ArrowRight size={16} strokeWidth={2} />
      </Link>
    </div>
  );
};

export default SeeAllProducts;
