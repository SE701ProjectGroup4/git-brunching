import React from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import style from "./ConfirmationContainer.module.css";
import changePath from "../general/helperFunctions";
import messages from "../general/textHolder";
import landingStyle from "../landing/LandingPage.module.css";

const confirmationMessages = messages.confirmation;

const ConfirmationContainer = (props) => {
  const history = useHistory();

  const {
    browserHistory,
    name,
    phone,
    email,
    notes,
    seats,
    date,
    time,
  } = props;


  const completeBooking = () => {
    // TODO: persist the booking and open a modal giving the user the bookingID
    // This confirms or rejects the booking (if another booking was made
    // with same time very recently)
    changePath("/", browserHistory);
  };

  return (
    <div className={style.bookingDetailsContainer}>
      <div className={style.contentContainer}>
        {/* TODO: Put hard coded text into textHolder */}
        <div className={style.twoContent}>
          <p className={classNames(style.title, style.title1)}>{confirmationMessages.name}</p>
          <p className={classNames(style.value, style.value1)}>{name}</p>
          <p className={classNames(style.title, style.title2)}>{confirmationMessages.email}</p>
          <p className={classNames(style.value, style.value2)}>{email}</p>
        </div>
        <div className={style.twoContent}>
          <p className={classNames(style.title, style.title1)}>{confirmationMessages.phone}</p>
          <p className={classNames(style.value, style.value1)}>{phone}</p>
          <p className={classNames(style.title, style.title2)}>{confirmationMessages.seats}</p>
          <p className={classNames(style.value, style.value2)}>{seats}</p>
        </div>
        <div className={style.twoContent}>
          <p className={classNames(style.title, style.title1)}>{confirmationMessages.date}</p>
          <p className={classNames(style.value, style.value1)}>{`${date}`}</p>
          <p className={classNames(style.title, style.title2)}>{confirmationMessages.time}</p>
          <p className={classNames(style.value, style.value2)}>{`${time}`}</p>
        </div>
        <div className={classNames(style.content, style.notes)}>
          <p className={classNames(style.title, style.title1)}>{confirmationMessages.notes}</p>
          <div className={style.notesContainer}>
            <p className={classNames(style.value, style.value1)}>{notes}</p>
          </div>
        </div>
        <div className={style.buttonHolder}>
          <Button
            variant="outlined"
            className={classNames(landingStyle.primaryButton, style.edit)}
            onClick={() => changePath("/details", history)}
          >
            {confirmationMessages.buttonBackText}
          </Button>
          <Button
            variant="outlined"
            className={classNames(landingStyle.secondaryButton, style.confirm)}
            onClick={completeBooking}
          >
            {confirmationMessages.buttonNextText}
          </Button>
        </div>
      </div>
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
