import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { connect } from "react-redux";
import style from "./BookingPage.module.css";
import messages from "../general/textHolder";
import { updateSeats } from "../store/booking/bookingActions";

const timeMessages = messages.time;


const TimeContainer = (props) => {
  const [seatsNumber, handleSeatsNumber] = useState("");

  /**
   * Upon clicking, we want to update the store with inputted values
   */
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
<<<<<<< HEAD
=======
      <div className={style.buttonContainer}>
        {/* We will have to store things onClick */}
      </div>
      <div className={style.timeContainer} />
>>>>>>> 68d18553ed3aaa32ef34c7a09329e97b061d2a8e
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
