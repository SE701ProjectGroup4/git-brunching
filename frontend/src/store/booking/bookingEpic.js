import { catchError, filter, mergeMap } from "rxjs/operators";
import { actionType } from "./bookingActions";
import { GET_ALL_RESTAURANTS } from "../../general/config";

const addReservation = (action$, store) => action$.pipe(
  filter((action) => action.type === actionType.ADD_BOOKING),
  mergeMap(async (action) => {
    console.log("fuck");
    console.log(store);
    const restaurants = await fetch(GET_ALL_RESTAURANTS, {
      method: "POST",
      mode: "cors",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: "2020-01-20",
        time: "14:00:00",
        restaurantID: 300,
        numberOfGuests: 3,
        
      }),
    }).then((res) => res);

    console.log("waitingindgindsidnisnf")
    return { ...action, type: actionType.ADD_BOOKING_SUCCESS, restaurants };
  }),
  catchError((err) => Promise.resolve({
    type: actionType.ADD_BOOKING_FAIL,
    message: err.message,
  })),
);

export default addReservation;
