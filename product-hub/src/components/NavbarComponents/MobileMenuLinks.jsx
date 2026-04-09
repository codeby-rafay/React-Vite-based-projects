import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const MobileMenuLinks = ({ navLinks, isActive, savedItems, menuOpen, setMenuOpen }) => {
  return (
    <div>
      {menuOpen && (
        <div className="md:hidden pb-4 border-t border-gray-100 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium mb-1 transition-colors ${
                isActive(link.path)
                  ? "bg-orange-500 text-white"
                  : link.name === "Saved"
                    ? "text-red-500 hover:bg-red-50"
                    : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              {link.name === "Saved" ? (
                <span className="flex items-center gap-1">
                  <Heart size={16} fill="currentColor" /> Saved (
                  {savedItems.length})
                </span>
              ) : (
                link.name
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileMenuLinks;
