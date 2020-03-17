import React from "react";
import style from "./RestaurantViewBookingPage.module.css";
import Button from "@material-ui/core/Button";
import { ReactComponent as Logo } from "../general/Logo2.svg";

const mockBookings = [
  {
    ID: "1ggj6ny4k7vpjq5s",
    Date: "2020-03-19",
    Time: "14:00:00",
    Notes: "Sit next to window please",
    NumberOfGuests: 2,
    TableID: 300,
    RestaurantID: 300,
    Name: "Bob",
    Phone: "027 1234 567",
    Email: "bob@gmail.com"
  },
  {
    ID: "1thes4k7vpjq5s",
    Date: "2020-03-18",
    Time: "19:00:00",
    Notes: "I'm vegetarian yo",
    NumberOfGuests: 5,
    TableID: 200,
    RestaurantID: 300,
    Name: "Kelly",
    Phone: "027 765 4321",
    Email: "kelly@gmail.com"
  },
  {
    ID: "ppisnotgood123",
    Date: "2020-03-17",
    Time: "15:00:00",
    Notes: "I like to eat with door closed",
    NumberOfGuests: 5,
    TableID: 200,
    RestaurantID: 300,
    Name: "John Carpenter",
    Phone: "027 123 1111",
    Email: "johnny@gmail.com"
  }
];

const RestaurantViewBookingPage = () => {
  const createBookingItem = (
    id,
    date,
    time,
    notes,
    numberOfGuests,
    tableID,
    name,
    phone,
    email
  ) => {
    return (
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
            Name: {name} <br />
            Phone: {phone} <br />
            Email: {email} <br />
            Guests: {numberOfGuests} <br />
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
  };

  return (
    <div className={style.container}>
      <div className={style.contentContainer}>
        <div className={style.headerContainer}>
          <div className={style.header}>
            <div className={style.logo}>
              <Logo />
            </div>
            <h1 className={style.restaurantName}>El Pirata Porch</h1>
          </div>
          <div className={style.listWrapper}>
            <ul className={style.bookingList}>
              {mockBookings.map(booking => (
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
                    booking.Email
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantViewBookingPage;
