import React, { useState } from "react";
import { useHistory } from "react-router";
import { TextField } from "@material-ui/core";
import { connect } from "react-redux";
import style from "./BookingPage.module.css";
import changePath from "../general/helperFunctions";
import messages from "../general/textHolder";
import { updateSeats } from "../store/booking/bookingActions";

const timeMessages = messages.time;


const TimeContainer = (props) => {
  const [seatsNumber, handleSeatsNumber] = useState("");
  const history = useHistory();

  /**
   * Upon clicking, we want to update the store with inputted values
   */
  const handleButtonClick = () => {
    changePath("/details", history);
    props.onButtonClick(seatsNumber);
  };
  return (
    <div className={style.contentContainer}>
      {/* Input fields go here */}
      <h1>{timeMessages.placeholder}</h1>
      <div className={style.inputContainer}>
        <TextField
          type="number"
          variant="outlined"
          value={seatsNumber}
          onChange={
            (e) => { handleSeatsNumber(e.target.value); }
          }
        />
      </div>
      <div className={style.timeContainer} />
    </div>
  );
};


const mapStateToProps = (state) => ({
  numberOfSeats: state.bookingReducer.numberOfSeats,
});

const mapDispatchToProps = (dispatch) => ({
  onButtonClick: (value) => { dispatch(updateSeats(value)); },
});
export default connect(mapStateToProps, mapDispatchToProps)(TimeContainer);
