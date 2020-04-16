const HOST = "http://localhost:3001";

const GET_ALL_RESTAURANTS = `${HOST}/restaurant/`;
const RESERVATION = `${HOST}/reservation/`;
const USER = `${HOST}/user/`;
const RESTAURANT_BOOKING = (restaurantID) => `${HOST}/reservation?restaurantID=${restaurantID}`;
const RESTAURANT_HOURS = (restaurantID) => `${HOST}/restaurant/${restaurantID}/openhours`;
const FREE_TABLE = `${HOST}/table/free`;

export {
  GET_ALL_RESTAURANTS,
  HOST,
  RESERVATION,
  USER,
  RESTAURANT_BOOKING,
  RESTAURANT_HOURS,
  FREE_TABLE,
};
