import React from "react";
import { useHistory } from "react-router";
import style from "./BookingPage.module.css";
import changePath from "../general/helperFunctions";
import messages from "../general/textHolder";

const detailMessages = messages.details;
const DetailsContainer = () => {
  const history = useHistory();

  return (
    <div className={style.contentContainer}>
      {/* Input fields go here */}
      <div className={style.inputContainer}>{detailMessages.placeholder}</div>
      <div className={style.timeContainer} />
      <div className={style.buttonContainer}>
        <button onClick={() => changePath("/", history)}>{detailMessages.buttonBackText}</button>
        <button onClick={() => changePath("/confirmation", history)}>{detailMessages.buttonNextText}</button>
      </div>
    </div>
  );
};

export default DetailsContainer;
