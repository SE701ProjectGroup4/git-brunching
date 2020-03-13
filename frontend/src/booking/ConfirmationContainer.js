import React from "react";
import { connect } from "react-redux";
import changePath from "../general/helperFunctions";
import messages from "../general/textHolder";

const confirmationMessages = messages.confirmation;

const ConfirmationContainer = (props) => {
  const { browserHistory, numberOfSeats } = props;
  return (
    <div>
      {/* TODO: Just a placeholder, edit later */}
      <p>{`NUMBER OF SEATS: ${numberOfSeats}`}</p>
      {confirmationMessages.confirmText}
      <button onClick={() => changePath("/", browserHistory)}>{confirmationMessages.buttonNextText}</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  numberOfSeats: state.bookingReducer.numberOfSeats,
});
export default connect(mapStateToProps, null)(ConfirmationContainer);
