import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router, Route, Switch,
} from "react-router-dom";
import LandingPage from "./landing/LandingPage";
import BookingPage from "./booking/BookingPage";
import NotFound from "./general/NotFound";

const App = () => {
  const [currentRestaurant, setRestaurant] = useState("");
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* A state is stored instead of creating a different route for each booking page because
          it was easier to implement */}
          <Route path="/booking" component={() => <BookingPage currentRestaurant={currentRestaurant} />} />
          <Route exact path="/" component={() => <LandingPage setRestaurant={setRestaurant} />} />
          <Route path="" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
