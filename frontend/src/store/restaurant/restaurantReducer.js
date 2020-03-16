import { actionType } from "./restaurantAction";

const initialState = {
  restaurants: [],
};

const restaurantReducer = (state, action) => {
  if (state == null) {
    return initialState;
  }

  switch (action.type) {
    case actionType.ADD_RESTAURANTS:
      return {
        ...state,
        restaurants: action.restaurants,
      };
    default:
      return { ...state };
  }
};

export default restaurantReducer;
