import React from "react";
import style from "./LandingPage.module.css";

/**
 * Placeholder component for having no restaurants
 * @returns {*}
 * @constructor
 */
const NoRestaurants = ({ title }) => {
  return (
    <div className={style.carouselContainer}>
      <p className={style.titleText}>{title}</p>
      <p>No restaurants found.</p>
    </div>
  );
};

export default NoRestaurants;
