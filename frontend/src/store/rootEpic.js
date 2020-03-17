import { combineEpics } from "redux-observable";
import restaurantEpic from "./restaurant/restaurantEpic";
import bookingEpic, { editReservation } from "./booking/bookingEpic";

const rootEpic = combineEpics(
  restaurantEpic,
  bookingEpic,
  editReservation,
  // pingEpic,
);

export default rootEpic;
