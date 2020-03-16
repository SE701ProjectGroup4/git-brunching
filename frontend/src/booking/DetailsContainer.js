import React, { useState } from "react";
import { useHistory } from "react-router";
<<<<<<< HEAD
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
=======
import TextField from "@material-ui/core/TextField";
import BottomNavigation from "@material-ui/core/BottomNavigation";
>>>>>>> f2e9e6533e678ea9a2d5f116b7cb8ad75a80dde7
import Card from "@material-ui/core/Card";
import style from "./BookingPage.module.css";
import changePath from "../general/helperFunctions";
import messages from "../general/textHolder";
import { addBookingDetails } from "../store/booking/bookingActions";

const detailMessages = messages.details;
const DetailsContainer = (props) => {
  const history = useHistory();
  //  functions that are used to navigate to previous and next screens

<<<<<<< HEAD
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

=======
  /**
   * TO DO
   * const [name, handleName] = useState("");
  const [email, handleEmail] = useState("");
  const [phoneNumber, handlePhoneNumber] = useState("");
   * const handleNext = () => {
    changePath("/confirmation", history);
    };

    const handlePrevious = () => {
      changePath("/", history);
    };

  */
>>>>>>> f2e9e6533e678ea9a2d5f116b7cb8ad75a80dde7
  return (
    <div className={style.contentContainer}>
      {/* Input fields go here */}
      <div className={style.inputContainer}>
        <Card className={style.detailsCard}>
          <h1>Enter Your Details</h1>
          <form>
            <div className="form-group">
              <label className={style.formlabel}>Name</label>
<<<<<<< HEAD
              <TextField
                type="text"
                name="name"
                value={name}
                onChange={(e) => changeName(e.target.value)}
                className="form-value"
              />
=======
              <TextField type="text" name="name" className="form-value" />
>>>>>>> f2e9e6533e678ea9a2d5f116b7cb8ad75a80dde7
            </div>
            <div className="form-group">
              <label className={style.formlabel}>Phone Number</label>
              <TextField
                type="text"
                name="phonenumber"
<<<<<<< HEAD
                value={phone}
                onChange={(e) => changePhone(e.target.value)}
=======
>>>>>>> f2e9e6533e678ea9a2d5f116b7cb8ad75a80dde7
                className="form-value"
              />
            </div>
            <div className="form-group">
              <label className={style.formlabel}>Email</label>
<<<<<<< HEAD
              <TextField
                type="text"
                name="email"
                value={email}
                onChange={(e) => changeEmail(e.target.value)}
                className="form-value"
              />
            </div>
            <div className="form-group">
              <label className={style.formlabel}>Notes</label>
              <TextField value={notes} onChange={(e) => changeNotes(e.target.value)} />
            </div>
            <div className={style.buttonContainer}>
=======
              <TextField type="text" name="email" className="form-value" />
            </div>
            <div className="form-group">
              <label className={style.formlabel}>Notes</label>
              <TextField />
            </div>
            <div className={style.buttonContainer}>
              <BottomNavigation>
>>>>>>> f2e9e6533e678ea9a2d5f116b7cb8ad75a80dde7
                <button
                  className={style.changePageButton}
                  variant="contained"
                  onClick={() => changePath("/", history)}
                >
                  {detailMessages.buttonBackText}
                </button>
                <button
                  className={style.changePageButton}
                  type="submit"
                  variant="contained"
<<<<<<< HEAD
                  onClick={handleDetailsConfirmation}
                >
                  {detailMessages.buttonNextText}
                </button>
=======
                  onClick={() => changePath("/confirmation", history)}
                >
                  {detailMessages.buttonNextText}
                </button>
              </BottomNavigation>
>>>>>>> f2e9e6533e678ea9a2d5f116b7cb8ad75a80dde7
            </div>
          </form>
        </Card>
      </div>
      <div className={style.timeContainer} />
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
