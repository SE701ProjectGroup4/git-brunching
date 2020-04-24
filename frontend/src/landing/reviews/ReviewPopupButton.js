import React from 'react';
import RateReviewIcon from '@material-ui/icons/RateReview';
import style from "../LandingPage.module.css";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

    const ReviewPopupButton = ({restaurant, toBooking}) => {
        const [open, setOpen] = React.useState(false);
        const restaurantName = restaurant.Name;
        // Show popup
        const handleClickOpen = (e) => {
        // Prevent click from propagating to restaurant card and going straight to booking
        e.stopPropagation();
        setOpen(true);
        }
    
        // Hide popup
        const handleClose = (e) => {
        // Prevent click from propagating to restaurant card when exiting popup
        e.stopPropagation();
        setOpen(false);
        };

        const handlePopupClick = (e) => {
        e.stopPropagation();
        } 
    
        return (
        <>
            <IconButton
                className={style.reviewButton}
                onClick={handleClickOpen}>
                <RateReviewIcon className={style.reviewIcon}/> 
            </IconButton>
            
            <Dialog open={open} onClose={handleClose} onClick={handlePopupClick} >
                <DialogTitle className={style.reviewPopup}>
                <Typography className={style.reviewPopup}>
                    {restaurantName}'s Reviews
                </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please submit your reviews here!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <div className={style.reviewButtonsContainer}>
                    <Button variant="outlined" className={style.primaryButton} onClick={handleClose}>Cancel</Button>
                    <Button variant="outlined" className={style.secondaryButton} onClick={() => toBooking(restaurant)}>Submit</Button>
                </div>
            </Dialog>
        </>
        );
    }

    export default ReviewPopupButton

