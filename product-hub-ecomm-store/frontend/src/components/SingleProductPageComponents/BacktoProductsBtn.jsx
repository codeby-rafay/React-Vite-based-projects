import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BacktoProductsBtn = () => {
  return (
    <div>
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-700 font-bold text-lg hover:-translate-x-2 transition-all"
      >
        <ArrowLeft size={24} strokeWidth={2} />{" "}
        <span>
          Back to Products
        </span>
      </Link>
    </div>
  );
};

export default BacktoProductsBtn;
