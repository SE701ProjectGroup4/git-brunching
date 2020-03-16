export const actionType = {
  ADD_RESTAURANTS: "ADD_RESTAURANTS",
};

const addRestaurants = (restaurants) => ({
  type: actionType.ADD_RESTAURANTS,
  restaurants,
});

export {
  addRestaurants,
};
