import React from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
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

  return (
    <ImageGallery
      items={menus.map(menu => ({ original: menu.Link }))}
      showPlayButton={false}
      showThumbnails={false}
      infinite={false}
      showBullets={true}
      additionalClass={"menuGallery"}
    />
  );
}

export default Menu;
