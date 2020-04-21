import React, { useState } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import validator from "validator";
import style from "./DetailsContainer.module.css";
import landingStyle from "../landing/LandingPage.module.css";
import confirmationStyle from "./ConfirmationContainer.module.css";
import changePath from "../general/helperFunctions";
import messages from "../general/textHolder";
import { addBookingDetails } from "../store/booking/bookingActions";



/**
 * This component represents the form where the user enters their details
 * @type {{footerText: string, buttonBackText: string, buttonNextText: string, infoMessage: string}}
 */
const detailMessages = messages.details;
const DetailsContainer = (props) => {
  const history = useHistory();

  const {
    oldName,
    oldPhone,
    oldEmail,
    oldNotes,
  } = props;

  const [name, changeName] = useState((oldName == null) ? "" : oldName);
  const [phone, changePhone] = useState((oldPhone == null) ? "" : oldPhone);
  const [email, changeEmail] = useState((oldEmail == null) ? "" : oldEmail);
  const [notes, changeNotes] = useState((oldNotes == null) ? "" : oldNotes);
  const [touch, changeTouch] = useState([{ email: false, phone: false }]);

  const handleBlur = (field) => () => {
    changeTouch({ ...touch, [field]: true });
  };

  const handleDetailsConfirmation = () => {
    changePath("/confirmation", history);
    props.onConfirmClick(name, phone, email, notes);
  };

  const handlePhoneChange = (e) => {
    const currentPhone = (e.target.validity.valid) ? e.target.value : phone;
    changePhone(currentPhone);
  };


  const validation = (field) => {
    let error = false;
    const shouldShow = touch[field];
    if (field === "email") {
      error = validator.isEmail(email);
    } else {
      error = validator.isMobilePhone(phone);
    }
    return !error ? shouldShow : false;
  };

  // Make button clickable if the required fields are set
  // eslint-disable-next-line max-len
  const isSubmittable = (name.length > 0 && phone.length > 0 && email.length > 0 && validator.isEmail(email) && validator.isMobilePhone(phone));


  return (
    <div className={style.detailsContentContainer}>
      <div className={style.detailContainer}>
        <p className={style.info}>{detailMessages.infoMessage}</p>
        <TextField
          type="text"
          name="name"
          label="Name*"
          inputProps={{ maxLength: 40 }}
          value={name}
          onChange={(e) => changeName(e.target.value)}
          className="form-value"
        />
        <TextField
          error={validation("phone")}
          onBlur={(evt) => handleBlur("phone")(evt)}
          type="text"
          inputProps={{ maxLength: 40, pattern: "[0-9]*" }}
          label="Phone Number*"
          name="phonenumber"
          value={phone}
          onChange={(e) => {
            handlePhoneChange(e);
          }}
          className="form-value"
        />
        <TextField
          error={validation("email")}
          onBlur={(evt) => handleBlur("email")(evt)}
          type="text"
          label="Email*"
          inputProps={{ maxLength: 40 }}
          name="email"
          value={email}
          onChange={(e) => changeEmail(e.target.value)}
          className="form-value"
        />
        <TextField
          value={notes}
          multiline
          rowsMax={5}
          rows={5}
          label="Notes"
          onChange={(e) => changeNotes(e.target.value)}
        />
        <p className={style.footerText}>{detailMessages.footerText}</p>
        <div className={classNames(style.buttonContainer, confirmationStyle.buttonHolder)}>
          <Button
            className={classNames(landingStyle.primaryButton, confirmationStyle.edit)}
            variant="contained"
            onClick={() => changePath("/", history)}
          >
            {detailMessages.buttonBackText}
          </Button>
          <Button
            disabled={!isSubmittable}
            className={classNames(landingStyle.secondaryButton, confirmationStyle.confirm)}
            type="submit"
            variant="contained"
            onClick={handleDetailsConfirmation}
          >
            {detailMessages.buttonNextText}
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  oldName: state.bookingReducer.name,
  oldPhone: state.bookingReducer.phone,
  oldEmail: state.bookingReducer.email,
  oldNotes: state.bookingReducer.notes,
});

const mapDispatchToProps = (dispatch) => ({
  onConfirmClick: (name, phone, email, notes) => {
    dispatch(addBookingDetails(name, phone, email, notes));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsContainer);
