import { Link } from "react-router-dom";
import notFoundImage from "../assets/404.jpg";

function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white flex items-center justify-center">
      {/* Background Image */}
      <img
        src={notFoundImage}
        alt="404 Not Found"
        className="absolute inset-0 w-full h-full object-contain"
      />

      {/* Overlay for better button visibility */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content */}
      <div className="text-center">
        <Link
          to="/"
          className="inline-block absolute top-10 left-5 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
