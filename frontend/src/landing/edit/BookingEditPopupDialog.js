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
import getRestaurantByReference from "./services/getRestaurantByReference";
import { addBookingDetails, addBookingTime, setBookingCode } from "../../store/booking/bookingActions";
import { selectRestaurant, setMode } from "../../store/restaurant/restaurantAction";
import getUserById from "./services/getUserById";
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
  const {
    onClose, open, addTime, addDetails, select, changeMode, setReservationCode,
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
        getUserById(data ? data.UserID : null).then((res) => {
          const userData = res.result[0];
          getRestaurantByID(data.RestaurantID).then((restaurant) => {
            changeInput(false);
            const restaurantData = restaurant[0];
            select({ ID: data.userID, Name: restaurantData.Name });
            addTime(data.Date, data.NumberOfGuests, data.Time);
            addDetails(`${userData.FirstName} ${userData.LastName}`, userData.Phone, userData.Email, data.Notes);
            setLoading(false);

          });
        }).catch(() => {
          setLoading(false);
          changeError(true);
          // handleClosePopup();
        });
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
      )
      : (
        <Dialog onClose={handleClosePopup} aria-labelledby="simple-dialog-title" open={open}>
          { isLoading ? <div className={style.loader}><CircularProgress /></div>
            : (
              <>
                <div className={style.dialogContainer}>
                  <DialogTitle className={style.dialogTitle} id="simple-dialog-title">Booking Summary</DialogTitle>
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
                <div className={style.dialogTripleButtonContainer}>
                  <Button variant="outlined" fullWidth={false} onClick={handleEditBooking} className={style.popupButton}>
                    {textHolder.bookingsPopup.popupDelete}
                  </Button>
                  <Button variant="outlined" fullWidth={false} onClick={handleEditBooking} className={style.popupButton}>
                    {textHolder.bookingsPopup.popupEdit}
                  </Button>
                  <Button variant="outlined" fullWidth={false} onClick={handleClosePopup} className={style.popupButton}>
                    {textHolder.bookingsPopup.popupOK}
                  </Button>
                </div>

              </>
            )}
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
