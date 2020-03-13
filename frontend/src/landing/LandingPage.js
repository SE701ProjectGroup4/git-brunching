import React from "react";
import style from "./LandingPage.module.css";
import messages from "../general/textHolder";
<<<<<<< HEAD
import BookingEditPopupButton from "../booking/BookingEditPopupButton";

=======
>>>>>>> created restaurant tile component
import RestaurantTile from "./RestaurantTile";

const landingText = messages.landingPage;

const LandingPage = (props) => {
  const { setRestaurant } = props;
<<<<<<< HEAD
<<<<<<< HEAD
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
=======

>>>>>>> fixed code formatting
=======

>>>>>>> fixed code formatting
  return (
    <div className={style.landingPageContainer}>
      <div className={style.header}>
        {landingText.header}
      </div>
      <div className={style.searchContainer}>
        {landingText.search}
        <BookingEditPopupButton IDSwitchMethod={toBooking} />
      </div>
<<<<<<< HEAD
      <RestaurantTile setRestaurant={setRestaurant} />
=======
      <RestaurantTile setRestaurant={setRestaurant}/>
>>>>>>> created restaurant tile component
      {/* Probably make it it's own component */}
      <div className={style.footer}>
        {landingText.footer}
      </div>
    </div>
  );
};

export default LandingPage;
