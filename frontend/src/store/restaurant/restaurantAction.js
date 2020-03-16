export const actionType = {
  ADD_RESTAURANTS: "ADD_RESTAURANTS",
  ADD_RESTAURANTS_SUCCESS: "ADD_RESTAURANTS_SUCCESS",
  ADD_RESTAURANTS_FAIL: "ADD_RESTAURANTS_FAIL",
};

const getRestaurants = () => {
  console.log("goes here")
  return ({
    type: actionType.ADD_RESTAURANTS,
  });
}

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
};
