import React, { useState } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import style from "./DetailsContainer.module.css";
import landingStyle from "../landing/LandingPage.module.css";
import changePath from "../general/helperFunctions";
import messages from "../general/textHolder";
import { addBookingDetails } from "../store/booking/bookingActions";

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

  const handleDetailsConfirmation = () => {
    changePath("/confirmation", history);
    props.onConfirmClick(name, phone, email, notes);
  };

  return (
    <div className={style.detailsContentContainer}>
      <div className={style.detailContainer}>
        <p className={style.info}>{detailMessages.infoMessage}</p>
        <TextField
          type="text"
          name="name"
          label="Name"
          value={name}
          onChange={(e) => changeName(e.target.value)}
          className="form-value"
        />
        <TextField
          type="text"
          label="Phone Number"
          name="phonenumber"
          value={phone}
          onChange={(e) => changePhone(e.target.value)}
          className="form-value"
        />
        <TextField
          type="text"
          label="Email"
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
        <div className={style.buttonContainer}>
          <Button
            className={landingStyle.secondaryButton}
            variant="contained"
            onClick={() => changePath("/", history)}
          >
            {detailMessages.buttonBackText}
          </Button>
          <Button
            className={landingStyle.primaryButton}
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
