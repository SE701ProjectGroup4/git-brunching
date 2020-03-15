export const actionType = {
  SEAT_BOOKING: "SEAT_BOOKING",
};

const updateSeats = (numberOfSeats) => ({
  type: actionType.SEAT_BOOKING,
  numberOfSeats,
});

export {
  updateSeats,
};
