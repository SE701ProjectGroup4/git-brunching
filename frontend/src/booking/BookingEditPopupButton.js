import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import changePath from "../general/helperFunctions";
import {useHistory} from "react-router";

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

    return (<div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Edit Booking
        </Button>
        <PopupDialog open={open} onClose={handleClose} IDSwitchMethod={IDSwitchMethod}/>
    </div>);
}

export default BookingEditPopupButton;

/**
 * The popup itself which is used to edit bookings
 */
const PopupDialog = (props) => {
    // Setup dummy data
    const dummyBooking = {
        name: "KCF",
        tables: 1,
        people: 4,
        notes: "Window table please"
    };

    const history = useHistory();
    const [isInput, changeInput] = React.useState(true)
    const { onClose, open, IDSwitchMethod} = props;

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
        changeInput(false);

    };

    /**
     * Resets popup to default state
     */
    const resetPopup = () => {
        changeInput(true);
    };

    /**
     * Switches page to the specified restaurant booking page
     */
    const handleEditBooking = () => {
        IDSwitchMethod(dummyBooking.name);
        changePath("/booking", history);
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
                    You have booked <b>{dummyBooking.tables}</b> table(s) for <b>{dummyBooking.people}</b> people at
                     "<b>{dummyBooking.name}</b>"!!<br />
                    You have given the extra notes:<br />
                    <b>{dummyBooking.notes}</b>
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



