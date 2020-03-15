import React from "react";
import { useHistory } from "react-router";
import style from "./LandingPage.module.css";
import messages from "../general/textHolder";
import BookingEditPopupButton from "../booking/BookingEditPopupButton";
import RestaurantTile from "./RestaurantTile";
import changePath from "../general/helperFunctions";

const landingText = messages.landingPage;

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
        {landingText.header}
      </div>
      <div className={style.searchContainer}>
        {landingText.search}
        <BookingEditPopupButton IDSwitchMethod={toBooking} />
      </div>
      <RestaurantTile setRestaurant={setRestaurant} />
      {/* Probably make it it's own component */}
      <div className={style.footer}>
        {landingText.footer}
      </div>
    </div>
  );
};

export default LandingPage;
