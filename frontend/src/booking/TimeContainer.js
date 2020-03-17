import React, { useState } from "react";
import { useHistory } from "react-router";
import { TextField, Button } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { format } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
import style from "./BookingPage.module.css";
import changePath from "../general/helperFunctions";
import messages from "../general/textHolder";
import { addBookingTime } from "../store/booking/bookingActions";

const timeMessages = messages.time;
// const times = [
//   {
//     time: "09:00:00",
//     color: selectedTime === "9-10am" ? "secondary" : "primary",
//   },
//   {
//     time: "10:00:00",
//     color: selectedTime === "10-11am" ? "secondary" : "primary",
//   },
//   {
//     time: "11:00:00",
//     color: selectedTime === "11am-12pm" ? "secondary" : "primary",
//   },
//   {
//     time: "12:00:00",
//     color: selectedTime === "12-1pm" ? "secondary" : "primary",
//   },
//   {
//     time: "13:00:00",
//     color: selectedTime === "1-2pm" ? "secondary" : "primary",
//   },
//   {
//     time: "14:00:00",
//     color: selectedTime === "2-3pm" ? "secondary" : "primary",
//   },
//   {
//     time: "15:00:00",
//     color: selectedTime === "3-4pm" ? "secondary" : "primary",
//     // disable: ((format(selectedDate, "yyyy-MM-dd")) === "2020-03-22"),
//   },
//   {
//     time: "16:00:00",
//     color: selectedTime === "4-5pm" ? "secondary" : "primary",
//   },
// ];

const generateAllTimes = (start, end) => {
  const times = [];

  for (let i = start; i < end; i += 1) {
    times.push({
      time: i > 9 ? `${i}:00:00` : `0${i}:00:00`,
    });
  }

  return times;
};

const availableTimes = [
  {
    time: "10:00:00",
    color: "#66bb6a",
  },
  {
    time: "12:00:00",
    color: "#66bb6a",
  },
  {
    time: "13:00:00",
    color: "#66bb6a",
  },
  {
    time: "18:00:00",
    color: "#66bb6a",
  },
];

const TimeContainer = (props) => {
  const history = useHistory();
  // Update this in the future to get time as well
  // updated for time
  const {
    oldSeats, oldDate, oldTime, onConfirmClick,
  } = props;

  const [seats, changeSeats] = useState(oldSeats == null ? "" : oldSeats);
  const [selectedDate, setSelectedDate] = useState(
    oldDate == null ? format(new Date(Date.now()), "yyyy-MM-dd") : oldDate,
  );
  // adding below for time
  const [selectedTime, setSelectedTime] = useState(
    oldTime == null ? "" : oldTime,
  );

  // const showTimes = seats.length > 0 && selectedDate != null;
  const hideTimes = seats.length === 0 || selectedDate == null;

  const handleTimeConfirmation = () => {
    changePath("/details", history);
    onConfirmClick(selectedDate, seats, selectedTime, null);
  };

  const handleTime = (value) => {
    setSelectedTime(value);
  };


  /**
   * Upon clicking, we want to update the store with inputted values
   */
  return (
    <div className={style.bookingDetailsContainer}>
      <div className={style.bookingDetail}>
        <TextField
          type="number"
          className={style.textField}
          label="Number of Guests"
          variant="outlined"
          value={seats}
          onChange={(e) => changeSeats(e.target.value)}
        />
      </div>
      <div className={style.bookingDetail}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            style={{ width: "100%" }}
            inputVariant="outlined"
            format="dd-MM-yyyy"
            margin="normal"
            label="Select a Date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(format(e, "yyyy-MM-dd"))}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      {hideTimes ? null
        : (
          <div className={style.buttonContainer}>
            {generateAllTimes(9, 22).map((time) => (
              <Button
              // className={style.timeButton}
                key={`time_button_${time.time}`}
                variant="contained"
                disabled={!(availableTimes.find((x) => x.time === time.time))}
                value={time}
                color={time.time === selectedTime ? "secondary" : "primary"}
                onClick={() => handleTime(time.time)}
              >
                {time.time}
              </Button>
            ))}
          </div>
        )}
      <div className={style.submitButtonContainer}>
        <Button
          className={style.submitButton}
          variant="contained"
          color="primary"
          onClick={handleTimeConfirmation}
          disabled={seats.length === 0 || selectedTime.length === 0}
        >
          {timeMessages.buttonNextText}
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  oldSeats: state.bookingReducer.seats,
  oldDate: state.bookingReducer.date,
  oldTime: state.bookingReducer.time,
});

const mapDispatchToProps = (dispatch) => ({
  onConfirmClick: (date, seats, time) => { dispatch(addBookingTime(date, seats, time)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeContainer);
