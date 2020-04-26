export const actionType = {
    GET_RESTAURANT_MENU: "GET_RESTAURANT_MENU",
    GET_RESTAURANT_MENU_SUCCESS: "GET_RESTAURANT_MENU_SUCCESS",
    GET_RESTAURANT_MENU_FAIL: "GET_RESTAURANT_MENU_FAIL"
  };
  
  const getMenu = (restaurantID) => ({
    type: actionType.GET_RESTAURANT_MENU,
    restaurantID: restaurantID
  });
  
export {
    getMenu
};