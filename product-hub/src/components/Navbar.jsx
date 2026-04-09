import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import Logo from "./NavbarComponents/Logo";
import DesktopNavLinks from "./NavbarComponents/DesktopNavLinks";
import MobileMenuLinks from "./NavbarComponents/MobileMenuLinks";
import MobileMenuBtn from "./NavbarComponents/MobileMenuBtn";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { savedItems } = useShop();

  const hasSavedItems = savedItems.length > 0;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Only add Saved link if there are saved items
  if (hasSavedItems) {
    navLinks.push({ name: "Saved", path: "/saved" });
  }

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav Links */}
          <DesktopNavLinks
            navLinks={navLinks}
            isActive={isActive}
            savedItems={savedItems}
          />

          {/* Mobile Menu Button */}
          <MobileMenuBtn menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>

        {/* Mobile Menu */}
        <MobileMenuLinks
          navLinks={navLinks}
          isActive={isActive}
          savedItems={savedItems}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      </div>
    </nav>
  );
}

export default Navbar;
