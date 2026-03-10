import React from "react";

export default function FeatureCard({ title, desc, icon }) {
  return (
    <div className="feature-card">
      <div className="card-notch">
        <div className="icon-container">{icon}</div>
      </div>
      <div className="card-content">
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
    </div>
  );
}
