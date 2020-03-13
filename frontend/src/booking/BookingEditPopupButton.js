import React from "react";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";
import BookingEditPopupDialog from "./BookingEditPopupDialog";
import textHolder from "../general/textHolder";
import css from "./BookingEditPopupCSS";

/**
 * A button which summons the popup to edit bookings.
 */
const BookingEditPopupButton = (props) => {
  const { IDSwitchMethod } = props;
  const [open, setOpen] = React.useState(false);

  const PopupButton = styled(Button)(css.button);

  /**
     * Opens the popup
     */
  const handleClickOpen = () => {
    setOpen(true);
  };

  /**
     * Hides the popup
     */
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <PopupButton variant="outlined" color="primary" onClick={handleClickOpen}>
        {textHolder.bookingsPopup.buttonText}
      </PopupButton>
      <BookingEditPopupDialog open={open} onClose={handleClose} IDSwitchMethod={IDSwitchMethod} />
    </div>
  );
};

export default BookingEditPopupButton;
