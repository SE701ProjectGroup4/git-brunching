import React from "react";
import { useHistory } from "react-router";
import TextField from "@material-ui/core/TextField";
import style from "./LandingPage.module.css";
import messages from "../general/textHolder";
import BookingEditPopupButton from "../booking/BookingEditPopupButton";
import RestaurantTile from "./RestaurantTile";
import changePath from "../general/helperFunctions";
import Logo from "../general/Logo";
import SearchBar from "./SearchBar";

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
        <div className={style.titleContainer}>
          <div className={style.logo}>
            <Logo />
          </div>
          <p className={style.title}>GIT BRUNCHING</p>
        </div>
        <div className={style.searchContainer}>
          {/*<TextField*/}
          {/*  id="standard-search"*/}
          {/*  variant="filled"*/}
          {/*  label="Search field"*/}
          {/*  type="search"*/}
          {/*  className={style.search}*/}
          {/*/>*/}
          <SearchBar />
          <BookingEditPopupButton IDSwitchMethod={toBooking} />
        </div>
      </div>
      <div className={style.content}>
        <RestaurantTile setRestaurant={setRestaurant} />
      </div>
      {/* Probably make it it's own component */}
      <div className={style.footer}>
        {landingText.footer}
      </div>
    </div>
  );
};

export default LandingPage;
