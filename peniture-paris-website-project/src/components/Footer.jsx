import React from "react";
import PicLogo from "../assets/Pic-logo.png";
import Instagram from "../assets/Instagram-logo.png";
import Facebook from "../assets/Facebook-logo.png";
import XLogo from "../assets/X-logo.png";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-brand-desc">
          <p>
            We offer premium paint estimation services needs. Whether it’s an
            interior refresh or an we ensure accurate estimates and high-quality
            brands.
          </p>
        </div>

        {/* Center: Notched Logo */}
        <div className="footer-logo-notched">
          <div className="notch-cutout">
            <img src={PicLogo} alt="Peinture Paris" className="main-logo" />
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="link-column">
            <h4>About</h4>
            <ul>
              <li>About Us</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div className="link-column">
            <h4>Support</h4>
            <ul>
              <li>Contact us</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div className="link-column">
            <h4>Services</h4>
            <ul>
              <li>Our services</li>
              <li>Products</li>
            </ul>
          </div>
        </div>

        <div className="social-sidebar">
          <a href="https://www.instagram.com/accounts/login/?hl=en" target="_blank">
            <img src={Instagram} alt="Instagram"/>
          </a>
          <a href="https://www.facebook.com/" target="_blank">
            <img src={Facebook} alt="Facebook" />
          </a>
          <a href="https://x.com/" target="_blank">
            <img src={XLogo} alt="X" />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>©peintureparis 2024. All rights reserved.</p>
      </div>
    </footer>
  );
}
