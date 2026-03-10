import React, { useState } from "react";
import livingRoom from "../assets/Living-room.png";
// import playBtn from "../assets/Playbutton.png";
import nextBtn from "../assets/Next-button.png";

export default function Projects() {
  const [activeTab, setActiveTab] = useState("Interior");
  const projects = [1, 2, 3, 4];

  return (
    <section className="projects-section">
      <div className="projects-header">
        <div className="header-text">
          <h2>
            Explore Our <br /> Paint Projects
          </h2>
          <p>
            From interiors to Exteriors, See <br /> How We Bring Spaces to Life
          </p>
        </div>
        <div className="projects-tabs">
          <div
            className={`tab-item ${activeTab === "Interior" ? "active-tab" : ""}`}
            onClick={() => setActiveTab("Interior")}
          >
            Interior Projects
          </div>
          <div
            className={`tab-item ${activeTab === "Exterior" ? "active-tab" : ""}`}
            onClick={() => setActiveTab("Exterior")}
          >
            Exterior Projects
          </div>
        </div>
      </div>

      <div className="cards-container">
        {projects.map((_, i) => (
          <div className="project-card-v2" key={i}>
            <div className="card-img-container">
              <img
                src={livingRoom}
                alt="Living Room"
                className="project-main-img"
              />
              {i === 3 && (
                <div className="fade-overlay">
                  <img src={nextBtn} alt="Next" className="next-btn-fixed" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
