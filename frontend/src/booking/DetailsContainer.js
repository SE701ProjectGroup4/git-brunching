import React, { useState } from "react";
import { useHistory } from "react-router";
import TextField from "@material-ui/core/TextField";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import Card from "@material-ui/core/Card";
import style from "./BookingPage.module.css";
import changePath from "../general/helperFunctions";
import messages from "../general/textHolder";
import { connect } from "react-redux";
import { addBookingDetails } from "../store/booking/bookingActions"

const detailMessages = messages.details;
const DetailsContainer = (props) => {
  const history = useHistory();

  const { oldName, oldPhone, oldEmail, oldNotes } = props

  console.log(oldName);

  const [name, changeName] = useState((oldName == null) ? "" : oldName);
  const [phone, changePhone] = useState((oldPhone == null) ? "" : oldPhone);
  const [email, changeEmail] = useState((oldEmail == null) ? "" : oldEmail);
  const [notes, changeNotes] = useState((oldNotes == null) ? "" : oldNotes);

  const handleDetailsConfirmation = () => {
    changePath("/confirmation", history);
    props.onConfirmClick(name, phone, email, notes)
  }

  return (
    <div className={style.contentContainer}>
      {/* Input fields go here */}
      <div className={style.inputContainer}>
        <Card className={style.detailsCard}>
          <h1>Enter Your Details</h1>
          <form>
            <div className="form-group">
              <label className={style.formlabel}>Name</label>
              <TextField 
                type="text" 
                name="name"
                value={name} 
                onChange={(e) => changeName(e.target.value)}
                className="form-value" />
            </div>
            <div className="form-group">
              <label className={style.formlabel}>Phone Number</label>
              <TextField
                type="text"
                name="phonenumber"
                value={phone}
                onChange={(e) => changePhone(e.target.value)}
                className="form-value"
              />
            </div>
            <div className="form-group">
              <label className={style.formlabel}>Email</label>
              <TextField 
                type="text" 
                name="email"
                value={email}
                onChange={(e) => changeEmail(e.target.value)} 
                className="form-value" />
            </div>
            <div className="form-group">
              <label className={style.formlabel}>Notes</label>
              <TextField value={notes} onChange={(e) => changeNotes(e.target.value)}/>
            </div>
            <div className={style.buttonContainer}>
              <BottomNavigation>
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
                  onClick={handleDetailsConfirmation}
                >
                  {detailMessages.buttonNextText}
                </button>
              </BottomNavigation>
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
})

const mapDispatchToProps = (dispatch) => ({
  onConfirmClick: (name, phone, email, notes) => { dispatch(addBookingDetails(name, phone, email, notes)); },
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailsContainer);
