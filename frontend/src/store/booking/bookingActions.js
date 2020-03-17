export const actionType = {
  ADD_BOOKING_TIME: "ADD_BOOKING_TIME",
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
};

const addBookingTime = (date, seats, time) => ({
  type: actionType.ADD_BOOKING_TIME,
  date,
  seats,
  time,
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

const getBookingByReference = (booking) => ({
  type: actionType.GET_BOOKING_BY_REFERENCE,
  booking,
});

export {
  addBookingTime,
  addBookingDetails,
  createBooking,
  getBookingByReference,
  editBooking,
  setBookingCode,
  resetBooking,
};
