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
const processEmpty = (restaurants, openRestaurants, popularRestaurants, newRestaurants, toBooking) => {
  if (restaurants.length === 0) {
    return <NoRestaurants />;
  }
  return (
    <>
      {popularRestaurants.length !== 0 ? <RestaurantCarousel title="Popular" restaurants={popularRestaurants} toBooking={toBooking} /> : null}
      {openRestaurants.length !== 0 ? <RestaurantCarousel title="Currently Open" restaurants={openRestaurants} toBooking={toBooking} /> : null}
      {newRestaurants.length !== 0 ? <RestaurantCarousel title="New" restaurants={newRestaurants} toBooking={toBooking} /> : null}
      <Tiles restaurants={restaurants} toBooking={toBooking} />
    </>
  );
};

const RestaurantTile = (props) => {
  const {
    getAll, getPopular, getNew, getOpen, loading,
    restaurants, openRestaurants, popularRestaurants, newRestaurants,
    select, changeMode, reset,
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
      {loading ? <CircularProgress />
        : processEmpty(restaurants, openRestaurants, popularRestaurants, newRestaurants, toBooking)}
    </div>
  );
};

const Tiles = ({ restaurants, toBooking }) => {
  const cellHeight = 250;
  const columns = 3;

  return (
    <div className={style.carouselContainer}>
      <p className={style.titleText}>All</p>
      <GridList
        cellHeight={cellHeight}
        spacing={40}
        className={style.gridList}
        cols={columns}
      >
        {restaurants.map((data, index) => (
          <GridListTile className={style.gridTile}>
            <Card onClick={() => toBooking(data)} className={style.card}>
              <CardActionArea>
                <CardMedia
                  style={{ height: cellHeight }}
                  // TODO: Swap this out with images from API
                  image={index % 2 === 0 ? "./images/nandoz.png" : "./images/kcf.png"}
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
