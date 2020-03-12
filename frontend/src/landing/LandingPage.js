import React from "react";
import { useHistory } from "react-router";
import style from "./LandingPage.module.css";
import changePath from "../general/helperFunctions";

const LandingPage = (props) => {
  const { setRestaurant } = props;
  const history = useHistory();
  const toBooking = (restaurant) => {
    changePath("/booking", history);
    setRestaurant(restaurant);
  };

  return (
    <div className={style.landingPageContainer}>
      <div className={style.header}>
        This is the header
      </div>
      <div className={style.searchContainer}>
        This is the search and edit
      </div>
      <div className={style.tileContainer}>
        {/* Placeholder for tiles */}
        <div
          className={style.tile}
          role="button"
          tabIndex={0}
          onClick={() => toBooking("Nandoz")}
        >
          NANDOZ
        </div>
        <div
          tabIndex={0}
          className={style.tile}
          role="button"
          onClick={() => toBooking("KCF")}
        >
          KCF
        </div>
      </div>
      {/* Probably make it it's own component */}
      <div className={style.footer}>
        Footer
      </div>
    </div>
  );
};

export default LandingPage;
