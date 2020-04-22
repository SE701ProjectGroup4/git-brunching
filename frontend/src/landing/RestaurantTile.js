import React, { useEffect } from "react";
import { useHistory } from "react-router";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import style from "./LandingPage.module.css";
import changePath from "../general/helperFunctions";
import {
  getRestaurants,
  selectRestaurant, setMode,
  getPopularRestaurants,
  getNewRestaurants,
  getOpenRestaurants,
} from "../store/restaurant/restaurantAction";
import MenuPopupButton from "./menu/MenuPopupButton";

import RestaurantCarousel from "./RestaurantCarousel";
import NoRestaurants from "./NoRestaurants";
import { resetBooking } from "../store/booking/bookingActions";

/**
 * After the API has been loaded, we check if we have received any data.
 * @param restaurants
 * @param toBooking
 * @returns {*}
 */
const processEmpty = (loading, restaurants, openRestaurants, popularRestaurants, newRestaurants, searchText, toBooking) => {
  if (loading && searchText === "") {
    return <CircularProgress />;
  }

  if (restaurants.length === 0) {
    if (searchText === "") {
      return <NoRestaurants title="Something went wrong" />;
    }
    return <NoRestaurants title="Search Results" />;
  }

  if (searchText !== "") {
    return (
      <Tiles restaurants={restaurants} toBooking={toBooking} title="Search Results" />
    );
  }

  return (
    <>
      {popularRestaurants.length !== 0 ? <RestaurantCarousel title="Popular" restaurants={popularRestaurants} toBooking={toBooking} /> : null}
      {openRestaurants.length !== 0 ? <RestaurantCarousel title="Currently Open" restaurants={openRestaurants} toBooking={toBooking} /> : null}
      {newRestaurants.length !== 0 ? <RestaurantCarousel title="New" restaurants={newRestaurants} toBooking={toBooking} /> : null}
      <Tiles restaurants={restaurants} toBooking={toBooking} title="All" />
    </>
  );
};

const RestaurantTile = (props) => {
  const {
    getAll, getPopular, getNew, getOpen, loading,
    restaurants, openRestaurants, popularRestaurants, newRestaurants,
    select, changeMode, reset, searchText,
  } = props;
  const history = useHistory();
  const toBooking = (restaurant) => {
    changePath("/booking", history);
    reset();
    select(restaurant);
    changeMode("CREATE");
  };

  useEffect(() => {
    getAll();
    getPopular();
    getNew();
    getOpen();
  }, []);

  return (
    <div className={style.gridRoot}>
      {processEmpty(loading, restaurants, openRestaurants, popularRestaurants, newRestaurants, searchText, toBooking)}
    </div>
  );
};

const Tiles = ({
  restaurants, toBooking, title,
}) => {
  const cellHeight = 250;
  const columns = 3;

  return (
    <div className={style.carouselContainer}>
      <p className={style.titleText}>{title}</p>
      <GridList
        cellHeight={cellHeight}
        spacing={40}
        className={style.gridList}
        cols={columns}
      >
        {restaurants.map((data) => (
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
                actionIcon={<MenuPopupButton restaurant={data} toBooking={toBooking} />}
                />
            </Card>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

// Keep for testing purposes when you can't connect to API
// const fakeData = [
//   {
//     Id: 0,
//     Name: "KCF",
//   },
//   {
//     Id: 1,
//     Name: "NANDOZ",
//   },
// ];


const mapStateToProps = (state) => ({
  loading: state.restaurantReducer.isLoading,
  restaurants: state.restaurantReducer.restaurants,
  openRestaurants: state.restaurantReducer.openRestaurants,
  popularRestaurants: state.restaurantReducer.popularRestaurants,
  newRestaurants: state.restaurantReducer.newRestaurants,
  searchText: state.restaurantReducer.searchText,
  // restaurants: fakeData,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAll: getRestaurants,
  getPopular: getPopularRestaurants,
  getNew: getNewRestaurants,
  getOpen: getOpenRestaurants,
  select: selectRestaurant,
  changeMode: setMode,
  reset: resetBooking,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantTile);
