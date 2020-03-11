import React from "react";
import "./App.css";
import {
  BrowserRouter as Router, Route, Switch,
} from "react-router-dom";
import LandingPage from "./landing/LandingPage";
import BookingPage from "./booking/BookingPage";
import NotFound from "./general/NotFound";

const App = () => (
  <div className="App">
    <Router>
      <Switch>
        <Route path="/booking" component={BookingPage} />
        <Route exact path="/" component={LandingPage} />
        <Route path="" component={NotFound} />
      </Switch>
    </Router>
  </div>
);

export default App;
