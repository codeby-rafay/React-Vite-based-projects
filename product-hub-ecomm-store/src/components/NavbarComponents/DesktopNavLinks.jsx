import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const DesktopNavLinks = ({ navLinks, isActive, savedItems }) => {
  return (
    <div className="hidden md:flex items-center gap-1 ml-auto">
      {navLinks.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            isActive(link.path)
              ? "bg-orange-500 text-white"
              : link.name === "Saved"
                ? "text-red-500 hover:bg-red-50 hover:text-red-600"
                : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
          }`}
        >
          {link.name === "Saved" ? (
            <span className="flex items-center gap-1">
              <Heart size={16} fill="currentColor" /> {link.name}
              <span className="bg-red-100 text-red-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {savedItems.length}
              </span>
            </span>
          ) : (
            link.name
          )}
        </Link>
      ))}

      {/* Auth Buttons */}
      <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
        <Link
          to="/login"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            isActive("/login")
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "bg-orange-400 text-white hover:bg-orange-600"
          }`}
        >
          Sign In
        </Link>
        {/* <Link
          to="/signup"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            isActive("/signup")
              ? "bg-orange-500 text-white"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          Sign Up
        </Link> */}
      </div>
    </div>
  );
};

export default DesktopNavLinks;
