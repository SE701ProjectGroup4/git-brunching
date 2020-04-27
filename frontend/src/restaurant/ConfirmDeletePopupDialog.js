import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";
import style from "../landing/edit/BookingEditPopup.module.css";
import textHolder from "../general/textHolder";

/**
 * The popup to confirm booking deletion
 */
const ConfirmDeletePopupDialog = (props) => {
  const { onClose, onDelete, open } = props;

  /**
   * Closes the popup
   */
  const handleClosePopup = () => {
    onClose();
  };

  const handleConfirmDelete = () => {
    onClose();
    onDelete();
  };

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
      <div>
        <p className={style.deleteTitle}>Do you want to delete this booking?</p>
      </div>
      <div className={style.dialogButtonContainer}>
        <Button
          variant="outlined"
          fullWidth={false}
          onClick={handleClosePopup}
          className={style.popupButton}
        >
          {textHolder.bookingsPopup.popupCancel}
        </Button>
        <Button
          variant="outlined"
          fullWidth={false}
          onClick={handleConfirmDelete}
          className={style.popupButton}
        >
          {textHolder.bookingsPopup.popupConfirm}
        </Button>
      </div>
    </Dialog>
  );
};

ConfirmDeletePopupDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ConfirmDeletePopupDialog;
