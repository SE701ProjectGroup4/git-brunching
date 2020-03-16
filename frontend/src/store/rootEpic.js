import { combineEpics } from "redux-observable";
import restaurantEpic from "./restaurant/restaurantEpic";

const rootEpic = combineEpics(
  restaurantEpic,
  // pingEpic,
);

export default rootEpic;
