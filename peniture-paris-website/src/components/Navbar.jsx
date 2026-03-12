import React, { useState } from "react";
import Logo from "../assets/Logo.png";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState(0);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Products", id: "products" },
    { name: "FAQ", id: "faq" },
    { name: "Contact", id: "contact" },
  ];

  const handleClick = (id, index) => {
    setActiveTab(index);

    // This looks for the element with id="home", id="about", etc.
    const element = document.getElementById(id);

    if (element) {
      // Offset calculation for the sticky navbar height
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      console.error(`Element with id "${id}" not found!`);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={Logo} alt="Logo" onClick={() => handleClick("home", 0)} />
      </div>

      <div className="nav-links-wrapper">
        <ul className="nav-links">
          {navLinks.map((link, index) => (
            <li
              key={link.id}
              className={activeTab === index ? "active" : ""}
              onClick={() => handleClick(link.id, index)}
            >
              {link.name}
            </li>
          ))}
          <span
            className="nav-sliding-dot"
            style={{ transform: `translateX(${activeTab * (75 + 35)}px)` }}
          ></span>
        </ul>
      </div>

      <div className="nav-actions">
        <button className="nav-cta">
          Get Estimate
        </button>
        <div className="user-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      </div>
    </nav>
  );
}
