const HOST = "http://localhost:3001";

const GET_ALL_RESTAURANTS = `${HOST}/restaurant/`;
const RESERVATION = `${HOST}/reservation/`;
const USER = `${HOST}/user/`;
const RESTAURANT_HOURS = (restaurantID) => `${HOST}/restaurant/${restaurantID}/openhours`;

export {
  GET_ALL_RESTAURANTS,
  HOST,
  RESERVATION,
  USER,
  RESTAURANT_HOURS,
};
