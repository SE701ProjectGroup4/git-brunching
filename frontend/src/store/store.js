import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import rootReducer from "./rootReducer";
import rootEpic from "./rootEpic";

/**
 * A logger is used for debugging.
 * TODO: Disable logger when in production
 * @returns {function(*): function(...[*]=)}
 */
const logger = () => (next) => (action) => {
  // Suppress these warnings as they're for debugging purposes
  // eslint-disable-next-line no-console
  console.log("ACTION:", action);
  const returnValue = next(action);
  // eslint-disable-next-line no-console
  console.log("NEXT ACTION:", returnValue);
};

const observableMiddleware = createEpicMiddleware();


const store = createStore(rootReducer, applyMiddleware(logger, observableMiddleware));

observableMiddleware.run(rootEpic);


export default store;
