import { useHistory } from "react-router";
import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";
import { CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import style from "./BookingEditPopup.module.css";
import changePath from "../../general/helperFunctions";
import textHolder from "../../general/textHolder";
import getRestaurantByReference from "./services/getReservationByReference";
import deleteReservationByReference from "./services/deleteReservationByReference";
import {
  addBookingDate,
  addBookingDetails,
  addBookingSeats,
  addBookingTime,
  setBookingCode,
} from "../../store/booking/bookingActions";
import { selectRestaurant, setMode } from "../../store/restaurant/restaurantAction";
import getRestaurantByID from "./services/getRestaurantByID";

/**
 * The popup itself which is used to edit bookings
 */
const BookingEditPopupDialog = (props) => {
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [isInput, changeInput] = useState(true);
  const [isError, changeError] = useState(false);
  const [bookingID, changeBookingID] = useState("");
  const [deleteMode, changeDeleteMode] = useState(false);
  const {
    onClose, open, addTime, addSeats, addDate, addDetails, select, changeMode, setReservationCode,
    date, seats, time, name, notes,
  } = props;

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
      setLoading(true);
      getRestaurantByReference(bookingID).then((r) => {
        setReservationCode(bookingID);
        const data = r.result[0];
        if (data !== undefined) {
          getRestaurantByID(data.RestaurantID).then((restaurant) => {
            changeInput(false);
            const restaurantData = restaurant[0];
            select({ ID: restaurantData.ID, Name: restaurantData.Name });
            addTime(data.Time);
            addSeats(data.NumberOfGuests);
            addDate(data.Date);
            addDetails(data.Name, data.Phone, data.Email, data.Notes);
            setLoading(false);
          }).catch(() => {
            setLoading(false);
            changeError(true);
            // handleClosePopup();
          });
        } else {
          changeError(true);
          setLoading(false);
        }
      });
    } else {
      changeError(true);
    }
  };

  /**
     * Switches page to the specified restaurant booking page
     */
  const handleEditBooking = () => {
    changeMode("EDIT");
    // IDSwitchMethod(dummyBooking.name);
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

  const handleDeleteBooking = () => {
    deleteReservationByReference(bookingID).then(handleClosePopup());
  };

  if (isInput) {
    return (
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
                helperText="Error has occurred"
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
          <Button variant="outlined" fullWidth={false} onClick={handleClosePopup} className={style.popupButton}>
            {textHolder.bookingsPopup.popupCancel}
          </Button>
          <Button variant="outlined" fullWidth={false} onClick={handleChangeToBookingDetails} className={style.popupButton}>
            {textHolder.bookingsPopup.popupConfirm}
          </Button>
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog onClose={handleClosePopup} aria-labelledby="simple-dialog-title" open={open} PaperProps={{ style: { width: 320 } }}>
      { isLoading ? <div className={style.loader}><CircularProgress /></div>
        : (
          <>
            <div className={style.dialogContainer}>
              <DialogTitle className={style.dialogTitle} id="simple-dialog-title">{deleteMode ? "Confirm Deletion" : "Booking Summary"}</DialogTitle>
              <div>
                <p>{`Name: ${name}`}</p>
              </div>
              <div>
                <p>{`Date: ${date}`}</p>
              </div>
              <div>
                <p>{`Number of seats: ${seats}`}</p>
              </div>
              <div>
                <p>{`Time: ${time}`}</p>
              </div>
              <div>
                <p>{`Note: ${notes}`}</p>
              </div>
            </div>
            {deleteMode
              ? (
                <>
                  <div className={style.dialogButtonContainer}>
                    <Button variant="outlined" fullWidth={false} onClick={() => changeDeleteMode(false)} className={style.popupButton}>
                      {textHolder.bookingsPopup.popupCancel}
                    </Button>
                    <Button variant="outlined" fullWidth={false} onClick={handleDeleteBooking} className={style.popupButton}>
                      {textHolder.bookingsPopup.popupConfirm}
                    </Button>
                  </div>
                </>
              )
              : (
                <div className={style.dialogTripleButtonContainer}>
                  <Button variant="outlined" fullWidth={false} onClick={() => changeDeleteMode(true)} className={style.popupButton}>
                    {textHolder.bookingsPopup.popupDelete}
                  </Button>
                  <Button variant="outlined" fullWidth={false} onClick={handleEditBooking} className={style.popupButton}>
                    {textHolder.bookingsPopup.popupEdit}
                  </Button>
                  <Button variant="outlined" fullWidth={false} onClick={handleClosePopup} className={style.popupButton}>
                    {textHolder.bookingsPopup.popupOK}
                  </Button>
                </div>
              )}
          </>
        )}
    </Dialog>
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
  addTime: (time) => { dispatch(addBookingTime(time)); },
  addSeats: (seats) => { dispatch(addBookingSeats(seats)); },
  addDate: (date) => { dispatch(addBookingDate(date)); },
  addDetails: (name, phone, email, notes) => {
    dispatch(addBookingDetails(name, phone, email, notes));
  },
  select: (restaurant) => dispatch(selectRestaurant(restaurant)),
  changeMode: (mode) => dispatch(setMode(mode)),
  setReservationCode: (code) => dispatch(setBookingCode(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingEditPopupDialog);
