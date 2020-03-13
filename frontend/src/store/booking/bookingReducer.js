import { actionType } from "./bookingActions";

const initialState = {
  numberOfSeats: null,
};

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
