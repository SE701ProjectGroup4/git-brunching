import React from 'react';
import style from "../LandingPage.module.css";
import { ReactComponent as NoMenu } from "../../general/NoMenuImage.svg";

const Menu = (props) => {
  const { menus, isLoading } = props;

  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }

  if (menus.length === 0) {
    return (
      <NoMenu className={style.noMenuImage} />
    );
  }

  if (menus.length === 1) {
    return (
      <div>
        <img className={style.menuImage}
          src={menus[0].Link}
          alt="Single Menu Page" />
      </div>
    );
  }

  //TODO
  return (
    <div>
      <img className={style.menuImage}
        src={menus[0].Link}
        alt="Menu Page" />
    </div>
  );
}

export default Menu;
