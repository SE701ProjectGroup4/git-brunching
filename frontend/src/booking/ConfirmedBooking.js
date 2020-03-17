import React from "react";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import changePath from "../general/helperFunctions";

// TODO: persist the booking and open a modal giving the user the bookingID
// This confirms or rejects the booking (if another booking was made
// with same time very recently)
const ConfirmedBooking = (props) => {
  const { history, booking, loading } = props;
  const toLoad = loading ? <CircularProgress />
    : (
      <div>
        <p>{`Booking reference is: ${booking.reservationID}`}</p>
        <Button onClick={() => changePath("/", history)}>
          Completed
        </Button>
      </div>
    );
  return toLoad;
};

const mapStateToProps = (state) => ({
  booking: state.bookingReducer.booking,
  loading: state.bookingReducer.loading,
});

export default connect(mapStateToProps)(ConfirmedBooking);
