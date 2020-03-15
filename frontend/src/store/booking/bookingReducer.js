import { actionType } from "./bookingActions";

const initialState = {
  numberOfSeats: null,
  date: null,
  seats: null,
  time: null,
  notes: null,
  bookingID: null,
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
    case actionType.ADD_BOOKING:
      return {
        ...state,
        date: action.date,
        seats: action.seats,
        time: action.time,
        notes: action.notes,
        bookingID: action.bookingID,
      };
    default:
      return {
        ...state,
      };
  }
};

export default bookingReducer;
