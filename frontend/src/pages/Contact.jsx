import Hero from "../components/Hero";
import { hero } from "../data";
import "./page-styles.css";
import { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  return (
    <>
      <Hero section={"Contact Us"} orient={"top"} img={hero.contact} />
      <h1>Contact Us</h1>
    </>
  );
};

export default Contact;
