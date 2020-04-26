import { combineEpics } from "redux-observable";
import restaurantEpic, {
  fetchNewRestaurants, fetchPopularRestaurants, fetchOpenRestaurants, fetchSearchedRestaurants,
} from "./restaurant/restaurantEpic";
import bookingEpic, {
  editReservation, getAvailableHours, getRestaurantHours, getRestaurantBookings, getTableCapacity,
} from "./booking/bookingEpic";
import getRestaurantMenu from "./menu/menu"

/**
 * A root epic contains all of the epics
 * This is so that the store can run async calls through the middleware
 * Note that most epics don't have much error checking :)
 * @type {Epic<Action, T, void, any>}
 */
const rootEpic = combineEpics(
  restaurantEpic,
  fetchNewRestaurants,
  fetchOpenRestaurants,
  fetchPopularRestaurants,
  fetchSearchedRestaurants,
  bookingEpic,
  editReservation,
  getRestaurantHours,
  getAvailableHours,
  getRestaurantBookings,
  getTableCapacity,
  getRestaurantMenu
  // pingEpic,
);

export default rootEpic;
