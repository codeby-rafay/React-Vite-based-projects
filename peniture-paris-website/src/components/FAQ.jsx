import React, { useState } from "react";
import greenBrush from "../assets/green-bg2.png";
import faqArrow from "../assets/FAQ-arrow.png";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How accurate are your paint estimates?",
      answer:
        "Our estimates are highly precise, using advanced measurement tools and factoring in wall texture, material types, and current market rates.",
    },
    {
      question:
        "Do you offer furniture moving and protection during the painting process?",
      answer:
        "Yes, we handle the moving and covering of your furniture with high-quality plastic and drop cloths to ensure complete protection.",
    },
    {
      question: "Can you fix wall cracks before painting?",
      answer:
        "Absolutely. We provide surface preparation including crack filling, sanding, and priming to ensure a perfectly smooth finish.",
    },
    {
      question: "What happens after the painting is complete?",
      answer:
        "Once finished, we conduct a thorough cleanup, move furniture back to its place, and perform a final walkthrough with you.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <img src={greenBrush} alt="" className="faq-top-brush" />

      <div className="faq-container">
        <header className="faq-header">
          <p className="faq-tag">Got Questions?</p>
          <h1>Frequently Asked Questions</h1>
          <p className="faq-desc">Clear Answers, Every Time.</p>
        </header>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item ${activeIndex === i ? "active" : ""}`}
              onClick={() => toggleFAQ(i)}
            >
              <div className="faq-question-row">
                <h3>{faq.question}</h3>
                <div className="faq-arrow-box">
                  <img
                    src={faqArrow}
                    alt="toggle"
                    className={`faq-arrow-icon ${activeIndex === i ? "rotate" : ""}`}
                  />
                </div>
              </div>

              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
