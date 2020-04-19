const HOST = "http://localhost:3001";

const GET_ALL_RESTAURANTS = `${HOST}/restaurant/`;
const GET_RESERVATION = (reservationID) => `${HOST}/reservation/?reservationID=${reservationID}`;
const DELETE_RESERVATION = `${HOST}/reservation/`;
const PUT_RESERVATION = `${HOST}/reservation/`;
const POST_RESERVATION = `${HOST}/reservation/`;
const USER = `${HOST}/user/`;
const RESTAURANT_BOOKING = (restaurantID) => `${HOST}/reservation/restaurant?restaurantID=${restaurantID}`;
const RESTAURANT_HOURS = (restaurantID) => `${HOST}/restaurant/${restaurantID}/openhours`;
const FREE_TABLE = `${HOST}/table/free`;
const TABLE_ID = `${HOST}/reservation/available`;
const TABLE_CAPACITY = (restaurantID) => `${HOST}/restaurant/${restaurantID}/capacity`;

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
  TABLE_CAPACITY,
};
