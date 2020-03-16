import { actionType } from "./restaurantAction";

const initialState = {
  restaurants: [],
  isLoading: false,
  error: null,
};

const restaurantReducer = (state, action) => {
  if (state == null) {
    return initialState;
  }

  switch (action.type) {
    case actionType.ADD_RESTAURANTS:
      return {
        ...state,
        isLoading: true,
      };
    case actionType.ADD_RESTAURANTS_SUCCESS:
      return {
        ...state,
        restaurants: [...action.restaurants],
        isLoading: false,
      };
    case actionType.ADD_RESTAURANTS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.message,
      };
    default:
      return { ...state };
  }
};

export default restaurantReducer;
