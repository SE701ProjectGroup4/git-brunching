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
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {Rating} from '@material-ui/lab';

    const ReviewPopupButton = ({restaurant}) => {
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

        const labels = {
            0.5: 'Useless',
            1: 'Useless+',
            1.5: 'Poor',
            2: 'Poor+',
            2.5: 'Ok',
            3: 'Ok+',
            3.5: 'Good',
            4: 'Good+',
            4.5: 'Excellent',
            5: 'Excellent+',
        };
          
        const useStyles = makeStyles({
            root: {
              width: 200,
              display: 'flex',
              alignItems: 'center',
            },
        });

        const [value, setValue] = React.useState(2);
        const [hover, setHover] = React.useState(-1);
        const classes = useStyles();
    
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
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            type="name"
                            label="Name"
                            fullWidth
                        />
                        <div className={classes.root}>
                            <Rating
                                name="hover-feedback"
                                value={value}
                                precision={0.5}
                                onChange={(event, newValue) => {
                                setValue(newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                setHover(newHover);
                                }}
                            />
                            {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                        </div>
                        <DialogContentText>
                            Please submit your review here
                        </DialogContentText>
                        <TextField
                            multiline
                            rows = "4"
                            autoFocus
                            margin="dense"
                            id="review"
                            type="review"
                            fullWidth
                        />
                    </DialogContent>
                </Typography>
                </DialogTitle>
                <div className={style.reviewButtonsContainer}>
                    <Button variant="outlined" className={style.primaryButton} onClick={handleClose}>Cancel</Button>
                    <Button variant="outlined" className={style.secondaryButton} onClick={handleClose}>Submit</Button>
                </div>
            </Dialog>
        </>
        );
    }

    export default ReviewPopupButton

