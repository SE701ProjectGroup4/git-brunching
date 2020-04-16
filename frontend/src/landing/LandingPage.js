import React from "react";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import style from "./LandingPage.module.css";
import BookingEditPopupButton from "./edit/BookingEditPopupButton";
import RestaurantTile from "./RestaurantTile";
import changePath from "../general/helperFunctions";
import SearchBar from "./SearchBar";
import { ReactComponent as Logo2 } from "../general/Logo2.svg";
import { getRestaurantBookings } from "../store/booking/bookingActions";


const LandingPage = (props) => {
  const { setRestaurant, onRestaurantClicked } = props;
  const history = useHistory();
  const restaurantID = 1;

  const toBooking = () => {
    changePath("/booking", history);
  };

  const toRestaurants = () => {
    onRestaurantClicked(restaurantID);
    changePath("/restaurant", history);
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
                className={style.secondaryButton}
                onClick={() => toRestaurants()}
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


const mapDispatchToProps = (dispatch) => ({
  onRestaurantClicked: (restaurantID) => { dispatch(getRestaurantBookings(restaurantID)); },
});

export default connect(null, mapDispatchToProps)(LandingPage);
