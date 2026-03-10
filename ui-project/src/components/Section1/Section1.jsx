import React from "react";
import Navbar from "./Navbar";
import Page1Content from "./Page1Content";

const Section1 = (props) => {
  return <div className="h-screen w-full bg-white">
    <Navbar />
    <Page1Content card_details={props.card_details} />
  </div>;
};

export default Section1;
