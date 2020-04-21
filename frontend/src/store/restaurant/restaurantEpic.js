import {
  catchError, delay, filter, mapTo, mergeMap,
} from "rxjs/operators";
import { actionType } from "./restaurantAction";
import {
  GET_ALL_RESTAURANTS,
  GET_SEARCH_RESTAURANTS,
  GET_OPEN_RESTAURANTS,
  GET_POPULAR_RESTAURANTS,
  GET_NEW_RESTAURANTS,
} from "../../general/config";

/**
 * Async call for receiving all restaurants
 * This is a sequence of actions which determine if the API call
 * succeeds or fails.
 * @param action$
 * @returns {*}
 */
const fetchRestaurants = (action$) => action$.pipe(
  filter((action) => action.type === actionType.ADD_RESTAURANTS),
  mergeMap(async (action) => {
    const restaurants = await fetch(GET_ALL_RESTAURANTS).then((res) => res.json());
    return { ...action, type: actionType.ADD_RESTAURANTS_SUCCESS, restaurants };
  }),
  catchError((err) => Promise.resolve({
    type: actionType.ADD_RESTAURANTS_FAIL,
    message: err.message,
  })),
);

/**
 * Async call for receiving all currently open restaurants
 * This is a sequence of actions which determine if the API call
 * succeeds or fails.
 * @param action$
 * @returns {*}
 */
const fetchOpenRestaurants = (action$) => action$.pipe(
  filter((action) => action.type === actionType.ADD_OPEN_RESTAURANTS),
  mergeMap(async (action) => {
    const openRestaurants = await fetch(GET_OPEN_RESTAURANTS).then((res) => res.json());
    return { ...action, type: actionType.ADD_OPEN_RESTAURANTS_SUCCESS, openRestaurants };
  }),
  catchError((err) => Promise.resolve({
    type: actionType.ADD_RESTAURANTS_FAIL,
    message: err.message,
  })),
);

/**
 * Async call for receiving all popular restaurants
 * This is a sequence of actions which determine if the API call
 * succeeds or fails.
 * @param action$
 * @returns {*}
 */
const fetchPopularRestaurants = (action$) => action$.pipe(
  filter((action) => action.type === actionType.ADD_POPULAR_RESTAURANTS),
  mergeMap(async (action) => {
    const popularRestaurants = await fetch(GET_POPULAR_RESTAURANTS).then((res) => res.json());
    return { ...action, type: actionType.ADD_POPULAR_RESTAURANTS_SUCCESS, popularRestaurants };
  }),
  catchError((err) => Promise.resolve({
    type: actionType.ADD_RESTAURANTS_FAIL,
    message: err.message,
  })),
);

/**
 * Async call for receiving all new restaurants
 * This is a sequence of actions which determine if the API call
 * succeeds or fails.
 * @param action$
 * @returns {*}
 */
const fetchNewRestaurants = (action$) => action$.pipe(
  filter((action) => action.type === actionType.ADD_NEW_RESTAURANTS),
  mergeMap(async (action) => {
    const newRestaurants = await fetch(GET_NEW_RESTAURANTS).then((res) => res.json());
    return { ...action, type: actionType.ADD_NEW_RESTAURANTS_SUCCESS, newRestaurants };
  }),
  catchError((err) => Promise.resolve({
    type: actionType.ADD_RESTAURANTS_FAIL,
    message: err.message,
  })),
);

/**
 * Async call for receiving all restaurants that match the search string
 * This is a sequence of actions which determine if the API call
 * succeeds or fails.
 * @param action$
 * @returns {*}
 */
const fetchSearchedRestaurants = (action$) => action$.pipe(
  filter((action) => action.type === actionType.ADD_SEARCH_RESTAURANTS),
  mergeMap(async (action) => {
    const restaurants = await fetch(`${GET_SEARCH_RESTAURANTS}${action.searchText}`).then((res) => res.json());
    return { ...action, type: actionType.ADD_RESTAURANTS_SUCCESS, restaurants };
  }),
  catchError((err) => Promise.resolve({
    type: actionType.ADD_RESTAURANTS_FAIL,
    message: err.message,
  })),
);

// A PLACEHOLDER
export const pingEpic = (action$) => action$.pipe(
  filter((action) => action.type === actionType.ADD_RESTAURANTS),
  delay(1000), // Asynchronously wait 1000ms then continue
  mapTo({ type: actionType.ADD_RESTAURANTS_SUCCESS, restaurants: [1, 2] }),
);


export default fetchRestaurants;

export {
  fetchNewRestaurants,
  fetchOpenRestaurants,
  fetchPopularRestaurants,
  fetchSearchedRestaurants,
};
