export const actionType = {
  SEAT_BOOKING: "SEAT_BOOKING",
  ADD_BOOKING: "ADD_BOOKING",
};

const updateSeats = (numberOfSeats) => ({
  type: actionType.SEAT_BOOKING,
  numberOfSeats,
});

const addBooking = (date, seats, time, notes, bookingID) => ({
  type: actionType.ADD_BOOKING,
  date,
  seats,
  time,
  notes,
  bookingID,
})

export {
  updateSeats,
  addBooking,
};
