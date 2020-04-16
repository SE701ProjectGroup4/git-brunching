import React from 'react';
import { MenuBook } from '@material-ui/icons'
import style from "../LandingPage.module.css";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

  const MenuPopupButton = (props) => {
    const [open, setOpen] = React.useState(false);
  
    /**
       * Opens the popup
       */
    const handleClickOpen = () => {
      console.log("****** handling click open ******");
      setOpen(true);
    };
  
    /**
       * Hides the popup
       */
    const handleClose = () => {
      console.log("****** handling close ******");
      setOpen(false);
    };
  
    return (
      <div>
        <IconButton 
            className={style.menuButton}
            onClick={handleClickOpen}> 
            <MenuBook className={style.menuIcon}/> 
        </IconButton>
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>Example</DialogTitle>
        </Dialog>
      </div>
    );
  };
  
  export default MenuPopupButton;
  