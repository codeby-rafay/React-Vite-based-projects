import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Link to="/" className="flex items-center gap-2">
        <div className="w-10 flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            <img
              className="size-10 rounded-lg"
              src="/src/assets/product_hub_logo.jpg"
              alt="Logo"
            />
          </span>
        </div>
        <span
          className="text-xl font-bold text-gray-900"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Product<span className="text-orange-500">Hub</span>
        </span>
      </Link>
    </div>
  );
};

export default Logo;
