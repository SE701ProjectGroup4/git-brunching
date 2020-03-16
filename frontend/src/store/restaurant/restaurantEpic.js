import {
  catchError, delay, filter, mapTo, mergeMap,
} from "rxjs/operators";
import { actionType } from "./restaurantAction";
import { GET_ALL_RESTAURANTS } from "../../general/config";

/**
 * Async call for receiving all restaurants
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


// A PLACEHOLDER
export const pingEpic = (action$) => action$.pipe(
  filter((action) => action.type === actionType.ADD_RESTAURANTS),
  delay(1000), // Asynchronously wait 1000ms then continue
  mapTo({ type: actionType.ADD_RESTAURANTS_SUCCESS, restaurants: [1, 2] }),
);


export default fetchRestaurants;
