import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import style from "./RestaurantViewBookingPage.module.css";
import { ReactComponent as Logo } from "../general/Logo2.svg";
import changePath from "../general/helperFunctions";
import deleteReservationByReference from "../landing/edit/services/deleteReservationByReference";
import getRestaurantByReference from "../landing/edit/services/getReservationByReference";
import { selectRestaurant, setMode } from "../store/restaurant/restaurantAction";
import getRestaurantByID from "../landing/edit/services/getRestaurantByID";
import ConfirmDeletePopupButton from "./ConfirmDeletePopupButton";
import {
  getRestaurantBookings,
  addBookingDate,
  addBookingDetails,
  addBookingSeats,
  addBookingTime,
  setBookingCode,
} from "../store/booking/bookingActions";

// const mockBookings = [
//   {
//     ID: "1ggj6ny4k7vpjq5s",
//     Date: "2020-03-19",
//     Time: "14:00:00",
//     Notes: "Sit next to window please",
//     NumberOfGuests: 2,
//     TableID: 300,
//     RestaurantID: 300,
//     Name: "Bob",
//     Phone: "027 1234 567",
//     Email: "bob@gmail.com",
//   },
//   {
//     ID: "1thes4k7vpjq5s",
//     Date: "2020-03-18",
//     Time: "19:00:00",
//     Notes: "I'm vegetarian yo",
//     NumberOfGuests: 5,
//     TableID: 200,
//     RestaurantID: 300,
//     Name: "Kelly",
//     Phone: "027 765 4321",
//     Email: "kelly@gmail.com",
//   },
//   {
//     ID: "ppisnotgood123",
//     Date: "2020-03-17",
//     Time: "15:00:00",
//     Notes: "I like to eat with door closed",
//     NumberOfGuests: 5,
//     TableID: 200,
//     RestaurantID: 300,
//     Name: "John Carpenter",
//     Phone: "027 123 1111",
//     Email: "johnny@gmail.com",
//   },
// ];

const RestaurantViewBookingPage = (props) => {
  const history = useHistory();
  const [isError, changeError] = useState(false); // TODO: Do something with error state e.g. display different screen
  const restaurantID = 1;

  const {
    isLoading, restaurantBookings, select, changeMode, getBookings,
    addTime, addSeats, addDate, addDetails, setReservationCode,
    currentRestaurantID,
  } = props;

  useEffect(() => {
    getBookings(restaurantID);
  }, []);

  const handleDeleteBooking = (bookingID) => {
    deleteReservationByReference(bookingID).then(() => {
      getBookings(currentRestaurantID);
    });
  };

  /**
   * Switches page to the specified restaurant booking page
   */
  const handleEditBooking = (bookingID) => {
    getRestaurantByReference(bookingID).then((r) => {
      setReservationCode(bookingID);
      const data = r.result[0];
      if (data !== undefined) {
        getRestaurantByID(data.RestaurantID).then((restaurant) => {
          const restaurantData = restaurant[0];
          select({ ID: restaurantData.ID, Name: restaurantData.Name });
          addTime(data.Time);
          addSeats(data.NumberOfGuests);
          addDate(data.Date);
          addDetails(data.Name, data.Phone, data.Email, data.Notes);
          changeMode("EDIT");
          changePath("/booking", history);
        }).catch(() => {
          changeError(true);
        });
      } else {
        changeError(true);
      }
    });
  };

  const createBookingItem = (
    id,
    date,
    time,
    notes,
    numberOfGuests,
    tableID,
    name,
    phone,
    email,
  ) => (
    <div className={style.bookingContainer}>
      <div>
        <span className={style.bookingCode}>{`Booking Code: ${id}`}</span>
      </div>
      <div>
        <span className={style.date}>{`${date.substring(0, 10)}`}</span>
        <span className={style.time}>{time}</span>
      </div>
      <div className={style.userDetails}>
        <p>
          Name:
          {" "}
          {name}
          {" "}
          <br />
          Phone:
          {" "}
          {phone}
          {" "}
          <br />
          Email:
          {" "}
          {email}
          {" "}
          <br />
          Guests:
          {" "}
          {numberOfGuests}
          {" "}
          <br />
          <span className={style.notes}>{`Notes: ${notes}`}</span>
        </p>
      </div>
      <div className={style.buttonWrapper}>
        <Button className={style.secondaryButton} variant="contained" onClick={() => handleEditBooking(id)}>
          Modify
        </Button>
        <ConfirmDeletePopupButton onDelete={() => handleDeleteBooking(id)} />
      </div>
    </div>
  );

  return (
    <div className={style.container}>
      <div className={style.contentContainer}>
        <div className={style.headerContainer}>
          <div className={style.header}>
            <div className={style.logo} onClick={() => changePath("/", history)}>
              <Logo />
            </div>
            <h1 className={style.restaurantName}>El Pirata Porch</h1>
          </div>
          {isLoading
            ? (
              <div>
                <p> Loading </p>
              </div>
            )
            : (
              <div className={style.listWrapper}>
                <ul className={style.bookingList}>
                  {restaurantBookings.length === 0
                    ? (
                      <li>
                        <span> No bookings found </span>
                      </li>
                    )
                    : restaurantBookings.map((booking) => (
                      <li className={style.booking} key={booking.ID}>
                        {createBookingItem(
                          booking.ID,
                          booking.Date,
                          booking.Time,
                          booking.Notes,
                          booking.NumberOfGuests,
                          booking.TableID,
                          booking.Name,
                          booking.Phone,
                          booking.Email,
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.bookingReducer.loading,
  restaurantBookings: state.bookingReducer.restaurantBookings,
  currentRestaurantID: state.bookingReducer.currentRestaurantID,
});

const mapDispatchToProps = (dispatch) => ({
  addTime: (time) => { dispatch(addBookingTime(time)); },
  addSeats: (seats) => { dispatch(addBookingSeats(seats)); },
  addDate: (date) => { dispatch(addBookingDate(date)); },
  addDetails: (name, phone, email, notes) => {
    dispatch(addBookingDetails(name, phone, email, notes));
  },
  select: (restaurant) => dispatch(selectRestaurant(restaurant)),
  changeMode: (mode) => dispatch(setMode(mode)),
  setReservationCode: (code) => dispatch(setBookingCode(code)),
  getBookings: (restaurantID) => { dispatch(getRestaurantBookings(restaurantID)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantViewBookingPage);
