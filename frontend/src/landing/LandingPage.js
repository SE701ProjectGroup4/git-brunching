import React from "react";
import { useHistory } from "react-router";
import style from "./LandingPage.module.css";
import BookingEditPopupButton from "../booking/BookingEditPopupButton";
import RestaurantTile from "./RestaurantTile";
import changePath from "../general/helperFunctions";
import SearchBar from "./SearchBar";
import { ReactComponent as Logo2 } from "../general/Logo2.svg";

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
        <div className={style.titleContainer}>
          <div className={style.logo}>
            <Logo2 />
          </div>
        </div>
        <div className={style.searchContainer}>
          <SearchBar />
          <BookingEditPopupButton IDSwitchMethod={toBooking} />
        </div>
      </div>
      <div className={style.content}>
        <RestaurantTile setRestaurant={setRestaurant} />
      </div>
      {/* Probably make it it's own component */}
    </div>
  );
};

export default LandingPage;
