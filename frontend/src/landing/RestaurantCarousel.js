import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import style from "./LandingPage.module.css";
import MenuPopupButton from "./menu/MenuPopupButton";

const RestaurantCarousel = ({ title, restaurants, toBooking }) => {
  const cellHeight = 250;
  const columns = 3;

  const [startIndex, changeIndex] = React.useState(0);
  const displayRestaurants = restaurants.slice(startIndex, startIndex + 3);

  const backClicked = () => {
    if (startIndex - 3 < 0) {
      changeIndex(0);
    } else {
      changeIndex(startIndex - 3);
    }
  };

  const forwardsClicked = () => {
    if (startIndex + 3 > restaurants.length - 3) {
      changeIndex(restaurants.length - 3);
    } else {
      changeIndex(startIndex + 3);
    }
  };

  return (
    <div className={style.carouselContainer}>
      <p className={style.titleText}>{title}</p>
      <div className={style.carouselRowContainer}>
        {startIndex !== 0 ? (
          <div className={style.arrowContainer}>
            <ArrowBackIosIcon classes={{ root: style.arrow }} onClick={backClicked} />
          </div>
        )
          : <div style={{ width: 24 }} />}
        <GridList
          cellHeight={cellHeight}
          spacing={40}
          className={style.gridList}
          cols={columns}
        >
          {displayRestaurants.map((data) => (
            <GridListTile className={style.gridTile} key={data.Name}>
              <Card onClick={() => toBooking(data)} className={style.card}>
                <CardActionArea>
                  <CardMedia
                    style={{ height: cellHeight }}
                    image={data.Image ? data.Image : "./images/defaultRestaurantImage.jpg"}
                    title={data.Name}
                  />
                </CardActionArea>
                <GridListTileBar
                  title={data.Name}
                  actionIcon={<MenuPopupButton restaurantName={data.Name} />}
                />
              </Card>
            </GridListTile>
          ))}
        </GridList>
        {startIndex + 3 < restaurants.length ? (
          <div className={style.arrowContainer}>
            <ArrowForwardIosIcon classes={{ root: style.arrow }} onClick={forwardsClicked} />
          </div>
        )
          : <div style={{ width: 24 }} />}
      </div>
      <hr className={style.horizontalLine} />
    </div>
  );
};

export default RestaurantCarousel;
