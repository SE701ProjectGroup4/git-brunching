import { useHistory } from "react-router";
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";
import { styled } from "@material-ui/core";
import style from "./BookingEditPopup.module.css";
import changePath from "../../general/helperFunctions";
import textHolder from "../../general/textHolder";
import css from "./BookingEditPopupCSS";

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
  const [isInput, changeInput] = React.useState(true);
  const [isError, changeError] = React.useState(false);
  const [bookingID, changeBookingID] = React.useState("");
  const { onClose, open, IDSwitchMethod } = props;
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
      changeInput(false);
    } else {
      changeError(true);
    }
  };

  /**
     * Switches page to the specified restaurant booking page
     */
  const handleEditBooking = () => {
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
                <TextField className={style.dialogContent} id="outlined-basic" label="Insert ID here" variant="outlined" onChange={changeBookingID} onKeyDown={handleKeyDown} />
              ) : (
                <TextField
                  error
                  id="outlined-basic"
                  helperText="Cannot be Empty"
                  label="Insert ID here"
                  variant="outlined"
                  onChange={changeBookingID}
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

export default BookingEditPopupDialog;
