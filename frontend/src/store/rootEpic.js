import { combineEpics } from "redux-observable";
import restaurantEpic from "./restaurant/restaurantEpic";
import bookingEpic, { editReservation, getRestaurantHours } from "./booking/bookingEpic";

const rootEpic = combineEpics(
  restaurantEpic,
  bookingEpic,
  editReservation,
  getRestaurantHours,
  // pingEpic,
);

export default rootEpic;
