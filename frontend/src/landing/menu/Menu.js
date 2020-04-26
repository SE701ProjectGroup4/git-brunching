import React from 'react';
import style from "../LandingPage.module.css";

const Menu = (props) => {

    const { menus, isLoading } = props;

    if ( menus == null && isLoading == true) {
      return (<div>Loading...</div>);
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
