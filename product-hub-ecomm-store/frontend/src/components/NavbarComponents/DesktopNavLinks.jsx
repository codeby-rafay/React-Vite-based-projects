import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ChevronDown, LogOut, Bookmark } from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { toast, Slide } from "react-toastify";

const DesktopNavLinks = ({ navLinks, isActive }) => {
  const { currentUser, logout, savedItems } = useShop();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  // This ref is used to detect clicks OUTSIDE the dropdown, to close it
  const dropdownRef = useRef(null);
  // Close dropdown when user clicks somewhere else on the page
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Called when user clicks "Sign Out" in the dropdown
  const handleLogout = () => {
    logout(); // Clears user from context and localStorage
    setDropdownOpen(false);
    toast.success("You have been signed out.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      transition: Slide,
    });
    navigate("/login"); // Redirect to login page
  };

  // Does the user have any saved items? Used to show the red dot
  const hasSaved = savedItems.length > 0;

  return (
    <div className="hidden md:flex items-center gap-1 ml-auto">
      {/* Regular nav links (but filter out "Saved" - it goes in dropdown) */}
      {navLinks
        .filter((link) => link.name !== "Saved")
        .map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              isActive(link.path)
                ? "bg-orange-500 text-white"
                : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
            }`}
          >
            {link.name}
          </Link>
        ))}

      {/*AUTH SECTION
          - If logged in: show avatar circle + dropdown
          - If not logged in: show Sign In button*/}
      <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
        {currentUser ? (
          // ---- USER IS LOGGED IN: Show avatar ----
          <div className="relative" ref={dropdownRef}>
            {/* The avatar button - shows first letter of user's name */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="relative flex items-center gap-1 focus:outline-none"
            >
              {/* Round circle with first letter */}
              <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm uppercase cursor-pointer hover:bg-orange-600 transition-colors">
                {currentUser.fullName.charAt(0)}
              </div>

              {/* Red dot - only shows if user has saved items */}
              {hasSaved && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
              )}

              <ChevronDown size={14} className="text-gray-500 cursor-pointer" />
            </button>

            {/* Dropdown menu - with smooth transition */}
            <div
              className={`absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-lg z-50 py-2 transition-all duration-300 ease-in-out ${
                dropdownOpen
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible"
              }`}
            >
              {/* User info at top of dropdown */}
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">
                  {currentUser.fullName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {currentUser.email}
                </p>
              </div>

              {/* Saved link inside dropdown */}
              <Link
                to="/saved"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                <Heart size={16} className="text-red-500" fill="currentColor" />
                Saved Items
                {/* Show count badge if there are saved items */}
                {hasSaved && (
                  <span className="ml-auto bg-red-100 text-red-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {savedItems.length}
                  </span>
                )}
              </Link>

              {/* Sign Out button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          // ---- USER IS NOT LOGGED IN: Show Sign In button ----
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
        )}
      </div>
    </div>
  );
};

export default DesktopNavLinks;
