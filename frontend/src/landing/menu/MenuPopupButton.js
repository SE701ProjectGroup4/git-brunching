import React from 'react';
import { MenuBook } from '@material-ui/icons'
import style from "../LandingPage.module.css";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

  const MenuPopupButton = ({restaurant, toBooking}) => {
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
            className={style.menuButton}
            onClick={handleClickOpen}>
            <MenuBook className={style.menuIcon}/> 
        </IconButton>
        <Dialog open={open} onClose={handleClose} onClick={handlePopupClick} >
            <DialogTitle className={style.menuPopup}>
              <Typography className={style.menuPopup}>
                {restaurantName}
              </Typography>
            </DialogTitle>
            <div className={style.menuButtonsContainer}>
                <Button variant="outlined" className={style.primaryButton} onClick={handleClose}>Cancel</Button>
                <Button variant="outlined" className={style.secondaryButton} onClick={() => toBooking(restaurant)}>Make Booking</Button>
            </div>
        </Dialog>
      </>
    );
  };
  
  export default MenuPopupButton;
  