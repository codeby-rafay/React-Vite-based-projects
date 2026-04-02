import { ShoppingCart } from "lucide-react";

const AddtoCartBtn = () => {
  return (
    <div>
      <button className="grow bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center gap-2 cursor-pointer py-3 px-6 rounded-xl font-semibold text-md transition-colors">
        Add to Cart{" "}
        <span>
          <ShoppingCart size={25} strokeWidth={1.75} />
        </span>
      </button>
    </div>
  );
};

export default AddtoCartBtn;
