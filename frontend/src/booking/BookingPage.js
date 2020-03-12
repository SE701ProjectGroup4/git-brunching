import React from "react";
import NotFound from "../general/NotFound";

const renderPage = (currentRestaurant) => {
  switch (currentRestaurant) {
    case "Nandoz":
      return (
        <div>
          Nandoz
        </div>
      );
    case "KCF":
      return (
        <div>
          KCF
        </div>
      );
    default:
      return <NotFound />;
  }
};

const BookingPage = (props) => {
  const { currentRestaurant } = props;
  return (
    <div>
      {renderPage(currentRestaurant)}
    </div>
  );
};

export default BookingPage;
