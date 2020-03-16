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

  console.log(action);
  console.log(state);

  switch (action.type) {
    case actionType.ADD_RESTAURANTS:
      console.log("ADDING")
      return {
        ...state,
        isLoading: true,
      };
    case actionType.ADD_RESTAURANTS_SUCCESS:
      console.log("SUCCESS")
      return {
        ...state,
        restaurants: [...action.restaurants],
        isLoading: false,
      };
    case actionType.ADD_RESTAURANTS_FAIL:
      console.log("FAIL")
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export default restaurantReducer;
