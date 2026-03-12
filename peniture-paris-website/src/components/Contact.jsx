import React from "react";
import greenBg4 from "../assets/green-bg4.png";
import MailIcon from "../assets/Mail.png";
import PhoneIcon from "../assets/Phone.png";

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <img src={greenBg4} alt="" className="contact-brush" />

      <div className="contact-container">
        <div className="contact-info">
          <h1>Let’s Talk</h1>
          <p>
            Have a big idea or brand to develop and need help? Then reach out
            we'd love to hear about your project and provide help
          </p>

          <div className="contact-links">
            <div className="contact-item">
              <img src={MailIcon} alt="Mail" />
              <span>peintureparis@gmail.com</span>
            </div>
            <div className="contact-item">
              <img src={PhoneIcon} alt="Phone" />
              <span>+552 890123409</span>
            </div>
          </div>
        </div>

        <div className="contact-form-card">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <div className="input-group">
                <label>First name</label>
                <input type="text" placeholder="First name" />
              </div>
              <div className="input-group">
                <label>Last name</label>
                <input type="text" placeholder="Last name" />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Email</label>
                <input type="email" placeholder="Your email" />
              </div>
              <div className="input-group">
                <label>Phone number #</label>
                <input type="number" placeholder="Your phone number" />
              </div>
            </div>

            <div className="input-group full-width">
              <label>Your message</label>
              <textarea placeholder="Write here"></textarea>
            </div>

            <div className="submit-area">
              <button type="submit" className="submit-btn">
                Submit <span>➤</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
