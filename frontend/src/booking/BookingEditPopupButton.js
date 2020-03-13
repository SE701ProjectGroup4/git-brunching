import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import { blue } from '@material-ui/core/colors';
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

const PopupDialog = (props) => {

    const history = useHistory();
    const [isInput, changeInput] = React.useState(true)

    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
        setTimeout(function() {
            handleChangeInputTrue();
        }, 200);

    };

    const handleChangeInputFalse = () => {
        changeInput(false);
    };

    const handleChangeInputTrue= () => {
        changeInput(true);
    };

    const handleEdit = () => {

        history.push("/booking");
    };


    return (
        (isInput) ?
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>


            <DialogTitle id="simple-dialog-title">Input Booking ID</DialogTitle>
            <TextField id="outlined-basic" label="Insert ID here" variant="outlined" />
            <Button variant="outlined" color="primary" fullWidth={false} onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="outlined" color="primary" fullWidth={false} onClick={handleChangeInputFalse}>
                Confirm
            </Button>


        </Dialog> :
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <div>
                <p>
                    You have booked 1 table for 4 people at KCF
                </p>
            </div>
            <Button variant="outlined" color="primary" fullWidth={false} onClick={handleEdit}>
                Edit
            </Button>
            <Button variant="outlined" color="primary" fullWidth={false} onClick={handleClose}>
                OK
            </Button>

        </Dialog>
    );
}

PopupDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};



