import React, { useState } from "react";
import { useHistory } from "react-router";
import { TextField } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { connect } from "react-redux";
import style from "./BookingPage.module.css";
import changePath from "../general/helperFunctions";
import messages from "../general/textHolder";
import { addBooking } from "../store/booking/bookingActions";

const timeMessages = messages.time;

const TimeContainer = (props) => {
  const history = useHistory();

  const [seats, changeSeats] = React.useState((props.seats == null) ? "" : props.seats);
  const [selectedDate, setSelectedDate] = React.useState((props.date == null) ? new Date() : props.date);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleConfirmBooking = () => {
    changePath("/details", history);
    props.onConfirmClick(selectedDate, seats, null);
  }

  /**
   * Upon clicking, we want to update the store with inputted values
   */
  return (
    <div className={style.bookingDetailsContainer}>
      <h1>{timeMessages.placeholder}</h1>
      <div className={style.bookingDetailsContainer}>
        <div className={style.bookingDetail}>
          <TextField
            label="Number of Guests"
            variant="outlined"
            onChance={changeSeats}
          />
        </div>
        <div className={style.bookingDetail}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              inputVariant="outlined"
              format="dd/MM/yyyy"
              margin="normal"
              label="Select a Date"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className={style.contentContainer}>
          {/* Time fields go here */}
          <div className={style.inputContainer}>
            <TextField
              type="number"
              value={0}
            />
          </div>
        </div>
      </div>
      <div className={style.buttonContainer}>
        <button onClick={() => changePath("/", history)}>{timeMessages.buttonReturnText}</button>
        <button onClick={handleConfirmBooking}>{timeMessages.buttonNextText}</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  seats: state.bookingReducer.seats,
  date: state.bookingReducer.date,
  time: state.bookingReducer.time,
});

const mapDispatchToProps = (dispatch) => ({
  onConfirmClick: (date, seats, time) => { dispatch(addBooking(date, seats, time, "", null))}
})

export default connect(mapStateToProps, mapDispatchToProps)(TimeContainer);
