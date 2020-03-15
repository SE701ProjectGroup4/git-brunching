import React from "react";
import { connect } from "react-redux";
import changePath from "../general/helperFunctions";
import messages from "../general/textHolder";

const confirmationMessages = messages.confirmation;

const ConfirmationContainer = (props) => {
  const { name, phone, email, notes, seats, date, time } = props;
  return (
    <div>
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
