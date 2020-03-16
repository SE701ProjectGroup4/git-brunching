import React from "react";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import style from "./LandingPage.module.css";
import BookingEditPopupButton from "./edit/BookingEditPopupButton";
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
          <div className={style.buttonHolder}>
            <BookingEditPopupButton IDSwitchMethod={toBooking} />
            <div>
              <Button
                variant="outlined"
                className={style.restaurantButton}
                onClick={() => changePath("/restaurant", history)}
              >
                {/* Todo replace with something else */}
                RESTAURANT
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={style.content}>
        <RestaurantTile setRestaurant={setRestaurant} />
      </div>
    </div>
  );
};

export default LandingPage;
