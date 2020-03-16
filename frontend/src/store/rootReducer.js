import { combineReducers } from "redux";
import bookingReducer from "./booking/bookingReducer";
import restaurantReducer from "./restaurant/restaurantReducer";

/**
 * A root reducer is used to allow multiple levels of reducers
 * @type {Reducer<CombinedState<unknown>>}
 */
const rootReducer = combineReducers({
  bookingReducer,
  restaurantReducer,
});

export default rootReducer;
