import React from 'react';
import { MenuBook } from '@material-ui/icons'
import style from "../LandingPage.module.css";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

  const MenuPopupButton = (props) => {
    const { restaurantName } = props;
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
  
    return (
      <>
        <IconButton 
            className={style.menuButton}
            onClick={handleClickOpen}> 
            <MenuBook className={style.menuIcon}/> 
        </IconButton>
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle className={style.menuPopup}>{restaurantName}</DialogTitle>
        </Dialog>
      </>
    );
  };
  
  export default MenuPopupButton;
  