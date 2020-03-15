import React, { useState } from "react";
import { useHistory } from "react-router";
import TextField from "@material-ui/core/TextField";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import Card from "@material-ui/core/Card";
import style from "./BookingPage.module.css";
import changePath from "../general/helperFunctions";
import messages from "../general/textHolder";

const detailMessages = messages.details;
const DetailsContainer = () => {
  const history = useHistory();
  const [name, handleName] = useState("");
  const [email, handleEmail] = useState("");
  const [phoneNumber, handlePhoneNumber] = useState("");
  //  functions that are used to navigate to previous and next screens

  const handleNext = () => {
    changePath("/confirmation", history);
  };

  const handlePrevious = () => {
    changePath("/", history);
  };

  return (
    <div className={style.contentContainer}>
      {/* Input fields go here */}
      <div className={style.inputContainer}>
        <Card className={style.detailsCard}>
          <h1>Enter Your Details</h1>
          {
          /**
           * Form for inputting personal details.
           */
           }
          <form>
            <div className="form-group">
              <label className={style.formlabel}>Name</label>
              <TextField
                type="text"
                name="username"
                className="form-value"
                onChange={
                (e) => { handleName(e.target.value); }
              }
              />
            </div>
            <div className="form-group">
              <label className={style.formlabel}>Phone Number</label>
              <TextField
                type="text"
                name="phonenumber"
                className="form-value"
                onChange={
                (e) => { handlePhoneNumber(e.target.value); }
                }
              />
            </div>
            <div className="form-group">
              <label className={style.formlabel}>Email</label>
              <TextField
                type="text"
                name="email"
                className="form-value"
                onChange={
                  (e) => { handleEmail(e.target.value); }
                }
              />
            </div>
            <div className="form-group">
              <label className={style.formlabel}>Notes</label>
              <TextField />
            </div>
            <div className={style.buttonContainer}>
              <BottomNavigation>
                <button className={style.changePageButton} variant="contained" onClick={handlePrevious}>{detailMessages.buttonBackText}</button>
                <button className={style.changePageButton} type="submit" variant="contained" onClick={handleNext}>{detailMessages.buttonNextText}</button>
              </BottomNavigation>
            </div>
          </form>
        </Card>
      </div>
      <div className={style.timeContainer} />

    </div>
  );
};

export default DetailsContainer;
