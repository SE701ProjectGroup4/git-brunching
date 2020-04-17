const HOST = "http://localhost:3001";

const GET_ALL_RESTAURANTS = `${HOST}/restaurant/`;
const GET_RESERVATION = `${HOST}/reservation/findreservation/`;
const DELETE_RESERVATION = `${HOST}/reservation/`;
const PUT_RESERVATION = `${HOST}/reservation/`;
const POST_RESERVATION = `${HOST}/reservation/`;
const USER = `${HOST}/user/`;
const RESTAURANT_BOOKING = (restaurantID) => `${HOST}/reservation?restaurantID=${restaurantID}`;
const RESTAURANT_HOURS = (restaurantID) => `${HOST}/restaurant/${restaurantID}/openhours`;
const FREE_TABLE = `${HOST}/table/free`;
const TABLE_ID = `${HOST}/reservation/available`;

export {
  GET_ALL_RESTAURANTS,
  HOST,
  GET_RESERVATION,
  DELETE_RESERVATION,
  PUT_RESERVATION,
  POST_RESERVATION,
  USER,
  RESTAURANT_BOOKING,
  RESTAURANT_HOURS,
  FREE_TABLE,
  TABLE_ID,
};
