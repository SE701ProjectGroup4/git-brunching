export const actionType = {
  ADD_RESTAURANTS: "ADD_RESTAURANTS",
  ADD_POPULAR_RESTAURANTS: "ADD_POPULAR_RESTAURANTS",
  ADD_NEW_RESTAURANTS: "ADD_NEW_RESTAURANTS",
  ADD_OPEN_RESTAURANTS: "ADD_OPEN_RESTAURANTS",
  ADD_SEARCH_RESTAURANTS: "ADD_SEARCH_RESTAURANTS",
  ADD_RESTAURANTS_SUCCESS: "ADD_RESTAURANTS_SUCCESS",
  ADD_POPULAR_RESTAURANTS_SUCCESS: "ADD_POPULAR_RESTAURANTS_SUCCESS",
  ADD_NEW_RESTAURANTS_SUCCESS: "ADD_NEW_RESTAURANTS_SUCCESS",
  ADD_OPEN_RESTAURANTS_SUCCESS: "ADD_OPEN_RESTAURANTS_SUCCESS",
  ADD_RESTAURANTS_FAIL: "ADD_RESTAURANTS_FAIL",
  SELECT_RESTAURANTS: "SELECT_RESTAURANTS",
  SET_MODE: "SET_MODE",
};

const getRestaurants = () => ({
  type: actionType.ADD_RESTAURANTS,
});

const getPopularRestaurants = () => ({
  type: actionType.ADD_POPULAR_RESTAURANTS,
});

const getNewRestaurants = () => ({
  type: actionType.ADD_NEW_RESTAURANTS,
});

const getOpenRestaurants = () => ({
  type: actionType.ADD_OPEN_RESTAURANTS,
});

const selectRestaurant = (selected) => ({
  type: actionType.SELECT_RESTAURANTS,
  selected,
});

const setMode = (mode) => ({
  type: actionType.SET_MODE,
  mode,
});

const getSearchRestaurants = (searchText) => ({
  type: actionType.ADD_SEARCH_RESTAURANTS,
  searchText,
});


export {
  getRestaurants,
  getPopularRestaurants,
  getNewRestaurants,
  getOpenRestaurants,
  getSearchRestaurants,
  selectRestaurant,
  setMode,
};
