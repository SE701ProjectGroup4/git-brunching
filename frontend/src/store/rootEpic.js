import { combineEpics } from "redux-observable";
import restaurantEpic, {pingEpic } from "./restaurant/restaurantEpic";

const rootEpic = combineEpics(
  // restaurantEpic,
  pingEpic,
);

export default rootEpic;
