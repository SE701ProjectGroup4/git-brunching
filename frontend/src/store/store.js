import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";

/**
 * A logger is used for debugging.
 * TODO: Disable logger when in production
 * @returns {function(*): function(...[*]=)}
 */
const logger = () => (next) => (action) => {
  console.log("ACTION:", action);
  const returnValue = next(action);
  console.log("NEXT ACTION:", returnValue);
};


const store = createStore(rootReducer, applyMiddleware(logger));

export default store;
