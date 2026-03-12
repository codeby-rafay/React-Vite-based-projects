import React, { useState } from "react";
import greenBg3 from "../assets/green-bg3.png";
import CommasBg from "../assets/Commas-bg.png";
import userImg1 from "../assets/Sarah.png";
import userImg2 from "../assets/Elena.png";
import userImg3 from "../assets/Emma.png";
import userImg4 from "../assets/Marc.png";
import leftarrow from "../assets/left-arrow.svg";
import rightarrow from "../assets/right-arrow.svg";

export default function Testimonials() {
  // 1. Data array for the feedback cards
  const feedbacks = [
    {
      name: "Sarah",
      role: "Homeowner, Paris",
      text: "As a contractor, I rely on accuracy, and Pure Shades delivers every time. I've been able to provide my clients with precise estimates without any hassle.",
    },
    {
      name: "Marc",
      role: "Architect, Isatnbul",
      text: "The interface is incredibly intuitive. It has transformed the way we handle large-scale painting projects for our corporate clients.",
    },
    {
      name: "Elena",
      role: "Interior Designer, London",
      text: "The color matching technology is spot on. I no longer have to worry about variations between the digital estimate and the final physical coat.",
    },
  ];

  // 2. State to track the active feedback index
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3. Logic to move to the next feedback
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
  };

  // 4. Logic to move to the previous feedback
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
  };

  return (
    <section className="testimonials-section">
      <img src={CommasBg} alt="" className="commas-decor" />
      <img src={greenBg3} alt="" className="right-brush-decor" />

      <div className="testimonials-container">
        <header className="testimonial-header">
          <div className="title-area">
            <span className="label">Our Reviewers</span>
            <h2>
              Our Customers <br /> Feedback.
            </h2>
          </div>
          <p className="subtitle">See what they said about our services</p>
        </header>

        <div className="testimonial-grid">
          <div className="reviewers-mini-card">
            <p className="label">Our Reviewers</p>
            <div className="avatar-group">
              <img src={userImg1} alt="user" />
              <img src={userImg2} alt="user" />
              <img src={userImg3} alt="user" />
              <img src={userImg4} alt="user" />
              <div className="more-count">12k+</div>
            </div>
          </div>

          <div className="main-feedback-card">
            {/* Left Arrow Notch */}
            <div
              className="arrow-notch-left"
              onClick={handlePrev}
              style={{ cursor: "pointer" }}
            >
              <div className="arrow-circle">
                <img src={leftarrow} alt="left" className="arrow-circle" />
              </div>
            </div>

            <div className="feedback-content">
              <div className="user-info-row">
                <img
                  src={userImg1}
                  alt={feedbacks[currentIndex].name}
                  className="profile-pic"
                />
                <div className="name-meta">
                  <h4>{feedbacks[currentIndex].name}</h4>
                  <p>{feedbacks[currentIndex].role}</p>
                </div>
                <div className="rating">
                  <span className="stars">★★★★★</span>
                  <span className="score">4.8</span>
                </div>
              </div>

              <hr className="divider" />

              <p className="quote">"{feedbacks[currentIndex].text}"</p>

              {/* Pagination Dots */}
              <div className="pagination-dots">
                {feedbacks.map((_, i) => (
                  <span
                    key={i}
                    className={`dot ${i === currentIndex ? "active" : ""}`}
                  ></span>
                ))}
              </div>
            </div>

            {/* Right Arrow Notch */}
            <div
              className="arrow-notch-right"
              onClick={handleNext}
              style={{ cursor: "pointer" }}
            >
              <div className="arrow-circle active-arrow">
                <img src={rightarrow} alt="right" className="arrow-circle" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
