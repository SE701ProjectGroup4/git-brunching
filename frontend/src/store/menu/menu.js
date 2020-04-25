import { catchError, filter, mergeMap } from "rxjs/operators";
import { actionType } from "./menuActions";

import {RESTAURANT_MENU} from "../../general/config";

/**
 * Asynchronous request for receiving a restaurants menu
 * @param action$
 * @param store
 * @returns {*}
 */
const getRestaurantMenu = (action$, store) => action$.pipe(
    filter((action) => action.type === actionType.GET_RESTAURANT_MENU),
    mergeMap(async (action) => {
      const menu = await fetch(RESTAURANT_MENU(action.restaurantID))
        .then((res) => res.json());
      return { ...action, type: actionType.GET_RESTAURANT_MENU_SUCCESS, menus: menu };
    }),
    catchError((err) => Promise.resolve({
      type: actionType.GET_RESTAURANT_MENU_FAIL,
      message: err.message,
    })),
  );


  export default getRestaurantMenu;
