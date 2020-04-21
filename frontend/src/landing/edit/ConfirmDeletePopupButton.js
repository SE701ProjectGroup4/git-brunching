import React from "react";
import Button from "@material-ui/core/Button";
import ConfirmDeletePopupDialog from "./services/ConfirmDeletePopupDialog";
import textHolder from "../../general/textHolder";
import style from "./BookingEditPopup.module.css";
import PropTypes from "prop-types";

/**
 * A button which summons the popup to confirm deleting a booking.
 */
const ConfirmDeletePopupButton = (props) => {
  const { onDelete } = props;
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

  const handleDelete = () => {
    onDelete();
  }

  return (
    <div>
        <Button
            fullWidth={true}
            onClick={handleClickOpen}
            className={style.popupButton}
        >
            {textHolder.bookingsPopup.popupDelete}
        </Button>
        <ConfirmDeletePopupDialog open={open} onClose={handleClose} onDelete={handleDelete}/>
    </div>
  );
};

ConfirmDeletePopupDialog.propTypes = {
    onDelete: PropTypes.func.isRequired,
  };

export default ConfirmDeletePopupButton;
