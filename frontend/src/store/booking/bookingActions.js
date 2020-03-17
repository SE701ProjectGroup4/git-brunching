export const actionType = {
  ADD_BOOKING_TIME: "ADD_BOOKING_TIME",
  ADD_BOOKING_DETAILS: "ADD_BOOKING_DETAILS",
  ADD_BOOKING: "ADD_BOOKING",
  ADD_BOOKING_SUCCESS: "ADD_BOOKING_SUCCESS",
  ADD_BOOKING_FAIL: "ADD_BOOKING_FAIL",
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

export {
  addBookingTime,
  addBookingDetails,
  createBooking,
};
