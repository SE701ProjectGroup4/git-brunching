import React from "react";
import { MenuBook, Store } from '@material-ui/icons'
import style from "../LandingPage.module.css";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { getMenu } from "../../store/menu/menuActions"
import { connect } from "react-redux";
import Menu from "./Menu";
import Button from "@material-ui/core/Button";


  const MenuPopupButton = (props) => {
    const { restaurant, toBooking, currentRestaurantID, isLoading, getRestaurantMenu, menus } = props;
    const [open, setOpen] = React.useState(false);
    const restaurantName = restaurant.Name;


    // Show popup
    const handleClickOpen = (e) => {
      getRestaurantMenu(currentRestaurantID);
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
            onClick={(e) => handleClickOpen(e)}>
            <MenuBook className={style.menuIcon}/> 
        </IconButton>
        <Dialog open={open} onClose={(e) => handleClose(e)} onClick={handlePopupClick}>
            <DialogTitle>
              <Typography className={style.menuPopupTitle}>
                {restaurantName}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Menu menus={menus} isLoading={isLoading}></Menu>
            </DialogContent>
            <div className={style.menuButtonsContainer}>
                <Button variant="outlined" className={style.primaryButton} onClick={handleClose}>Cancel</Button>
                <Button variant="outlined" className={style.secondaryButton} onClick={() => toBooking(restaurant)}>Make Booking</Button>
            </div>
        </Dialog>
      </>
    );
  };

  const mapStateToProps = (state) => ({
    isLoading: state.menuReducer.isLoading,
    menus: state.menuReducer.menus
  });

    
  const mapDispatchToProps = (dispatch) => ({
    getRestaurantMenu: (currentRestaurantID) => { dispatch(getMenu(currentRestaurantID)); },
  });

  export default connect(mapStateToProps, mapDispatchToProps)(MenuPopupButton);
  