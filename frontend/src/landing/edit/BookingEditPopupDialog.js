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
        >
          <div>
            <DialogTitle id="simple-dialog-title">Input Booking ID</DialogTitle>
            <div>
              {(!isError) ? (
                <TextField id="outlined-basic" label="Insert ID here" variant="outlined" onChange={changeBookingID} />
              ) : (
                <TextField
                  error
                  id="outlined-basic"
                  helperText="Cannot be Empty"
                  label="Insert ID here"
                  variant="outlined"
                  onChange={changeBookingID}
                />
              )}
            </div>
            <div className={style.dialogContainer}>
              <PopupButton variant="outlined" fullWidth={false} onClick={handleClosePopup}>
                {textHolder.bookingsPopup.popupCancel}
              </PopupButton>
              <PopupButton variant="outlined" fullWidth={false} onClick={handleChangeToBookingDetails}>
                {textHolder.bookingsPopup.popupConfirm}
              </PopupButton>
            </div>
          </div>
        </Dialog>
      )
      : (
        <Dialog onClose={handleClosePopup} aria-labelledby="simple-dialog-title" open={open}>
          <div>
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
          <div className={style.dialogContainerDetails}>
            <PopupButton variant="outlined" fullWidth={false} onClick={handleEditBooking}>
              {textHolder.bookingsPopup.popupEdit}
            </PopupButton>
            <PopupButton variant="outlined" fullWidth={false} onClick={handleClosePopup}>
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
