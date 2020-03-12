import React from "react";
import { useHistory } from "react-router";
import style from "./BookingPage.module.css";
import changePath from "../general/helperFunctions";

const DetailsContainer = () => {
  const history = useHistory();

  return (
    <div className={style.contentContainer}>
      {/* Input fields go here */}
      <div className={style.inputContainer}>AT DETAILS</div>
      <div className={style.timeContainer} />
      <div className={style.buttonContainer}>
        <button onClick={() => changePath("/", history)}>Back</button>
        <button onClick={() => changePath("/confirmation", history)}>Next</button>
      </div>
    </div>
  );
};

export default DetailsContainer;
