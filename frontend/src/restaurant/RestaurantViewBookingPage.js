import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import style from "./RestaurantViewBookingPage.module.css";
import { ReactComponent as Logo } from "../general/Logo2.svg";
import changePath from "../general/helperFunctions";


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

  const { isLoading, restaurantBookings } = props;

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
        <span className={style.date}>{`${date}`}</span>
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
        <Button className={style.secondaryButton} variant="contained">
          Modify
        </Button>
        <Button className={style.secondaryButton} variant="contained">
          Delete
        </Button>
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
});

export default connect(mapStateToProps)(RestaurantViewBookingPage);
