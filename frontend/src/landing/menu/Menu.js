import React from 'react';
import style from "../LandingPage.module.css";
import { ReactComponent as NoMenu } from "../../general/NoMenuImage.svg";


const Menu = (props) => {

    const { menus, isLoading } = props;

    if (isLoading == true) {
      return (<div>Loading...</div>);
    }
    else if ( !isLoading && menus.length == 0) {
        return(
            <NoMenu className={style.noMenuImage}></NoMenu>
        );
    }

    else {
      return (
        <div>
          <img className={style.menuImage}
          src={menus[0].Link}
          alt="new"/>
        </div>

      );
    } 
  }  

  export default Menu;
