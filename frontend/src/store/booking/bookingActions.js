export const actionType = {
  ADD_BOOKING_TIME: "ADD_BOOKING_TIME",
  ADD_BOOKING_DATE: "ADD_BOOKING_DATE",
  ADD_BOOKING_SEATS: "ADD_BOOKING_SEATS",
  ADD_BOOKING_DETAILS: "ADD_BOOKING_DETAILS",
  ADD_BOOKING: "ADD_BOOKING",
  ADD_BOOKING_SUCCESS: "ADD_BOOKING_SUCCESS",
  ADD_BOOKING_FAIL: "ADD_BOOKING_FAIL",
  EDIT_BOOKING: "EDIT_BOOKING",
  EDIT_BOOKING_SUCCESS: "EDIT_BOOKING_SUCCESS",
  EDIT_BOOKING_FAIL: "EDIT_BOOKING_FAIL",
  GET_BOOKING_BY_REFERENCE: "GET_BOOKING_BY_REFERENCE",
  SET_BOOKING_CODE: "SET_BOOKING_CODE",
  RESET_BOOKING: "RESET_BOOKING",
  GET_RESTAURANT_HOURS: "GET_RESTAURANT_HOURS",
  GET_RESTAURANT_HOURS_SUCCESS: "GET_RESTAURANT_HOURS_SUCCESS",
  GET_RESTAURANT_HOURS_FAIL: "GET_RESTAURANT_HOURS_FAIL",
  GET_AVAILABLE_RESTAURANT_HOURS: "GET_AVAILABLE_RESTAURANT_HOURS",
  GET_AVAILABLE_RESTAURANT_HOURS_SUCCESS: "GET_AVAILABLE_RESTAURANT_HOURS_SUCCESS",
  GET_AVAILABLE_RESTAURANT_HOURS_FAIL: "GET_AVAILABLE_RESTAURANT_HOURS_FAIL",

};

const addBookingTime = (time) => ({
  type: actionType.ADD_BOOKING_TIME,
  time,
});

const addBookingDate = (date) => ({
  type: actionType.ADD_BOOKING_DATE,
  date,
});

const addBookingSeats = (seats) => ({
  type: actionType.ADD_BOOKING_SEATS,
  seats,
});

const addBookingDetails = (name, phone, email, notes) => ({
  type: actionType.ADD_BOOKING_DETAILS,
  name,
  phone,
  email,
  notes,
});

const createBooking = () => ({
  type: actionType.ADD_BOOKING,
});

const editBooking = () => ({
  type: actionType.EDIT_BOOKING,
});

const setBookingCode = (bookingCode) => ({
  type: actionType.SET_BOOKING_CODE,
  bookingCode,
});

const resetBooking = () => ({
  type: actionType.RESET_BOOKING,
});

const getRestaurantHours = () => ({
  type: actionType.GET_RESTAURANT_HOURS,
});

const getAvailableHours = () => ({
  type: actionType.GET_AVAILABLE_RESTAURANT_HOURS,
});

const getBookingByReference = (booking) => ({
  type: actionType.GET_BOOKING_BY_REFERENCE,
  booking,
});

export {
  addBookingTime,
  addBookingDate,
  addBookingSeats,
  addBookingDetails,
  createBooking,
  getBookingByReference,
  editBooking,
  setBookingCode,
  resetBooking,
  getRestaurantHours,
  getAvailableHours,
};
