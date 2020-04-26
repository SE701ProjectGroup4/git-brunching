import { actionType } from "./menuActions";


const initialState = {
    menus: null,
    isLoading: false,
    error: null
  };
  
  /**
   * Gets called whenever a menu action has been made
   * This helps with showing the user when an API call is going on
   * @param state
   * @param action
   */
  const menuReducer = (state, action) => {
    if (state == null) {
      return initialState;
    }
  
    switch (action.type) {
      case actionType.GET_RESTAURANT_MENU:
        return {
          ...state,
          isLoading: true
        };
      case actionType.GET_RESTAURANT_MENU_SUCCESS:
        return {
          ...state,
          isLoading: false,
          menus: action.menus,
        };
        case actionType.GET_RESTAURANT_MENU_FAIL:
        return {
            ...state,
            isLoading: false,
            error: action.message
        };
      default:
        return { ...state };
    }
  };
  
  export default menuReducer;
  