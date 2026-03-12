import React from "react";
import home1 from "../assets/home1.png";
import home2 from "../assets/home2.png";
import home3 from "../assets/home3.png";

export default function Home() {
  const images = [home1, home2, home3];

  return (
    <section id="home" className="home-section">
      <div className="home-left">
        <p className="small-text">Accurate, Fast, & Tailored Paint Pricing</p>

        <h1>
          Find Your Perfect <br /> Paint Estimate
        </h1>

        <p className="description">
          With Pure Shades, you can easily calculate the exact amount of paint
          needed for your project. Enter your wall dimensions, choose your
          paint, and get an instant estimate.
        </p>

        <button className="cta-btn">Get my estimate</button>
      </div>

      <div className="home-right">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`home${index + 1}`}
            className={`home-img img${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
