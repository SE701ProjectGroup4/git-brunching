import React from "react";
import { useHistory } from "react-router";
import style from "./BookingPage.module.css";
import changePath from "../general/helperFunctions";
import messages from "../general/textHolder";

const timeMessages = messages.time;

const TimeContainer = () => {
  const history = useHistory();
  return (
    <div className={style.contentContainer}>
      {/* Input fields go here */}
      <div className={style.inputContainer}>{timeMessages.placeholder}</div>
      <div className={style.timeContainer} />
      <div className={style.buttonContainer}>
        {/* We will have to store things onClick */}
        <button onClick={() => changePath("/details", history)}>{timeMessages.buttonNextText}</button>
      </div>
    </div>
  );
};


export default TimeContainer;
