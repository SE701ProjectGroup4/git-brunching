import React from "react";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import changePath from "../general/helperFunctions";
import style from "./ConfirmedBooking.module.css";
import messages from "../general/textHolder";

const confirmedMessages = messages.confirmed;

const ConfirmedBooking = (props) => {
  const { history, booking, loading } = props;
  const toLoad = loading ? <div className={style.loader}><CircularProgress /></div>
    : (
      <div className={style.confirmContainer}>
        <p className={style.title}>{confirmedMessages.title}</p>
        <p>{`Booking reference is: ${booking.reservationID}`}</p>
        <Button onClick={() => changePath("/", history)} className={style.finishButton}>
          {confirmedMessages.buttonText}
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
