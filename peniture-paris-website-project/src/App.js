import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Stats from "./components/Stats";
import Features from "./components/Features";
import Projects from "./components/Projects";
import Offer from "./components/Offer";
import ProductsGrid from "./components/ProductsGrid";
import Feedback from "./components/Feedback";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Home id="home" />
      <Stats />
      <Features id="about" />
      <Projects />
      <Offer />
      <ProductsGrid id="products" />
      <Feedback />
      <FAQ id="faq" />
      <Contact id="contact" />
      <Footer />
    </>
  );
}

export default App;
