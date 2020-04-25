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

  const MenuPopupButton = (props) => {
    const { restaurantName, currentRestaurantID, isLoading, getRestaurantMenu, menus } = props;
    const [open, setOpen] = React.useState(false);

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

    return (
      <>
        <IconButton
            className={style.menuButton}
            onClick={(e) => handleClickOpen(e)}>
            <MenuBook className={style.menuIcon}/> 
        </IconButton>
        <Dialog open={open} onClose={(e) => handleClose(e)}>
            <DialogTitle>
              <Typography className={style.menuPopupTitle}>
                {restaurantName}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Menu menus={menus} isLoading={isLoading}></Menu>
            </DialogContent>
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
  