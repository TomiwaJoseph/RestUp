// import React from "react";
import Hero from "../components/Hero";
import RestaurantIntro from "../components/RestaurantIntro";
import RestaurantMenu from "../components/RestaurantMenu";
import { hero } from "../data";

const Restaurant = () => {
  return (
    <>
      <Hero section={"Restaurant"} orient="top" img={hero.restaurant} />
      <RestaurantIntro />
      <RestaurantMenu />
    </>
  );
};

export default Restaurant;
