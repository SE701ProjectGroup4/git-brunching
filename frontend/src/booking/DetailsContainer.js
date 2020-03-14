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
      <div className={style.inputContainer}>
        <h1>Enter Your Details</h1>  {/* put into textholder.js later*/}
        <form >
          <p>Name: </p>
          <input type = "text" name = "username"/>
          <p>Phone number: </p>
          <input type = "text" name = "phonenumber"/>
          <p>Email: </p>
          <input type = "text" name = "email"/>
          <p>Notes: </p>
          <textarea></textarea>
        </form>

      </div>
      <div className={style.timeContainer} />
      <div className={style.buttonContainer}>
        
        <button onClick={() => changePath("/", history)}>{detailMessages.buttonBackText}</button>
        <button onClick={() => changePath("/confirmation", history)}>{detailMessages.buttonNextText}</button>
      </div>
    </div>
  );
};

export default DetailsContainer;
