import { combineEpics } from "redux-observable";
import restaurantEpic from "./restaurant/restaurantEpic";
import bookingEpic from "./booking/bookingEpic";

const rootEpic = combineEpics(
  restaurantEpic,
  bookingEpic,
  // pingEpic,
);

export default rootEpic;
