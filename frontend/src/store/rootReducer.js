import { combineReducers } from "redux";
import bookingReducer from "./booking/bookingReducer";
import restaurantReducer from "./restaurant/restaurantReducer";
import { actionType } from "./booking/bookingActions";

/**
 * A root reducer is used to allow multiple levels of reducers
 * @type {Reducer<CombinedState<unknown>>}
 */
const appReducer = combineReducers({
  bookingReducer,
  restaurantReducer,
});

const rootReducer = (state, action) => {
  let stateCopy = { ...state };
  if (action.type === actionType.RESET_BOOKING) {
    stateCopy = undefined;
  }
  return appReducer(stateCopy, action);
};

export default rootReducer;
