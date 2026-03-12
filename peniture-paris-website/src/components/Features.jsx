import React from "react";
import FeatureCard from "./FeatureCard";
import greenBg from "../assets/green-bg.png";

export default function Features() {
  const features = [
    {
      title: "Precision Estimates",
      desc: "We calculate the exact amount of paint needed, reducing waste and saving money.",
    },
    {
      title: "Fast & Simple",
      desc: "Get your quote in seconds, and make confident decisions for your project.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M13 17l5-5-5-5M6 17l5-5-5-5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
        </svg>
      ),
    },
    {
      title: "Customization",
      desc: "Tailor your estimate with the choice of your paint type, quality, and quantity.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
      ),
    },
    {
      title: "Pro-Grade Accuracy",
      desc: "Trusted by the professionals, Pure Shades provides the precision you need.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
          <line x1="12" y1="2" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="2" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="22" y2="12" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="about"
      className="features-section"
      style={{
        backgroundImage: `url(${greenBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="features-content">
        <p className="why-text">Why Choose Painture Paris</p>
        <h2>Tailored Solutions and Premium Paint for Every Project</h2>

        <div className="features-container">
          {features.map((f, i) => (
            <FeatureCard key={i} title={f.title} desc={f.desc} icon={f.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}
