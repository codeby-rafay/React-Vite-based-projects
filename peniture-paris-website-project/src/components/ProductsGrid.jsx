import React, { useState } from "react";
import paintBox from "../assets/Paint-box.png";

export default function ProductsGrid() {
  const [activeTab, setActiveTab] = useState("Interior");

  const products = Array(15).fill({
    name: "Dulux wall paint",
    colorName: "Emerald red",
    img: paintBox,
  });

  return (
    <section id="products" className="products-grid-section">
      <div className="products-container">
        <header className="grid-header">
          <p className="sub-tag">High-Quality Paints for Every Space</p>
          <h1>Our Paint Products</h1>
          <p className="header-desc">
            We offer premium paints from top-tier brands, ensuring that your
            spaces exude elegance and sophistication.
          </p>
        </header>

        <div className="filter-bar">
          <div className="tabs">
            <button
              className={`products-tab ${activeTab === "Interior" ? "active" : ""}`}
              onClick={() => setActiveTab("Interior")}
            >
              Interior Paints
            </button>

            <button
              className={`products-tab ${activeTab === "Exterior" ? "active" : ""}`}
              onClick={() => setActiveTab("Exterior")}
            >
              Exterior Paints
            </button>
          </div>

          <div className="controls">
            <select className="brand-select">
              <option>Select brand</option>
              <option>Dulux</option>
            </select>
            <div className="search-wrapper">
              <input type="text" placeholder="Search paint" />
              <span className="search-icon">🔍</span>
            </div>
          </div>
        </div>

        <div className="paint-grid">
          {products.map((product, i) => (
            <div className="paint-card" key={i}>
              <div className="paint-img-holder">
                <img src={product.img} alt={product.name} />
              </div>
              <div className="paint-info">
                <h4>{product.name}</h4>
                <div className="color-tag">
                  <span className="color-box"></span>
                  <p>{product.colorName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="see-more-wrapper">
          <button className="see-more-btn">See more →</button>
        </div>
      </div>
    </section>
  );
}
