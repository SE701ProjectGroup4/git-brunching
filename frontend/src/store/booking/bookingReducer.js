import { format } from "date-fns";
import { actionType } from "./bookingActions";

const initialState = {
  date: format(new Date(Date.now()), "yyyy-MM-dd"),
  seats: "",
  time: "",
  name: null,
  phone: null,
  email: null,
  notes: null,

  booking: null,
  error: null,
  loading: false,
  bookingCode: "",
  currentRestaurantID: 0,
  restaurantBookings: [],
  restaurantHours: [],
  availableRestaurantHours: [],
  tableCapacity: [],
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
        time: action.time,
      };
    case actionType.ADD_BOOKING_DATE:
      return {
        ...state,
        // Sometimes the format is weird so we grab the first 10 chars
        // Format: yyyy-MM-dd
        date: action.date.substring(0, 10),
      };
    case actionType.ADD_BOOKING_SEATS:
      return {
        ...state,
        seats: action.seats,
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
    case actionType.GET_RESTAURANT_BOOKINGS:
      return {
        ...state,
        loading: true,
        currentRestaurantID: action.restaurantID,
      };
    case actionType.GET_RESTAURANT_BOOKINGS_SUCCCESS:
      return {
        ...state,
        loading: false,
        restaurantBookings: action.restaurantBookings,
      };
    case actionType.GET_RESTAURANT_BOOKINGS_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionType.GET_RESTAURANT_HOURS:
      return {
        ...state,
        loading: true,
      };
    case actionType.GET_RESTAURANT_HOURS_SUCCESS:
      return {
        ...state,
        restaurantHours: action.restaurantHours,
        loading: false,
      };
    case actionType.GET_RESTAURANT_HOURS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionType.GET_AVAILABLE_RESTAURANT_HOURS:
      return {
        ...state,
        loading: true,
      };
    case actionType.GET_AVAILABLE_RESTAURANT_HOURS_SUCCESS:
      return {
        ...state,
        availableRestaurantHours: action.availableRestaurantHours,
        loading: false,
      };
    case actionType.GET_AVAILABLE_RESTAURANT_HOURS_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionType.GET_TABLE_CAPACITY:
      return {
        ...state,
        loading: true,
      };
    case actionType.GET_TABLE_CAPACITY_SUCCESS:
      return {
        ...state,
        tableCapacity: action.tableCapacity[0],
        loading: false,
      };
    case actionType.GET_TABLE_CAPACITY_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default bookingReducer;
