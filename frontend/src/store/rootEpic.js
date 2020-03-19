import { combineEpics } from "redux-observable";
import restaurantEpic from "./restaurant/restaurantEpic";
import bookingEpic, { editReservation, getAvailableHours, getRestaurantHours } from "./booking/bookingEpic";

/**
 * A root epic contains all of the epics
 * This is so that the store can run async calls through the middleware
 * Note that most epics don't have much error checking :)
 * @type {Epic<Action, T, void, any>}
 */
const rootEpic = combineEpics(
  restaurantEpic,
  bookingEpic,
  editReservation,
  getRestaurantHours,
  getAvailableHours,
  // pingEpic,
);

export default rootEpic;
