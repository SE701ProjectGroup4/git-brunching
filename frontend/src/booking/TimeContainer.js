import React from "react";
import { useHistory } from "react-router";
import style from "./BookingPage.module.css";
import changePath from "../general/helperFunctions";

const TimeContainer = () => {
  const history = useHistory();
  return (
    <div className={style.contentContainer}>
      {/* Input fields go here */}
      <div className={style.inputContainer}>AT TIME</div>
      <div className={style.timeContainer} />
      <div className={style.buttonContainer}>
        {/* We will have to store things onClick */}
        <button onClick={() => changePath("/details", history)}>Next</button>
      </div>
    </div>
  );
};


export default TimeContainer;
