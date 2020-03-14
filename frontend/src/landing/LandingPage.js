import React from "react";
import { useHistory } from "react-router";
import style from "./LandingPage.module.css";
import changePath from "../general/helperFunctions";
import messages from "../general/textHolder";
import BookingEditPopupButton from "../booking/BookingEditPopupButton";

import RestaurantTile from "./RestaurantTile";

const landingText = messages.landingPage;

const LandingPage = (props) => {
  const { setRestaurant } = props;
<<<<<<< HEAD
  const history = useHistory();

  const toBooking = (restaurant) => {
    changePath("/booking", history);
    setRestaurant(restaurant);
  };

  const fakeData = [
    {
      name: "NANDOZ",
      times: [],
    },
    {
      name: "KCF",
      times: [],
    },
  ];

=======
  
>>>>>>> added styling to restaurant tile
  return (
    <div className={style.landingPageContainer}>
      <div className={style.header}>
        {landingText.header}
      </div>
      <div className={style.searchContainer}>
        {landingText.search}
        <BookingEditPopupButton IDSwitchMethod={toBooking} />
      </div>
      <RestaurantTile setRestaurant={setRestaurant}/>
      {/* Probably make it it's own component */}
      <div className={style.footer}>
        {landingText.footer}
      </div>
    </div>
  );
};

export default LandingPage;
