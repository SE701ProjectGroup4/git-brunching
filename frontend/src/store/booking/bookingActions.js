export const actionType = {
  ADD_BOOKING_TIME: "ADD_BOOKING_TIME",
  ADD_BOOKING_DETAILS: "ADD_BOOKING_DETAILS",
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

export {
  addBookingTime,
  addBookingDetails,
};
