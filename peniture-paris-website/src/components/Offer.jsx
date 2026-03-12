import React from "react";
import greenBg2 from "../assets/green-bg2.png";

export default function Offer() {
  const offers = [
    {
      title: "Custom Paint Estimates",
      desc: "Receive precise, tailored estimates",
      icon: "📊",
      class: "top-left",
    },
    {
      title: "Furniture Covering",
      desc: "We protect and move your furniture",
      icon: "🪑",
      class: "mid-right",
    },
    {
      title: "Wall Crack Fixation",
      desc: "We fix cracks for a smooth finish",
      icon: "🧱",
      class: "bottom-left",
    },
    {
      title: "Post-Paint Cleaning",
      desc: "We clean up after the job is done",
      icon: "✨",
      class: "far-bottom",
    },
  ];

  return (
    <section
      className="offer-wrapper"
      style={{ backgroundImage: `url(${greenBg2})` }}
    >
      <div className="offer-inner">
        {/* Left Side: Staggered Wrapped Cards */}
        <div className="offer-cards-grid">
          {offers.map((item, i) => (
            <div className={`offer-wrap-card ${item.class}`} key={i}>
              <div className="offer-icon-wrap">
                <div className="inner-icon">{item.icon}</div>
              </div>
              <div className="offer-text-box">
                <h5>{item.title}</h5>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Text Content */}
        <div className="offer-content-side">
          <h2>
            What we <br /> offer
          </h2>
          <p className="offer-sub">
            Tailored Solutions and Premium Paint for Every Project
          </p>
          <div className="offer-paragraphs">
            <p>
              At Peinture paris, we combine cutting-edge technology with the
              finest quality paints to bring you fast, accurate, and customized
              paint estimates.
            </p>
            <p>
              Whether you're working on a small room or a large exterior
              project, we ensure precision at every step. From selecting the
              best brands to calculating exact quantities, we make the process
              simple, efficient, and reliable.
            </p>
          </div>
          <button className="estimate-btn">Get my estimate →</button>
        </div>
      </div>
    </section>
  );
}
