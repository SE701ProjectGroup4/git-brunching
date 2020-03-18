import { actionType } from "./bookingActions";

const initialState = {
  date: null,
  seats: null,
  time: null,
  name: null,
  phone: null,
  email: null,
  notes: null,

  booking: null,
  error: null,
  loading: false,
  bookingCode: "",
};

/**
 * The reducer gets called whenever an action has been made
 * The bookingReducer will apply the new state to whatever is in the bookings section
 * @param state
 * @param action
 */
const bookingReducer = (state, action) => {
  if (state == null) {
    return initialState;
  }

  switch (action.type) {
    case actionType.ADD_BOOKING_TIME:
      return {
        ...state,
        date: action.date,
        seats: action.seats,
        time: action.time,
      };
    case actionType.ADD_BOOKING_DETAILS:
      return {
        ...state,
        name: action.name,
        phone: action.phone,
        email: action.email,
        notes: action.notes,
      };
    case actionType.ADD_BOOKING:
      return {
        ...state,
        loading: true,
      };
    case actionType.ADD_BOOKING_SUCCESS:
      return {
        ...state,
        booking: action.booking,
        loading: false,
      };
    case actionType.ADD_BOOKING_FAIL:
      return {
        ...state,
        error: action.statusText,
        loading: false,
      };
    case actionType.EDIT_BOOKING:
      return {
        ...state,
        loading: true,
      };
    case actionType.EDIT_BOOKING_SUCCESS:
      return {
        ...state,
        booking: action.booking,
        loading: false,
      };
    case actionType.EDIT_BOOKING_FAIL:
      return {
        ...state,
        error: action.statusText,
        loading: false,
      };
    case actionType.GET_BOOKING_BY_REFERENCE:
      return {
        ...state,
      };
    case actionType.SET_BOOKING_CODE:
      return {
        ...state,
        bookingCode: action.bookingCode,
      };
    default:
      return {
        ...state,
      };
  }
};

export default bookingReducer;
