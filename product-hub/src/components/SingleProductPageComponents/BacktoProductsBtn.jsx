import { Link } from 'react-router-dom'

const BacktoProductsBtn = () => {
  return (
    <div>
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-bold text-lg"
      >
        ← Back to Products
      </Link>
    </div>
  );
};

export default BacktoProductsBtn;
