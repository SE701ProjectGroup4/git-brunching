import {
  catchError, delay, filter, mapTo, mergeMap, tap,
} from "rxjs/operators";
import HOST from "../../general/config";
import { actionType } from "./restaurantAction";
import {createDispatchHook} from "react-redux";

const fetchRestaurants = (action$) => action$.pipe(
  filter((action) => action.type === actionType.ADD_RESTAURANTS),
  mergeMap((action) => {
    const restaurants = fetch(`${HOST}/restaurant/getAll`)
      .then((res) => res.json());
    return { ...action, type: actionType.ADD_RESTAURANTS_SUCCESS, restaurants };
  }),
  catchError((err) => Promise.resolve({
    type: actionType.ADD_RESTAURANTS_FAIL, message: err.message,
  })),
);

export const pingEpic = (action$) => action$.pipe(
  filter((action) => action.type === actionType.ADD_RESTAURANTS),
  delay(1000), // Asynchronously wait 1000ms then continue
  mapTo({ type: actionType.ADD_RESTAURANTS_SUCCESS, restaurants: [1, 2] }),
);




export default fetchRestaurants;
