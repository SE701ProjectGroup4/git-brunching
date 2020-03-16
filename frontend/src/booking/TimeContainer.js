import React, { useState } from "react";
import { useHistory } from "react-router";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
import style from "./BookingPage.module.css";
import changePath from "../general/helperFunctions";
import messages from "../general/textHolder";
import { addBooking } from "../store/booking/bookingActions";

const timeMessages = messages.time;

const TimeContainer = props => {
  const history = useHistory();
  // Update this in the future to get time as well
  // updated for time
  const { oldSeats, oldDate, oldTime } = props;

  const [seats, changeSeats] = useState(oldSeats == null ? "" : oldSeats);
  const [selectedDate, setSelectedDate] = useState(
    oldDate == null ? new Date() : oldDate
  );
  // adding below for time
  const [selectedTime, setSelectedTime] = useState(
    oldTime == null ? "" : oldTime
  );

  const handleTimeConfirmation = () => {
    changePath("/details", history);
    props.onConfirmClick(selectedDate, seats, selectedTime, null);
  };

  const handleTime = value => {
    console.log(value);
    setSelectedTime(value);
  };

  const times = [
    {
      time: "9-10am",
      color: selectedTime === "9-10am" ? "secondary" : "primary"
    },
    {
      time: "10-11am",
      color: selectedTime === "10-11am" ? "secondary" : "primary"
    },
    {
      time: "11am-12pm",
      color: selectedTime === "11am-12pm" ? "secondary" : "primary"
    },
    {
      time: "12-1pm",
      color: selectedTime === "12-1pm" ? "secondary" : "primary"
    },
    {
      time: "1-2pm",
      color: selectedTime === "1-2pm" ? "secondary" : "primary"
    },
    {
      time: "2-3pm",
      color: selectedTime === "2-3pm" ? "secondary" : "primary"
    },
    { time: "3-4pm", color: selectedTime === "3-4pm" ? "secondary" : "primary" }
  ];

  // const handleColor = value => {
  //   const colorClass = selectedTime === value ? "secondary" : "primary";
  //   return colorClass;
  // };
  /**
   * Upon clicking, we want to update the store with inputted values
   */
  return (
    <div className={style.bookingDetailsContainer}>
      <h1>{timeMessages.placeholder}</h1>
      <div className={style.bookingDetailsContainer}>
        <div className={style.bookingDetail}>
          <TextField
            type="number"
            label="Number of Guests"
            variant="outlined"
            onChange={e => changeSeats(e.target.value)}
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
              onChange={e => setSelectedDate(e.target.value)}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className={style.contentContainer}>
          {/* Time fields go here */}
          {times.map(time => (
            <Button
              // className={style.test}
              key={`time_button_${time.time}`}
              variant="contained"
              value={time.time}
              color={time.color}
              onClick={e => handleTime(e.currentTarget.value)}
            >
              {time.time}
            </Button>
          ))}
          {/* <Button
            className={style.test}
            variant="contained"
            value="9-10am"
            color={handleColor(value)}
            onClick={e => handleTime(e.currentTarget.value)}
          >
            9-10 am
          </Button> */}
          {/* <Button
            variant="contained"
            value="10-11am"
            color="primary"
            onClick={e => handleTime(e.currentTarget.value)}
          >
            10-11 am
          </Button>
          <Button
            variant="contained"
            value="11am-12pm"
            color="primary"
            onClick={e => handleTime(e.currentTarget.value)}
          >
            11am-12pm
          </Button>
          <Button
            variant="contained"
            value="12-1pm"
            color="primary"
            onClick={e => handleTime(e.currentTarget.value)}
          >
            12-1 pm
          </Button>
          <Button
            variant="contained"
            value="1-2pm"
            color="primary"
            onClick={e => handleTime(e.currentTarget.value)}
          >
            1-2 pm
          </Button>
          <Button
            variant="contained"
            value="2-3pm"
            color="primary"
            onClick={e => handleTime(e.currentTarget.value)}
          >
            2-3 pm
          </Button>
          <Button
            variant="contained"
            value="3-4pm"
            color="primary"
            onClick={e => handleTime(e.currentTarget.value)}
          >
            3-4 pm
          </Button> */}

          <div className={style.inputContainer}>
            <p>Current Selected Time</p>
            {/* <TextField type="string" value={selectedTime} /> */}
          </div>
        </div>
      </div>
      <div className={style.buttonContainer}>
        <button onClick={handleTimeConfirmation}>
          {timeMessages.buttonNextText}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  oldSeats: state.bookingReducer.seats,
  oldDate: state.bookingReducer.date,
  oldTime: state.bookingReducer.time
});

const mapDispatchToProps = dispatch => ({
  onConfirmClick: (date, seats, time) => {
    dispatch(addBooking(date, seats, time, "", null));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeContainer);
