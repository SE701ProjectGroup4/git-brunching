import { actionType } from "./bookingActions";

const initialState = {
  numberOfSeats: null,
};

/**
 * The reducer gets called whenever an action has been made
 * The bookingReducer will apply the new state to whatever is in the bookings section
 * @param state
 * @param action
 * @returns {{numberOfSeats: null}}
 */
const bookingReducer = (state, action) => {
  if (state == null) {
    return initialState;
  }
  switch (action.type) {
    case actionType.SEAT_BOOKING:
      return {
        ...state,
        numberOfSeats: action.numberOfSeats,
      };
    default:
      return {
        ...state,
      };
  }
};

export default bookingReducer;
