import { combineReducers } from "redux";
import bookingReducer from "./booking/bookingReducer";

/**
 * A root reducer is used to allow multiple levels of reducers
 * @type {Reducer<CombinedState<unknown>>}
 */
const rootReducer = combineReducers({
  bookingReducer,
});

export default rootReducer;
