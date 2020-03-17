import React from "react";
import Button from "@material-ui/core/Button";
import BookingEditPopupDialog from "./BookingEditPopupDialog";
import textHolder from "../../general/textHolder";
import style from "../LandingPage.module.css";

/**
 * A button which summons the popup to edit bookings.
 */
const BookingEditPopupButton = (props) => {
  const { IDSwitchMethod } = props;
  const [open, setOpen] = React.useState(false);

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
      <Button
        variant="outlined"
        className={style.primaryButton}
        onClick={handleClickOpen}
      >
        {textHolder.bookingsPopup.buttonText}
      </Button>
      <BookingEditPopupDialog open={open} onClose={handleClose} IDSwitchMethod={IDSwitchMethod} />
    </div>
  );
};

export default BookingEditPopupButton;
