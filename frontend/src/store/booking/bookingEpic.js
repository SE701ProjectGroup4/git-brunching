import { catchError, filter, mergeMap } from "rxjs/operators";
import { actionType } from "./bookingActions";

import {
  FREE_TABLE, POST_RESERVATION, PUT_RESERVATION, RESTAURANT_BOOKING, RESTAURANT_HOURS, TABLE_ID, TABLE_CAPACITY,
} from "../../general/config";

/**
 * Asynchronous call for a POST request.
 * This creates a booking and inserting it into the API
 * @param action$
 * @param store
 * @returns {*}
 */
const addReservation = (action$, store) => action$.pipe(
  filter((action) => action.type === actionType.ADD_BOOKING),
  mergeMap(async (action) => {
    const bookingData = store.value.bookingReducer;
    const restaurantData = store.value.restaurantReducer;

    const tableIDEndpoint = `${TABLE_ID.toString()}?date=${bookingData.date}&time=${bookingData.time.substring(0, 2)}&numberOfGuests=${bookingData.seats}&restaurantID=${restaurantData.selected.ID}`;

    const tableID = await fetch(tableIDEndpoint, {
      method: "GET",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    const booking = await fetch(POST_RESERVATION, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: bookingData.date,
        time: bookingData.time,
        restaurantID: restaurantData.selected.ID,
        numberOfGuests: bookingData.seats,
        tableID: tableID.result[0].ID,
        notes: bookingData.notes,
        name: bookingData.name,
        phone: bookingData.phone,
        email: bookingData.email,
      }),
    }).then((res) => res.json());

    return { ...action, type: actionType.ADD_BOOKING_SUCCESS, booking };
  }),
  catchError((err) => Promise.resolve({
    type: actionType.ADD_BOOKING_FAIL,
    message: err.message,
  })),
);


/**
 * Asynchronous call for a PUT request, which allows a reservation to be edited
 * @param action$
 * @param store
 * @returns {*}
 */
const editReservation = (action$, store) => action$.pipe(
  filter((action) => action.type === actionType.EDIT_BOOKING),
  mergeMap(async (action) => {
    const bookingData = store.value.bookingReducer;
    const restaurantData = store.value.restaurantReducer;

    const booking = await fetch(`${PUT_RESERVATION}/${bookingData.bookingCode}`, {
      method: "PUT",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: bookingData.date,
        time: bookingData.time,
        restaurantID: restaurantData.selected.ID,
        numberOfGuests: bookingData.seats,
        notes: bookingData.notes,
        name: bookingData.name,
        phone: bookingData.phone,
        email: bookingData.email,
      }),
    }).then((res) => res.json());

    return { ...action, type: actionType.EDIT_BOOKING_SUCCESS, booking };
  }),
  catchError((err) => Promise.resolve({
    type: actionType.EDIT_BOOKING_FAIL,
    message: err.message,
  })),
);

const getRestaurantBookings = (action$, store) => action$.pipe(
  filter((action) => action.type === actionType.GET_RESTAURANT_BOOKINGS),
  mergeMap(async (action) => {
    const bookingData = store.value.bookingReducer;
    const bookings = await fetch(RESTAURANT_BOOKING(bookingData.currentRestaurantID))
      .then((res) => res.json());
    return {
      ...action,
      type: actionType.GET_RESTAURANT_BOOKINGS_SUCCCESS,
      restaurantBookings: bookings.result,
    };
  }),
  catchError((err) => Promise.resolve({
    type: actionType.GET_RESTAURANT_BOOKINGS_FAIL,
    message: err.message,
  })),
);

/**
 * Asynchronous request for reeiving a restaurants opening hours
 * @param action$
 * @param store
 * @returns {*}
 */
const getRestaurantHours = (action$, store) => action$.pipe(
  filter((action) => action.type === actionType.GET_RESTAURANT_HOURS),
  mergeMap(async (action) => {
    const restaurantData = store.value.restaurantReducer;
    const hours = await fetch(RESTAURANT_HOURS(restaurantData.selected.ID))
      .then((res) => res.json());
    return { ...action, type: actionType.GET_RESTAURANT_HOURS_SUCCESS, restaurantHours: hours };
  }),
  catchError((err) => Promise.resolve({
    type: actionType.GET_RESTAURANT_HOURS_FAIL,
    message: err.message,
  })),
);

/**
 * Asynchronous call for receiving the times which are free
 * depending on the restaurant, date and number of seats
 * @param action$
 * @param store
 * @returns {*}
 */
const getAvailableHours = (action$, store) => action$.pipe(
  filter((action) => action.type === actionType.GET_AVAILABLE_RESTAURANT_HOURS),
  mergeMap(async (action) => {
    const bookingData = store.value.bookingReducer;
    const restaurantData = store.value.restaurantReducer;
    const endPoint = `${FREE_TABLE}?restaurantID=${restaurantData.selected.ID}&numberOfGuests=${bookingData.seats}&date=${bookingData.date}`;
    const available = await fetch(endPoint).then((res) => res.json());
    return {
      ...action,
      type: actionType.GET_AVAILABLE_RESTAURANT_HOURS_SUCCESS,
      availableRestaurantHours: available,
    };
  }),
  catchError((err) => Promise.resolve({
    type: actionType.GET_AVAILABLE_RESTAURANT_HOURS_FAIL,
    message: err.message,
  })),
);

/**
 * Asynchronous call for receiving the minimum and maximum number of guests for a booking
 * which is depending on the restaurantID
 * @param action$
 * @param store
 * @returns {*}
 */
const getTableCapacity = (action$, store) => action$.pipe(
  filter((action) => action.type === actionType.GET_TABLE_CAPACITY),
  mergeMap(async (action) => {
    const restaurantData = store.value.restaurantReducer;
    const capacity = await fetch(TABLE_CAPACITY(restaurantData.selected.ID)).then((res) => res.json());
    return {
      ...action,
      type: actionType.GET_TABLE_CAPACITY_SUCCESS,
      tableCapacity: capacity,
    };
  }),
  catchError((err) => Promise.resolve({
    type: actionType.GET_TABLE_CAPACITY_FAIL,
    message: err.message,
  })),
);


export default addReservation;

export {
  editReservation,
  getRestaurantBookings,
  getRestaurantHours,
  getAvailableHours,
  getTableCapacity,
};
