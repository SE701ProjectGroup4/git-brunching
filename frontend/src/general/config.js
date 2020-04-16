const HOST = "http://localhost:3001";

const GET_ALL_RESTAURANTS = `${HOST}/restaurant/`;
const RESERVATION = `${HOST}/reservation/`;
const USER = `${HOST}/user/`;
const RESTAURANT_HOURS = (restaurantID) => `${HOST}/restaurant/${restaurantID}/openhours`;
const FREE_TABLE = `${HOST}/table/free`;
const TABLE_ID = `${HOST}/reservation/available`;

export {
  GET_ALL_RESTAURANTS,
  HOST,
  RESERVATION,
  USER,
  RESTAURANT_HOURS,
  FREE_TABLE,
  TABLE_ID
};
