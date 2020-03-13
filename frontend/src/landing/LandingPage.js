import React from "react";
import { useHistory } from "react-router";
import style from "./LandingPage.module.css";
import changePath from "../general/helperFunctions";
import messages from "../general/textHolder";
import BookingEditPopupButton from "../booking/BookingEditPopupButton";

const landingText = messages.landingPage;

const LandingPage = (props) => {
  const { setRestaurant } = props;
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

  return (
    <div className={style.landingPageContainer}>
      <div>
          <BookingEditPopupButton></BookingEditPopupButton>
      </div>
      <div className={style.header}>
        {landingText.header}
      </div>
      <div className={style.searchContainer}>
        {landingText.search}
      </div>
      <div className={style.tileContainer}>
        { fakeData.map((data) => (
          <div
            className={style.tile}
            key={`fake_data_${data.name}`}
            role="button"
            tabIndex={0}
            onClick={() => toBooking(data.name)}
          >
            {data.name}
          </div>
        ))}
      </div>
      {/* Probably make it it's own component */}
      <div className={style.footer}>
        {landingText.footer}
      </div>
    </div>
  );
};

export default LandingPage;
