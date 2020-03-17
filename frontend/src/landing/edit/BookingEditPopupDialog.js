import { useHistory } from "react-router";
import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";
import { styled } from "@material-ui/core";
import { connect } from "react-redux";
import style from "./BookingEditPopup.module.css";
import changePath from "../../general/helperFunctions";
import textHolder from "../../general/textHolder";
import css from "./BookingEditPopupCSS";
import getRestaurantByReference from "./getRestaurantByReference";
import {addBookingDetails, addBookingTime, getBookingCode, setBookingCode} from "../../store/booking/bookingActions";
import {selectRestaurant, setMode} from "../../store/restaurant/restaurantAction";
import getUserById from "./getUserById";
import getRestaurantByID from "./getRestaurantByID";

/**
 * The popup itself which is used to edit bookings
 */
const BookingEditPopupDialog = (props) => {
  // Setup dummy data
  const dummyBooking = {
    name: "KCF",
    tables: 1,
    people: 4,
    notes: "Window table please",
  };


  const history = useHistory();
  const [isInput, changeInput] = useState(true);
  const [isError, changeError] = useState(false);
  const [bookingID, changeBookingID] = useState("");
  // const [data, setData] = useState({});
  // console.log(data.result);
  const {
    onClose, open, IDSwitchMethod, addTime, addDetails, select, changeMode, setReservationCode,
  } = props;
  const PopupButton = styled(Button)(css.button);

  /**
     * Resets popup to default state
    */
  const resetPopup = () => {
    changeInput(true);
    changeError(false);
    changeBookingID("");
  };

  /**
     * Closes the popup
     */
  const handleClosePopup = () => {
    onClose();
    // Wait for animation to finish
    resetPopup();
  };

  /**
     * Switches popup to show booking details
     */
  const handleChangeToBookingDetails = () => {
    if (bookingID.length !== 0) {
      setReservationCode(bookingID);
      getRestaurantByReference(bookingID).then((r) => {
        const data = r.result[0];
        getUserById(data.UserID).then((res) => {
          const userData = res.result[0];
          getRestaurantByID(data.RestaurantID).then((restaurant) => {
            const restaurantData = restaurant[0];
            // select({ID: data.userID, Name: "KCF"})
            select({ ID: data.userID, Name: restaurantData.Name });
            addTime(data.Date, data.NumberOfGuests, data.Time);
            addDetails(`${userData.FirstName} ${userData.LastName}`, userData.Phone, userData.Email, data.Notes);
          });
        });
      });
      changeInput(false);
    } else {
      changeError(true);
    }
  };

  /**
     * Switches page to the specified restaurant booking page
     */
  const handleEditBooking = () => {
    console.log("goes here");
    changeMode("EDIT");
    IDSwitchMethod(dummyBooking.name);
    changePath("/booking", history);

  };

  /**
     * Switches page to the specified restaurant booking page
     */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleChangeToBookingDetails();
    }
  };

  return (
    (isInput)
      ? (
        <Dialog
          onClose={handleClosePopup}
          transitionDuration={0}
          aria-labelledby="simple-dialog-title"
          open={open}
          // Needed to prevent tiles from jumping to the right
          disableScrollLock
          fullWidth
          maxWidth="xs"
        >
          <div className={style.dialogContainer}>
            <DialogTitle className={style.dialogTitle} id="simple-dialog-title">Input Booking ID</DialogTitle>
            <div>
              {(!isError) ? (
                <TextField
                  className={style.dialogContent}
                  id="outlined-basic"
                  label="Insert ID here"
                  variant="outlined"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => changeBookingID(e.target.value)}
                />
              ) : (
                <TextField
                  error
                  id="outlined-basic"
                  helperText="Cannot be Empty"
                  label="Insert ID here"
                  variant="outlined"
                  onChange={(e) => changeBookingID(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={style.dialogContent}
                />
              )}
            </div>
          </div>
          <div className={style.dialogButtonContainer}>
            <PopupButton variant="outlined" fullWidth={false} onClick={handleClosePopup} className={style.popupButton}>
              {textHolder.bookingsPopup.popupCancel}
            </PopupButton>
            <PopupButton variant="outlined" fullWidth={false} onClick={handleChangeToBookingDetails} className={style.popupButton}>
              {textHolder.bookingsPopup.popupConfirm}
            </PopupButton>
          </div>
        </Dialog>
      )
      : (
        <Dialog onClose={handleClosePopup} aria-labelledby="simple-dialog-title" open={open}>
          <div className={style.dialogContainer}>
            <DialogTitle className={style.dialogTitle} id="simple-dialog-title">Booking Summary</DialogTitle>
            <p>
              You have booked&nbsp;
              {" "}
              <b>{dummyBooking.tables}</b>
              {" "}
              table(s) for&nbsp;
              <b>{dummyBooking.people}</b>
              {" "}
              people at&nbsp;
              &quot;
              <b>{dummyBooking.name}</b>
              &quot;!!
              <br />
              You have given the extra notes:
              <br />
              <b>{dummyBooking.notes}</b>
            </p>
          </div>
          <div className={style.dialogButtonContainer}>
            <PopupButton variant="outlined" fullWidth={false} onClick={handleEditBooking} className={style.popupButton}>
              {textHolder.bookingsPopup.popupEdit}
            </PopupButton>
            <PopupButton variant="outlined" fullWidth={false} onClick={handleClosePopup} className={style.popupButton}>
              {textHolder.bookingsPopup.popupOK}
            </PopupButton>
          </div>
        </Dialog>
      )
  );
};

BookingEditPopupDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  date: state.bookingReducer.date,
  seats: state.bookingReducer.seats,
  time: state.bookingReducer.time,
  name: state.bookingReducer.name,
  phone: state.bookingReducer.phone,
  email: state.bookingReducer.email,
  notes: state.bookingReducer.notes,
});

const mapDispatchToProps = (dispatch) => ({
  addTime: (date, seats, time) => { dispatch(addBookingTime(date, seats, time)); },
  addDetails: (name, phone, email, notes) => {
    dispatch(addBookingDetails(name, phone, email, notes));
  },
  select: (restaurant) => dispatch(selectRestaurant(restaurant)),
  changeMode: (mode) => dispatch(setMode(mode)),
  setReservationCode: (code) => dispatch(setBookingCode(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingEditPopupDialog);
