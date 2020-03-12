import React from "react";
import { useHistory } from "react-router-dom";
import { createMemoryHistory } from "history";
import {
  Route, Router, Switch,
} from "react-router";
import style from "./BookingPage.module.css";
import NotFound from "../general/NotFound";
import TimeContainer from "./TimeContainer";
import DetailsContainer from "./DetailsContainer";
import ConfirmationContainer from "./ConfirmationContainer";


const BookingPage = (props) => {
  const memoryHistory = createMemoryHistory();
  const history = useHistory();
  const { currentRestaurant } = props;

  return (
    <div className={style.container}>
      { currentRestaurant == null ? <NotFound />
        : (
          <>
            <div className={style.header}>
              <h1>{currentRestaurant}</h1>
            </div>
            <div className={style.progressBar} />
            <Router history={memoryHistory}>
              <Switch>
                <Route path="/details" component={() => <DetailsContainer />} />
                <Route path="/confirmation" component={() => <ConfirmationContainer browserHistory={history} />} />
                <Route path="/" component={() => <TimeContainer />} />
              </Switch>
            </Router>
          </>
        )}

    </div>
  );
};

export default BookingPage;
