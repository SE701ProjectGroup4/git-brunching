import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { format } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import classNames from "classnames";
import style from "./BookingPage.module.css";
import changePath, { getDayForDate, generateAllTimes } from "../general/helperFunctions";
import messages from "../general/textHolder";
import {
  addBookingDate,
  addBookingSeats,
  addBookingTime,
  getAvailableHours,
  getRestaurantHours,
  getTableCapacity,
} from "../store/booking/bookingActions";

const timeMessages = messages.time;

/**
 * This component represents the part of the booking where the user enters
 * their seats, date and time.
 * @param props
 * @returns {*}
 * @constructor
 */
const TimeContainer = (props) => {
  const history = useHistory();

  const {
    oldSeats, oldDate, oldTime, onConfirmClick, getHours, restaurantHours, getAvailable,
    availableTimes, onSeatChange, onDateChange, isLoading, mainHistory, tableCapacity, getCapacity,
  } = props;

  const [seats, changeSeats] = useState(oldSeats);
  const [selectedDate, setSelectedDate] = useState(oldDate);
  const [selectedTime, setSelectedTime] = useState(oldTime);
  const [overCapacity, setOverCapacity] = useState(false);
  const [capacityMsg, setCapacityMsg] = useState("");

  useEffect(getHours, []);
  useEffect(getCapacity, []);

  const day = getDayForDate(new Date(selectedDate));
  const month = new Date(selectedDate).getMonth();
  const dates = new Date(selectedDate).getDate();
  const times = restaurantHours.find((x) => x.DayOfWeek === day);

  const today = new Date();
  const todaysMonth = today.getMonth();
  const todaysDate = today.getDate();
  const todaystime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const todaystimeInt = Number.parseInt(todaystime.substring(0, 2), 10);
  // There will be no times when the restaurant is closed
  const noTimes = times == null;
  const hideTimes = seats.length === 0 || selectedDate == null;
  const dateError = selectedDate == null;
  const maxGuest = tableCapacity.maximum;
  const minGuest = tableCapacity.minimum;

  let openTime = "";
  let closeTime = "";

  if (!noTimes) {
    openTime = Number.parseInt(times.OpenTime.substring(0, 2), 10);
    closeTime = Number.parseInt(times.CloseTime.substring(0, 2), 10);
  }

  const handleTimeConfirmation = () => {
    changePath("/details", history);
    onConfirmClick(selectedTime);
  };

  const handleTime = (value) => {
    setSelectedTime(value);
  };

  const handleGuestChange = (e) => {
    const currentSeats = (e.target.validity.valid) ? e.target.value : seats;
    changeSeats(currentSeats);
  };

  const handleCapacity = (seat) => {
    if (seat > maxGuest || seat < minGuest) {
      if (seat < minGuest) setCapacityMsg(messages.time.minGuestMsg + minGuest);
      else setCapacityMsg(messages.time.maxGuestMsg + maxGuest);
      setOverCapacity(true);
    } else {
      getAvailable();
      setOverCapacity(false);
    }
  };

  return (
    <div className={style.stylingParent}>
      <div className={style.bookingDetailsContainer}>
        <div className={style.bookingDetail}>
          <TextField
            type="text"
            inputProps={{ pattern: "[0-9]*" }}
            className={style.textField}
            label="Number of Guests"
            variant="outlined"
            value={seats}
            onChange={(e) => {
              handleGuestChange(e);
              onSeatChange(e.target.value)
              handleCapacity(e.target.value)
              getAvailable();
            }}
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
              error={dateError}
              disablePast = "true"
              onChange={(e) => {
                try {
                  const formattedDate = format(e, "yyyy-MM-dd");
                  setSelectedDate(formattedDate);
                  onDateChange(formattedDate);
                  getAvailable();
                } catch (RangeError) {
                  setSelectedDate(null);
                  getAvailable();
                }
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        {hideTimes ? null
          : (
            <div className={classNames(style.buttonContainer, isLoading ? style.loading : "")}>
              {isLoading ? <div className={style.loading}><CircularProgress /></div> : (
                <>
                {overCapacity ? <div className = {style.capacityMsg}>{capacityMsg}</div> : 
                 noTimes || availableTimes.availableHours == null ? <div>Closed</div>
                    : generateAllTimes(openTime, closeTime).map((time) => {
                      const available = availableTimes.availableHours;
                      const hour = Number.parseInt(time.time.substring(0, 2), 10);
                      return (
                        <Button
                          key={`time_button_${time.time}`}
                          variant="contained"
                          disabled={(available.indexOf(hour) === -1) || (hour <= todaystimeInt && month === todaysMonth && dates === todaysDate) }
                          value={time}
                          color={time.time === selectedTime ? "secondary" : "primary"}
                          onClick={() => handleTime(time.time)}
                        >
                          {time.time}
                        </Button>
                      );
                    })}
                </>
              )}
            </div>
          )}
        <div className={style.submitButtonContainer}>
          <Button
            className={style.submitButton}
            variant="contained"
            color="primary"
            onClick={() => changePath("/", mainHistory)}
          >
            Cancel
          </Button>
          <Button
            className={style.submitButton}
            variant="contained"
            color="primary"
            onClick={handleTimeConfirmation}
            disabled={seats.length === 0 || selectedTime.length === 0 || overCapacity === true}
          >
            {timeMessages.buttonNextText}
          </Button>
        </div>
      </div>
    </div>

  );
};

const mapStateToProps = (state) => ({
  oldSeats: state.bookingReducer.seats,
  oldDate: state.bookingReducer.date,
  oldTime: state.bookingReducer.time,
  restaurantHours: state.bookingReducer.restaurantHours,
  availableTimes: state.bookingReducer.availableRestaurantHours,
  tableCapacity: state.bookingReducer.tableCapacity,
  isLoading: state.bookingReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  onConfirmClick: (time) => { dispatch(addBookingTime(time)); },
  onSeatChange: (seats) => { dispatch(addBookingSeats(seats)); },
  onDateChange: (date) => { dispatch(addBookingDate(date)); },
  getHours: bindActionCreators(getRestaurantHours, dispatch),
  getAvailable: bindActionCreators(getAvailableHours, dispatch),
  getCapacity: bindActionCreators(getTableCapacity, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(TimeContainer);
