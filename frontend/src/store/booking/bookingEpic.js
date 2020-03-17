import {catchError, filter, mergeMap } from "rxjs/operators";
import { actionType } from "./bookingActions";
import { RESERVATION, USER } from "../../general/config";


const addReservation = (action$, store) => action$.pipe(
  filter((action) => action.type === actionType.ADD_BOOKING),
  mergeMap(async (action) => {
    const bookingData = store.value.bookingReducer;
    const restaurantData = store.value.restaurantReducer;

    const user = await fetch(USER, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: bookingData.name,
        lastName: " ",
        phone: bookingData.phone,
        email: bookingData.email,
      }),
    }).then((res) => res.json());

    const booking = await fetch(RESERVATION, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: "2020-03-20",
        time: "14:00:00",
        restaurantID: 300,
        numberOfGuests: 3,
        tableID: 300,
        userID: 300,
      }),
    }).then((res) => res.json());


    return { ...action, type: actionType.ADD_BOOKING_SUCCESS, booking };
  }),
  catchError((err) => Promise.resolve({
    type: actionType.ADD_BOOKING_FAIL,
    message: err.message,
  })),
);

const editReservation = (action$, store) => action$.pipe(
  filter((action) => action.type === actionType.EDIT_BOOKING),
  mergeMap(async (action) => {
    const bookingData = store.value.bookingReducer;
    const restaurantData = store.value.restaurantReducer;
    await fetch(USER, {
      method: "PUT",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: bookingData.name,
        lastName: " ",
        phone: bookingData.phone,
        email: bookingData.email,
        reservationID: bookingData.bookingCode,
      }),
    });

    console.log(bookingData.date)

    const booking = await fetch(`${RESERVATION}${bookingData.bookingCode}`, {
      method: "PUT",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: bookingData.date,
        time: "13:00:00",
        restaurantID: restaurantData.selected.ID,
        numberOfGuests: bookingData.seats,
        note: bookingData.notes,
      }),
    }).then((res) => res.json());

    return { ...action, type: actionType.EDIT_BOOKING_SUCCESS, booking };
  }),
  catchError((err) => Promise.resolve({
    type: actionType.EDIT_BOOKING_FAIL,
    message: err.message,
  })),
);

// todo:
// const getReservationByID = (action$, store) => action$.pipe(
//   filter((action) => action.type === actionType.GET_BOOKING_BY_REFERENCE),
//   mergeMap(async (action) => {
//     const restaurants = await fetch(`${RESERVATION}`).then((res) => res.json());
//     return { ...action, type: actionType.ADD_RESTAURANTS_SUCCESS, restaurants };
//   }),
//   catchError((err) => Promise.resolve({
//     type: actionType.ADD_RESTAURANTS_FAIL,
//     message: err.message,
//   })),
// );

export default addReservation;

export {
  editReservation,
};
