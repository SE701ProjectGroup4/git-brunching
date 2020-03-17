import {catchError, filter, mergeMap } from "rxjs/operators";
import { actionType } from "./bookingActions";
import {GET_ALL_RESTAURANTS, RESERVATION} from "../../general/config";

const addReservation = (action$, store) => action$.pipe(
  filter((action) => action.type === actionType.ADD_BOOKING),
  mergeMap(async (action) => {
    const bookingData = store.value.bookingReducer;
    const restaurantData = store.value.restaurantReducer;

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
        restaurantID: restaurantData.selected.ID,
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

// export {
//   getReservationByID,
// }
