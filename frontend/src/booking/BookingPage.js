import React from "react";
import { useHistory } from "react-router-dom";
import { createMemoryHistory } from "history";
import {
  Route, Router, Switch,
} from "react-router";
import style from "./BookingPage.module.css";
import NotFound from "../general/NotFound";
import ContentContainer from "./ContentContainer";
import { ReactComponent as Logo } from "../general/Logo2.svg";
import changePath from "../general/helperFunctions";
import ConfirmedBooking from "./ConfirmedBooking";

const BookingPage = (props) => {
  const memoryHistory = createMemoryHistory();
  const history = useHistory();
  const { currentRestaurant } = props;

  return (
    <div className={style.container}>
      { currentRestaurant == null ? <NotFound />
        : (
          <div className={style.contentContainer}>
            {/* A surrounding div for styling purposes */}
            <div className={style.headerContainer}>
              <div className={style.header}>
                <div
                  className={style.logo}
                  onClick={() => changePath("/", history)}>
                  <Logo />
                </div>
                <h1 className={style.restaurantName}>{currentRestaurant}</h1>
              </div>
            </div>
            {/* Memory is used to navigate as we don't want to change URL each time */}
            <Router history={memoryHistory}>
              <Switch>
                <Route path="/details" component={() => <ContentContainer type="detail" />} />
                <Route path="/confirmation" component={() => <ContentContainer type="confirmation" />} />
                <Route path="/complete" component={() => <ConfirmedBooking history={history} />} />
                <Route path="/" component={() => <ContentContainer type="time" />} />
              </Switch>
            </Router>
          </div>
        )}

    </div>
  );
};

export default BookingPage;
