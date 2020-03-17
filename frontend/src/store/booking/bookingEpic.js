import {catchError, filter, mergeMap } from "rxjs/operators";
import { actionType } from "./bookingActions";
import { POST_RESERVATION } from "../../general/config";

const addReservation = (action$, store) => action$.pipe(
  filter((action) => action.type === actionType.ADD_BOOKING),
  mergeMap(async (action) => {
    const booking = await fetch(POST_RESERVATION, {
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

export default addReservation;
