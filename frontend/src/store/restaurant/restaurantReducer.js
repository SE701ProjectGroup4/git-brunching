import { actionType } from "./restaurantAction";

const initialState = {
  restaurants: [],
  isLoading: false,
  error: null,
  selected: null,
  mode: "",
};

/**
 * Gets called whenever a restaurant action has been made
 * This helps with showing the user when an API call is going on
 * @param state
 * @param action
 */
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
    case actionType.SELECT_RESTAURANTS:
      return {
        ...state,
        selected: action.selected,
      };
    case actionType.SET_MODE:
      return {
        ...state,
        mode: action.mode,
      };
    default:
      return { ...state };
  }
};

export default restaurantReducer;
