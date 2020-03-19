import { combineEpics } from "redux-observable";
import restaurantEpic from "./restaurant/restaurantEpic";
import bookingEpic, { editReservation, getAvailableHours, getRestaurantHours } from "./booking/bookingEpic";

const rootEpic = combineEpics(
  restaurantEpic,
  bookingEpic,
  editReservation,
  getRestaurantHours,
  getAvailableHours,
  // pingEpic,
);

export default rootEpic;
