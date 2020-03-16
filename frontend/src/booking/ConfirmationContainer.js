import React from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import style from "./BookingPage.module.css";
import changePath from "../general/helperFunctions";
import messages from "../general/textHolder";

const confirmationMessages = messages.confirmation;

const ConfirmationContainer = (props) => {
  const history = useHistory();

  const { browserHistory, name, phone, email, notes, seats, date, time } = props;

  return (
    <div className={style.bookingDetailsContainer}>
      {/* TODO: Just a placeholder, edit later */}
      <div>
        <p>{`Name: ${name}`}</p>
        <p>{`Phone: ${phone}`}</p>
        <p>{`Email: ${email}`}</p>
        <p>{`Notes: ${notes}`}</p>
        <p>{`Number of seats: ${seats}`}</p>
        <p>{`Date: ${date}`}</p>
        <p>{`Time: ${time}`}</p>
      </div>
      <button onClick={() => changePath("/details", history)}>{confirmationMessages.buttonBackText}</button>
      <button onClick={() => changePath("/", browserHistory)}>{confirmationMessages.buttonNextText}</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  name: state.bookingReducer.name,
  phone: state.bookingReducer.phone,
  email: state.bookingReducer.email,
  notes: state.bookingReducer.notes,
  seats: state.bookingReducer.seats,
  date: state.bookingReducer.date,
  time: state.bookingReducer.time,
});

export default connect(mapStateToProps, null)(ConfirmationContainer);
