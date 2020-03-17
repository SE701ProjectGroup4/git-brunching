export const actionType = {
  ADD_RESTAURANTS: "ADD_RESTAURANTS",
  ADD_RESTAURANTS_SUCCESS: "ADD_RESTAURANTS_SUCCESS",
  ADD_RESTAURANTS_FAIL: "ADD_RESTAURANTS_FAIL",
  SELECT_RESTAURANTS: "SELECT_RESTAURANTS",
};

const getRestaurants = () => ({
  type: actionType.ADD_RESTAURANTS,
});

const selectRestaurant = (selected) => ({
  type: actionType.SELECT_RESTAURANTS,
  selected,
});

const addRestaurants = (restaurants) => ({
  type: actionType.ADD_RESTAURANTS_SUCCESS,
  restaurants,
});

const addRestaurantsFail = (message) => ({
  type: actionType.ADD_RESTAURANTS_FAIL,
  payload: message,
});

export {
  addRestaurants,
  getRestaurants,
  addRestaurantsFail,
  selectRestaurant,
};
