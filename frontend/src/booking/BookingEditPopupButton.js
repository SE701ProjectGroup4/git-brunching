import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import {useHistory} from "react-router";


const BookingEditPopupButton = () => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (<div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Edit Booking
        </Button>
        <PopupDialog open={open} onClose={handleClose} />
    </div>);
}

export default BookingEditPopupButton;

/**
 * The popup itself
 */
const PopupDialog = (props) => {

    const history = useHistory();
    const [isInput, changeInput] = React.useState(true)
    const { onClose, open } = props;

    const handleClosePopup = () => {
        onClose();
        //wait for animation to finish
        resetPopup();
    };

    const handleChangeToBookingDetails = () => {
        changeInput(false);

    };

    const resetPopup = () => {
        changeInput(true);
    };

    const handleEditBooking = () => {

        history.push("/booking");
    };

    return (
        (isInput) ?
        <Dialog onClose={handleClosePopup} transitionDuration={0} aria-labelledby="simple-dialog-title" open={open}>

            <DialogTitle id="simple-dialog-title">Input Booking ID</DialogTitle>
            <TextField id="outlined-basic" label="Insert ID here" variant="outlined" />
            <Button variant="outlined" color="primary" fullWidth={false} onClick={handleClosePopup}>
                Cancel
            </Button>
            <Button variant="outlined" color="primary" fullWidth={false} onClick={handleChangeToBookingDetails}>
                Confirm
            </Button>


        </Dialog> :
        <Dialog onClose={handleClosePopup} aria-labelledby="simple-dialog-title" open={open}>
            <div>
                <p>
                    You have booked 1 table for 4 people at KCF
                </p>
            </div>
            <Button variant="outlined" color="primary" fullWidth={false} onClick={handleEditBooking}>
                Edit
            </Button>
            <Button variant="outlined" color="primary" fullWidth={false} onClick={handleClosePopup}>
                OK
            </Button>

        </Dialog>
    );
}

PopupDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};



